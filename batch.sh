cp ./src/scss/_base.scss ./src/scss/object/project/_p-progress-step.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-enq-point-scale.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-enq-choose-one.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-chart-horizontal-bar.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-chart-rader.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-badge-list.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-badge-detail.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-tantou-msg.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-osusume-box.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-osusume-theme.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-plan-list.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-theme-filter.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-progress-chart.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-calendar.scss
cp ./src/scss/_base.scss ./src/scss/object/project/_p-progress-table.scss

sed -i '' -e 's/_____S_____/.p-progress-step/gi' ./src/scss/object/project/_p-progress-step.scss
sed -i '' -e 's/_____S_____/.p-enq-point-scale/gi' ./src/scss/object/project/_p-enq-point-scale.scss
sed -i '' -e 's/_____S_____/.p-enq-choose-one/gi' ./src/scss/object/project/_p-enq-choose-one.scss
sed -i '' -e 's/_____S_____/.p-chart-horizontal-bar/gi' ./src/scss/object/project/_p-chart-horizontal-bar.scss
sed -i '' -e 's/_____S_____/.p-chart-rader/gi' ./src/scss/object/project/_p-chart-rader.scss
sed -i '' -e 's/_____S_____/.p-badge-list/gi' ./src/scss/object/project/_p-badge-list.scss
sed -i '' -e 's/_____S_____/.p-badge-detail/gi' ./src/scss/object/project/_p-badge-detail.scss
sed -i '' -e 's/_____S_____/.p-tantou-msg/gi' ./src/scss/object/project/_p-tantou-msg.scss
sed -i '' -e 's/_____S_____/.p-osusume-box/gi' ./src/scss/object/project/_p-osusume-box.scss
sed -i '' -e 's/_____S_____/.p-osusume-theme/gi' ./src/scss/object/project/_p-osusume-theme.scss
sed -i '' -e 's/_____S_____/.p-plan-list/gi' ./src/scss/object/project/_p-plan-list.scss
sed -i '' -e 's/_____S_____/.p-theme-filter/gi' ./src/scss/object/project/_p-theme-filter.scss
sed -i '' -e 's/_____S_____/.p-progress-chart/gi' ./src/scss/object/project/_p-progress-chart.scss
sed -i '' -e 's/_____S_____/.p-calendar/gi' ./src/scss/object/project/_p-calendar.scss
sed -i '' -e 's/_____S_____/.p-progress-table/gi' ./src/scss/object/project/_p-progress-table.scss

sed -i '' -e 's/_____D_____/プログレスステップ/gi' ./src/scss/object/project/_p-progress-step.scss
sed -i '' -e 's/_____D_____/アンケート（4-5件法）/gi' ./src/scss/object/project/_p-enq-point-scale.scss
sed -i '' -e 's/_____D_____/アンケート（択一式）/gi' ./src/scss/object/project/_p-enq-choose-one.scss
sed -i '' -e 's/_____D_____/診断結果（リーダー像）/gi' ./src/scss/object/project/_p-chart-horizontal-bar.scss
sed -i '' -e 's/_____D_____/診断結果（実践度）/gi' ./src/scss/object/project/_p-chart-rader.scss
sed -i '' -e 's/_____D_____/バッジ一覧/gi' ./src/scss/object/project/_p-badge-list.scss
sed -i '' -e 's/_____D_____/バッジ詳細/gi' ./src/scss/object/project/_p-badge-detail.scss
sed -i '' -e 's/_____D_____/担当者からのメッセージ/gi' ./src/scss/object/project/_p-tantou-msg.scss
sed -i '' -e 's/_____D_____/おすすめボックス/gi' ./src/scss/object/project/_p-osusume-box.scss
sed -i '' -e 's/_____D_____/おすすめテーマ/gi' ./src/scss/object/project/_p-osusume-theme.scss
sed -i '' -e 's/_____D_____/学習計画リスト/gi' ./src/scss/object/project/_p-plan-list.scss
sed -i '' -e 's/_____D_____/テーマフィルタ/gi' ./src/scss/object/project/_p-theme-filter.scss
sed -i '' -e 's/_____D_____/学習実績グラフ/gi' ./src/scss/object/project/_p-progress-chart.scss
sed -i '' -e 's/_____D_____/カレンダー/gi' ./src/scss/object/project/_p-calendar.scss
sed -i '' -e 's/_____D_____/学習実績一覧/gi' ./src/scss/object/project/_p-progress-table.scss
