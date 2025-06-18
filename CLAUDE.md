# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

### 開発
- `npm run dev` - 開発サーバーを3000番ポートで起動（自動でブラウザが開く）
- `npm run build` - 本番用ビルド
- `npm run preview` - 本番ビルドのプレビュー

## アーキテクチャ

PS2の起動画面のような美しいキューブシティを描画するReact + Three.jsアプリケーションです。キューブの街、パーティクル、青いモヤの効果を組み合わせています。

### コア構造
- **App.tsx**: メインアプリケーション。Canvasの設定とカメラ設定を行う
- **CubeCity.tsx**: メインシーンコーディネーター。全ての視覚要素をライティングとコントロールで統合
- **CubeBuildings.tsx**: 高さ、色、パルスする発光効果が異なるキューブのグリッドを手続き的に生成
- **ParticleSystem.tsx**: 上向きに移動してリサイクルされる浮遊パーティクルを作成。加算合成を使用
- **BlueMist.tsx**: カスタムキャンバステクスチャを使った大きくゆっくり動くモヤパーティクルを作成

### 技術的詳細
- React-Three.js統合に`@react-three/fiber`を使用
- OrbitControlsに`@react-three/drei`を使用
- 全ての視覚コンポーネントはアニメーションループに`useFrame`を使用
- パーティクルシステムはパフォーマンスのためBufferGeometryとFloat32Arrayを使用
- モヤ効果用のカスタムキャンバステクスチャ生成
- 中心からの距離に基づくキューブの配置とプロパティの手続き的生成

### ビジュアルデザイン
- 青い発光ライティングを持つダークブルー/ブラックカラースキーム
- 奥行き感のためのフォグ効果
- 複数の光源：環境光、平行光源、点光源
- 平行光源でシャドウキャスティングを有効化
- カメラは[0, 20, 30]に配置、視野角60°