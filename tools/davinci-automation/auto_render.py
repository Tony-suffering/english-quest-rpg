#!/usr/bin/env python
import csv
import os
import sys

# -----------------------------------------------------------------------------
# DaVinci Resolve Scripting API Initialization
# -----------------------------------------------------------------------------
try:
    import DaVinciResolveScript as dvr_script
except ImportError:
    # This block allows running the script from external python if env is set
    lib_path = os.getenv('RESOLVE_SCRIPT_LIB')
    if lib_path:
        sys.path.append(lib_path)
        import DaVinciResolveScript as dvr_script
    else:
        print("Error: Could not load DaVinciResolveScript module.")
        print("Please run this script from inside DaVinci Resolve (Workspace > Scripts).")
        sys.exit(1)

resolve = dvr_script.scriptapp("Resolve")
project_manager = resolve.GetProjectManager()
project = project_manager.GetCurrentProject()
media_pool = project.GetMediaPool()
root_folder = media_pool.GetRootFolder()

if not project:
    print("Error: No project is open.")
    sys.exit(1)

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
CSV_PATH = os.path.join(os.path.dirname(__file__), "data.csv")
TEMPLATE_TIMELINE_NAME = "MasterTemplate"  # Name of your template timeline
PLACEHOLDER_CLIP_NAME = "Placeholder"      # Name of the clip to replace in timeline

# -----------------------------------------------------------------------------
# Helper Functions
# -----------------------------------------------------------------------------
def get_timeline_by_name(name):
    count = project.GetTimelineCount()
    for i in range(1, count + 1):
        timeline = project.GetTimelineByIndex(i)
        if timeline.GetName() == name:
            return timeline
    return None

def find_clip_in_media_pool(file_path):
    # Retrieve all clips from root folder (simplification)
    clips = root_folder.GetClipList()
    for clip in clips:
        if clip.GetClipProperty("File Path") == file_path:
            return clip
    return None

def process_timeline(timeline, data):
    """
    Update text and replace media in the given timeline.
    """
    print(f"Processing Timeline: {timeline.GetName()}")
    
    # 1. Update Text (Fusion Text+)
    # We iterate all clips in Video Track 1 (V1), V2, etc.
    track_count = timeline.GetTrackCount("video")
    
    for track_index in range(1, track_count + 1):
        items = timeline.GetItemListInTrack("video", track_index)
        
        for item in items:
            name = item.GetName()
            
            # Text Replacement Logic
            # Check if it is a Text+ clip (Title)
            if item.GetFusionCompCount() > 0:
                comp = item.GetFusionCompByIndex(1)
                text_tool = comp.FindTool("Text1") # Standard Text+ tool name
                if not text_tool:
                    text_tool = comp.FindTool("StyledText")
                
                if text_tool:
                    # Update Room Name
                    text_tool.StyledText = data['room_name']
                    print(f"  - Updated Text: {data['room_name']}")
            
            # Media Replacement Logic
            # Check if this is the placeholder clip
            if PLACEHOLDER_CLIP_NAME in name:
                # We need the MediaPoolItem for the new image
                new_image_path = data['image_path']
                
                # Check if file exists
                if not os.path.exists(new_image_path):
                    print(f"  - Error: Image not found {new_image_path}")
                    continue

                # Import into Media Pool if not present
                new_media_item = find_clip_in_media_pool(new_image_path)
                if not new_media_item:
                    new_media_items = media_pool.ImportMedia([new_image_path])
                    if new_media_items:
                        new_media_item = new_media_items[0]
                
                if new_media_item:
                    # Replace the timeline clip with the new media item via Media Pool
                    # Note: Direct timeline clip replacement is tricky in API.
                    # Workaround: Force Replace via detailed technique or 
                    # simiply append if structure allows.
                    # 'ReplaceClip' is not a direct method on TimelineItem.
                    
                    # Effective Strategy: 
                    # 1. Use 'ReplaceClip' on the MediaPoolItem (Replaces usages in all timelines)
                    # -> BUT this would affect the master template if they share the source.
                    # -> Since we duplicated the timeline, they share the same source clip reference.
                    # -> So we CANNOT just replace the source file of the clip, it would change all timelines.
                    
                    # Correct Strategy for Timeline Item Replacement:
                    # The API is limited here. The robust way is to use 'Take Selector' or Conform.
                    # However, for this script, we will assume the User has 'Conform Lock enabled' or
                    # we use the 'MediaPoolItem.ReplaceClip' carefully on a COPY of the media item? No.
                    
                    # ALTERNATIVE: FORCE CONFORM
                    # timeline.ApplyGradeFromDRX... no.
                    
                    print(f"  - [Warning] Image replacement via API needs 'Force Conform' manually or advanced Fusion logic.")
                    print(f"  - Target Image: {new_image_path}")
                    
                    # For V1 script, we'll focus on Text. 
                    # Media replacement usually requires importing the timeline as XML/EDL with swapped paths.
                    pass

# -----------------------------------------------------------------------------
# Main Loop
# -----------------------------------------------------------------------------
def main():
    if not os.path.exists(CSV_PATH):
        print(f"Error: CSV not found at {CSV_PATH}")
        return

    # 1. Find Master Template
    template_timeline = get_timeline_by_name(TEMPLATE_TIMELINE_NAME)
    if not template_timeline:
        print(f"Error: Timeline '{TEMPLATE_TIMELINE_NAME}' not found.")
        print("Please rename your template timeline to 'MasterTemplate'.")
        return

    print("Starting Batch Automation...")
    
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            filename = row['filename']
            print(f"--- Creating: {filename} ---")
            
            # 2. Duplicate Timeline
            # Note: The API does not have a direct 'DuplicateTimeline' on the timeline object.
            # We must use Project's method or current selection.
            # Workaround: Create new timeline, append contents? No, loses effects.
            # Correct: MediaPool -> duplicated the timeline *item*.
            
            # Note: Timeline objects in Media Pool are MediaPoolItems.
            # We need to find the MediaPoolItem corresponding to the template timeline.
            # This is complex. So we skip explicit duplication in V1 if API restricts.
            
            # SIMPLIFIED V1:
            # We assume the user manually duplicates the timeline OR we accept that
            # we simply modify the *Current* timeline for testing.
            
            # Let's try to assume we are working on the currently open timeline for safety first,
            # OR search for a timeline that matches the 'filename' if pre-duplicated.
            
            target_timeline = get_timeline_by_name(filename)
            if target_timeline:
                 project.SetCurrentTimeline(target_timeline)
                 process_timeline(target_timeline, row)
                 
                 # 3. Add to Render Create
                 project.SetCurrentRenderFormatAndCodec("mp4", "H.264")
                 project.SetRenderSettings({"TargetDir": "C:\\RenderOutput", "CustomName": filename})
                 project.AddRenderJob()
            else:
                 print(f"Skipping {filename}: Timeline not found (Please duplicate 'MasterTemplate' and rename to '{filename}' first)")

    print("Batch processing complete.")

if __name__ == "__main__":
    main()
