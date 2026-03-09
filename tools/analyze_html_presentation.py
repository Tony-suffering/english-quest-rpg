#!/usr/bin/env python3
"""
HTML Presentation Analyzer
HTMLプレゼンテーションの自動分析ツール

使い方:
    python analyze_html_presentation.py path/to/presentation.html
"""

import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple
import json

class HTMLPresentationAnalyzer:
    def __init__(self, html_path: str):
        self.html_path = Path(html_path)
        self.html_content = self.html_path.read_text(encoding='utf-8')
        self.css_content = self._extract_css()

        # 評価スコア
        self.scores = {
            "padding": 0,
            "typography": 0,
            "color": 0,
            "responsive": 0
        }

        # 問題点
        self.issues = {
            "padding": [],
            "typography": [],
            "color": [],
            "responsive": []
        }

        # 推奨改善
        self.recommendations = {
            "padding": [],
            "typography": [],
            "color": [],
            "responsive": []
        }

    def _extract_css(self) -> str:
        """HTML内のCSSを抽出"""
        match = re.search(r'<style>(.*?)</style>', self.html_content, re.DOTALL)
        return match.group(1) if match else ""

    def analyze_all(self) -> Dict:
        """全項目を分析"""
        print("[*] HTML Presentation Analysis Started...")

        self.analyze_padding()
        self.analyze_typography()
        self.analyze_colors()
        self.analyze_responsive()

        return self.generate_report()

    # ========== パディング分析 ==========

    def analyze_padding(self):
        """パディング・スペーシングの分析"""
        print("\n[PADDING] Analyzing spacing and padding...")

        # すべてのmargin/padding値を抽出
        spacing_values = self._extract_spacing_values()

        # 8pxグリッド準拠チェック
        non_grid_values = []
        for selector, property, value in spacing_values:
            if not self._is_8px_grid_aligned(value):
                non_grid_values.append((selector, property, value))

        # スコア計算
        total_spacing = len(spacing_values)
        grid_aligned = total_spacing - len(non_grid_values)

        if total_spacing > 0:
            grid_score = (grid_aligned / total_spacing) * 20
            self.scores["padding"] = grid_score

        # 問題点の記録
        if non_grid_values:
            for selector, prop, value in non_grid_values[:5]:  # 最初の5件のみ
                self.issues["padding"].append({
                    "type": "grid_alignment",
                    "selector": selector,
                    "property": prop,
                    "current_value": value,
                    "recommended_value": self._round_to_8px_grid(value)
                })

                self.recommendations["padding"].append(
                    f"{selector} の {prop}: {value} → {self._round_to_8px_grid(value)} (8pxグリッドに準拠)"
                )

        # セクション間余白の一貫性チェック
        section_margins = self._extract_section_margins()
        if len(set(section_margins)) > 2:
            self.issues["padding"].append({
                "type": "inconsistent_section_spacing",
                "values": list(set(section_margins)),
                "recommendation": "セクション間の余白を統一してください"
            })
            self.recommendations["padding"].append(
                f"セクション間の余白が不統一: {set(section_margins)} → 統一推奨値: 40px または 64px"
            )

    def _extract_spacing_values(self) -> List[Tuple[str, str, int]]:
        """margin/padding値を抽出"""
        values = []

        # CSSブロックを分割
        css_blocks = re.findall(r'([^{]+)\{([^}]+)\}', self.css_content)

        for selector, properties in css_blocks:
            selector = selector.strip()

            # margin/paddingプロパティを抽出
            for prop_match in re.finditer(r'(margin|padding)(?:-(?:top|bottom|left|right))?\s*:\s*([^;]+);', properties):
                prop_name = prop_match.group(1)
                prop_value = prop_match.group(2).strip()

                # px値を抽出
                px_values = re.findall(r'(\d+)px', prop_value)
                for px_val in px_values:
                    values.append((selector, prop_name, int(px_val)))

        return values

    def _is_8px_grid_aligned(self, value: int) -> bool:
        """8pxグリッドに準拠しているか"""
        return value % 8 == 0

    def _round_to_8px_grid(self, value: int) -> int:
        """最も近い8pxの倍数に丸める"""
        return round(value / 8) * 8

    def _extract_section_margins(self) -> List[int]:
        """セクション間のmargin値を抽出"""
        margins = []

        # sectionタグのmarginを探す
        section_margins = re.findall(r'section\s*\{[^}]*margin[^:]*:\s*(\d+)px', self.css_content)
        section_margins += re.findall(r'h2\s*\{[^}]*margin[^:]*:\s*(\d+)px', self.css_content)

        for margin in section_margins:
            margins.append(int(margin))

        return margins

    # ========== タイポグラフィ分析 ==========

    def analyze_typography(self):
        """タイポグラフィの分析"""
        print("[TYPOGRAPHY] Analyzing fonts and text...")

        # フォントサイズを抽出
        font_sizes = self._extract_font_sizes()

        # タイプスケールの一貫性チェック
        type_scale_score = self._check_type_scale_consistency(font_sizes)
        self.scores["typography"] = type_scale_score

        # line-heightの最適性チェック
        line_heights = self._extract_line_heights()
        self._check_line_height_optimization(line_heights)

    def _extract_font_sizes(self) -> Dict[str, int]:
        """見出しと本文のフォントサイズを抽出"""
        sizes = {}

        # h1, h2, h3, body, pのサイズを抽出
        for element in ['h1', 'h2', 'h3', 'p', 'body']:
            match = re.search(rf'{element}\s*\{{[^}}]*font-size\s*:\s*(\d+)px', self.css_content)
            if match:
                sizes[element] = int(match.group(1))

        return sizes

    def _check_type_scale_consistency(self, font_sizes: Dict[str, int]) -> float:
        """タイプスケールの一貫性をチェック"""
        if not font_sizes or 'h1' not in font_sizes:
            return 0

        # Perfect Fourth (1.333) スケールの理想値
        base_size = 16
        ideal_scale = {
            'h1': 42,  # 16 * 1.333^3
            'h2': 32,  # 16 * 1.333^2
            'h3': 24,  # 16 * 1.333
            'p': 16,
            'body': 16
        }

        # 現在の値と理想値の差を計算
        total_diff = 0
        count = 0

        for element, current_size in font_sizes.items():
            if element in ideal_scale:
                ideal_size = ideal_scale[element]
                diff = abs(current_size - ideal_size)
                total_diff += diff
                count += 1

                if diff > 4:  # 4px以上の差
                    self.issues["typography"].append({
                        "type": "type_scale",
                        "element": element,
                        "current": current_size,
                        "recommended": ideal_scale[element]
                    })
                    self.recommendations["typography"].append(
                        f"{element}: {current_size}px → {ideal_scale[element]}px (Perfect Fourth スケールに準拠)"
                    )

        # スコア計算（差が小さいほど高スコア）
        if count == 0:
            return 0

        avg_diff = total_diff / count
        score = max(0, 20 - (avg_diff * 2))  # 平均差1pxごとに-2点

        return score

    def _extract_line_heights(self) -> Dict[str, float]:
        """line-height値を抽出"""
        line_heights = {}

        for element in ['h1', 'h2', 'h3', 'p', 'body']:
            match = re.search(rf'{element}\s*\{{[^}}]*line-height\s*:\s*([\d.]+)', self.css_content)
            if match:
                line_heights[element] = float(match.group(1))

        return line_heights

    def _check_line_height_optimization(self, line_heights: Dict[str, float]):
        """line-heightの最適性チェック"""
        # 見出しは1.2-1.4が理想
        for heading in ['h1', 'h2', 'h3']:
            if heading in line_heights:
                lh = line_heights[heading]
                if lh > 1.4:
                    self.issues["typography"].append({
                        "type": "line_height",
                        "element": heading,
                        "current": lh,
                        "recommended": 1.3
                    })
                    self.recommendations["typography"].append(
                        f"{heading}: line-height {lh} → 1.3 (見出しに最適)"
                    )

        # 本文は1.6-1.8が理想
        for body_element in ['p', 'body']:
            if body_element in line_heights:
                lh = line_heights[body_element]
                if lh > 1.8 or lh < 1.6:
                    recommended = 1.7
                    self.issues["typography"].append({
                        "type": "line_height",
                        "element": body_element,
                        "current": lh,
                        "recommended": recommended
                    })
                    self.recommendations["typography"].append(
                        f"{body_element}: line-height {lh} → {recommended} (本文に最適)"
                    )

    # ========== カラー分析 ==========

    def analyze_colors(self):
        """カラーパレットの分析"""
        print("[COLOR] Analyzing color palette...")

        # 使用されている色を抽出
        colors = self._extract_colors()

        # グレーの段階数チェック
        grays = [c for c in colors if self._is_gray(c)]

        if len(grays) > 3:
            self.issues["color"].append({
                "type": "too_many_grays",
                "count": len(grays),
                "colors": grays[:5]
            })
            self.recommendations["color"].append(
                f"グレーの段階が多すぎます: {len(grays)}色 → 3色に集約してください"
            )
            self.scores["color"] = max(0, 15 - (len(grays) - 3) * 2)
        else:
            self.scores["color"] = 15

        # アクセントカラーの使用チェック
        accent_colors = [c for c in colors if not self._is_gray(c) and c not in ['#ffffff', '#fff', 'white']]

        if len(accent_colors) < 2:
            self.recommendations["color"].append(
                "アクセントカラーの使用が限定的です。ブランドカラーを活用してください"
            )

    def _extract_colors(self) -> List[str]:
        """CSS内の色を抽出"""
        colors = set()

        # hex色を抽出
        colors.update(re.findall(r'#[0-9a-fA-F]{3,6}', self.css_content))

        # rgb/rgba色は省略（複雑になるため）

        return list(colors)

    def _is_gray(self, color: str) -> bool:
        """グレースケールかどうか判定"""
        if not color.startswith('#'):
            return False

        # #を除去
        hex_color = color[1:]

        # 3桁の場合は6桁に変換
        if len(hex_color) == 3:
            hex_color = ''.join([c*2 for c in hex_color])

        # RGB値を取得
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)

        # RGB値が近ければグレースケール
        return abs(r - g) < 10 and abs(g - b) < 10 and abs(r - b) < 10

    # ========== レスポンシブ分析 ==========

    def analyze_responsive(self):
        """レスポンシブデザインの分析"""
        print("[RESPONSIVE] Analyzing mobile support...")

        # メディアクエリの存在チェック
        has_media_queries = '@media' in self.css_content

        if not has_media_queries:
            self.issues["responsive"].append({
                "type": "no_media_queries",
                "recommendation": "メディアクエリを追加してモバイル対応してください"
            })
            self.recommendations["responsive"].append(
                "メディアクエリが見つかりません。モバイル対応を追加してください"
            )
            self.scores["responsive"] = 5
        else:
            self.scores["responsive"] = 10

        # Flexboxの折り返し制御チェック
        has_flex = 'display: flex' in self.css_content or 'display:flex' in self.css_content
        has_flex_wrap = 'flex-wrap' in self.css_content

        if has_flex and not has_flex_wrap:
            self.issues["responsive"].append({
                "type": "flex_wrap_missing",
                "recommendation": "flex-wrap: wrap を追加してください"
            })
            self.recommendations["responsive"].append(
                "Flexboxに flex-wrap が設定されていません。モバイルでレイアウトが崩れる可能性があります"
            )

    # ========== レポート生成 ==========

    def generate_report(self) -> Dict:
        """分析レポートを生成"""
        total_score = sum(self.scores.values())
        max_score = 20 + 20 + 15 + 10  # 各カテゴリの満点
        percentage = (total_score / max_score) * 100

        report = {
            "file": str(self.html_path),
            "total_score": total_score,
            "max_score": max_score,
            "percentage": round(percentage, 1),
            "scores": self.scores,
            "issues": self.issues,
            "recommendations": self.recommendations,
            "grade": self._get_grade(percentage)
        }

        return report

    def _get_grade(self, percentage: float) -> str:
        """スコアからグレードを取得"""
        if percentage >= 90:
            return "A (優秀)"
        elif percentage >= 80:
            return "B (良好)"
        elif percentage >= 70:
            return "C (合格)"
        elif percentage >= 60:
            return "D (要改善)"
        else:
            return "F (不合格)"

    def print_report(self, report: Dict):
        """レポートを見やすく出力"""
        print("\n" + "="*60)
        print(" HTML PRESENTATION ANALYSIS REPORT")
        print("="*60)

        print(f"\nFile: {report['file']}")
        print(f"Total Score: {report['total_score']:.1f}/{report['max_score']} ({report['percentage']:.1f}%)")
        print(f"Grade: {report['grade']}")

        print("\n[CATEGORY SCORES]")
        print(f"  Padding: {report['scores']['padding']:.1f}/20")
        print(f"  Typography: {report['scores']['typography']:.1f}/20")
        print(f"  Color: {report['scores']['color']:.1f}/15")
        print(f"  Responsive: {report['scores']['responsive']:.1f}/10")

        # 問題点
        total_issues = sum(len(issues) for issues in report['issues'].values())
        if total_issues > 0:
            print(f"\n[!] Issues Found: {total_issues}")

            for category, issues in report['issues'].items():
                if issues:
                    print(f"\n  [{category.upper()}]")
                    for issue in issues[:3]:  # 最初の3件のみ
                        print(f"    - {issue.get('recommendation', issue.get('type', 'Unknown'))}")

        # 推奨改善
        print("\n[RECOMMENDATIONS] Top 5")
        all_recommendations = []
        for recs in report['recommendations'].values():
            all_recommendations.extend(recs)

        for i, rec in enumerate(all_recommendations[:5], 1):
            print(f"  {i}. {rec}")

        print("\n" + "="*60)

        # 優先度別の推奨アクション
        print("\n[PRIORITY ACTIONS]")

        if report['percentage'] < 70:
            print("  [HIGH] High Priority:")
            print("    - Optimize line-height for typography")
            print("    - Align to 8px grid system")
            print("    - Add mobile responsive support")

        if report['percentage'] < 85:
            print("  [MED] Medium Priority:")
            print("    - Systematize color palette")
            print("    - Improve type scale consistency")
            print("    - Better utilize accent colors")

        print("  [LOW] Low Priority:")
        print("    - Fine-tune padding details")
        print("    - Optimize print styles")

        print("\n" + "="*60)


def main():
    if len(sys.argv) < 2:
        print("使い方: python analyze_html_presentation.py <html_file>")
        sys.exit(1)

    html_file = sys.argv[1]

    if not Path(html_file).exists():
        print(f"エラー: ファイルが見つかりません: {html_file}")
        sys.exit(1)

    # 分析実行
    analyzer = HTMLPresentationAnalyzer(html_file)
    report = analyzer.analyze_all()

    # レポート出力
    analyzer.print_report(report)

    # JSON出力（オプション）
    if '--json' in sys.argv:
        json_output = html_file.replace('.html', '_analysis.json')
        with open(json_output, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        print(f"\n[JSON] Output saved: {json_output}")


if __name__ == '__main__':
    main()
