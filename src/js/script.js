// 名前空間
let app = {};

/* --------------------------------------------------------------------------------
   ページトップボタン
   -------------------------------------------------------------------------------- */

$(function () {
  $('.l-pagetop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  $(window).on('scroll', function () {
    var sc = $(this).scrollTop();
    if (sc > 100) {
      $('.l-pagetop').addClass('is-active');
    } else {
      $('.l-pagetop').removeClass('is-active');
    }
  });
});

/* --------------------------------------------------------------------------------
   ドロップダウンメニュー（ヘルプメニューなど）
   -------------------------------------------------------------------------------- */

$(function () {
  $('.l-header__others__help-btn').on('click', function() {
    toggleDropdownMenu($(this), $('.c-dropdown-menu.is-help'));
  });

  $('.l-info-bar ._account_btn').on('click', function() {
    toggleDropdownMenu($(this), $('.c-dropdown-menu._account'));
  });

  // ドロップダウンメニューからマウス離れると、メニュー消す
  $('.c-dropdown-menu').on('mouseleave', function() {
    // メニュー側にはトリガーボタンの情報をもたせていないので両方消している
    var btn = $('.l-info-bar ._account_btn, .l-header__others__help-btn');
    hideDropdownMenu(btn, $('.c-dropdown-menu'));
  });

  // ドロップダウンの表示非表示の切り替え
  //   btn: トリガーとなる要素の jQuery オブジェクト
  //   menu: 対象要素の jQuery オブジェクト
  function toggleDropdownMenu(btn, menu) {
    var menuIsOpen = btn.data('menu-is-open');
    if (menuIsOpen === false) {
      menu.show();
    } else {
      menu.hide();
    }
    btn.data('menu-is-open', !menuIsOpen); // 逆にする
  }

  // ドロップダウンの表示
  function showDropdownMenu(btn, menu) {
    menu.show();
    btn.data('menu-is-open', true);
  }

  // ドロップダウンの非表示
  function hideDropdownMenu(btn, menu) {
    menu.hide();
    btn.data('menu-is-open', false);
  }
});

/* --------------------------------------------------------------------------------
   スマホメニュー
   -------------------------------------------------------------------------------- */

app.spMenu = {};

$(function() {
  app.spMenu.init();
});

// スマホメニュー初期化
app.spMenu.init = function() {
  this.menu = $('.l-sp-menu');
  this.btn = $('.l-sp-menu-btn');

  // .l-sp-menu は .l-gnavをクローンして使う
  $('.site-header._origin .l-gnav').clone(true).addClass('is-sp').prependTo(this.menu);

  // 受講期間もクローン
  $('.l-info-bar__datespan').clone(true).addClass('is-sp').prependTo(this.menu);

  // メニュー開くとき body のスクロール位置を保持する用
  this.scrollPos = 0;

  // 以下イベントハンドラ
  const _this = this;

  // スマホメニューボタン
  this.btn.on('click', function() {
    _this.toggle();
  });

  // 上位階層ボタン
  this.menu.find('.l-sp-menu__parent > button').on('click', function() {
    _this.toggleChild($(this));
  });

  // 閉じるボタン
  this.menu.find('.l-sp-menu__close').on('click', function() {
    _this.close(false);
  });

  $(window).on('resize', function() {
    if (_this.menu.is(':visible') === true) {
      if (spp.getDeviceType() === 'tab' || spp.getDeviceType() === 'pc') {
        _this.close();
      }
    }
  });
};

// スマホメニュートグル
app.spMenu.toggle = function() {
  if (this.btn.hasClass('is-active') === true) {
    this.close(true);
  } else {
    this.open(true);
  }
};

// スマホメニュー開く（anim: アニメーション有無）
app.spMenu.open = function(anim) {
  this.btn.addClass('is-active');
  if (anim === true) {
    this.menu.slideDown(200);
  } else {
    this.menu.show();
  }
  this.menu.scrollTop(0);
};

// スマホメニュー閉じる（anim: アニメーション有無）
app.spMenu.close = function(anim) {
  this.btn.removeClass('is-active');
  if (anim === true) {
    this.menu.slideUp(200);
  } else {
    this.menu.hide();
  }
};

// スマホメニューの子メニューをトグル
app.spMenu.toggleChild = function(triggerBtn) {
  var child = triggerBtn.siblings('.l-sp-menu__child');
  if (triggerBtn.hasClass('is-active') === true) {
    this.closeChild(triggerBtn);
  } else {
    this.openChild(triggerBtn);
  }
}

// スマホメニューの子メニューを開く
app.spMenu.openChild = function(triggerBtn) {
  this.menu.find('.l-sp-menu__child').slideUp(200); // とりあえずぜんぶ閉じる
  this.menu.find('.l-sp-menu__parent > button').removeClass('is-active');
  triggerBtn.addClass('is-active');
  triggerBtn.siblings('.l-sp-menu__child').slideDown(200);
}

// スマホメニューの子メニューを閉じる
app.spMenu.closeChild = function(triggerBtn) {
  triggerBtn.removeClass('is-active');
  triggerBtn.siblings('.l-sp-menu__child').slideUp(200);
}

/* --------------------------------------------------------------------------------
   モーダル操作
   -------------------------------------------------------------------------------- */

app.modal = {};

// モーダルを開く
app.modal.open = function(modalId) {
  $(modalId).closest('.l-modal').addClass('is-visible');
  $('body').css('overflow-y', 'hidden'); // 本文の縦スクロールを無効
};

// モーダルを閉じる
app.modal.close = function(modalId) {
  $(modalId).closest('.l-modal').removeClass('is-visible');
  $('body').css('overflow-y', 'auto'); // 本文の縦スクロールを有効
};

// モーダル関連のイベントハンドラ
$(function() {
  // 閉じる
  $(document).on('click', '.l-modal__close, .l-modal__close-btn', function (e) {
    const modalId = '#' + $(this).closest('.l-modal').prop('id');
    app.modal.close(modalId);
    e.stopPropagation();
    return false;
  });
});

/* --------------------------------------------------------------------------------
   吹き出し通知操作
   -------------------------------------------------------------------------------- */

app.baloon = {};

// 吹き出し通知を開く
app.baloon.open = function(baloonId) {
  // ウィンドウ幅の中心に出す
  const w = $(baloonId).outerWidth();
  const left = ($(window).width() - w) / 2;
  $(baloonId).css({
    'left': left,
    'opacity': 1,
  }).addClass('is-visible');
};

// 吹き出し通知を閉じる
app.baloon.close = function(baloonId) {
  $(baloonId).animate({
    'opacity': 0,
    'top': '12rem',
  }, 200, function() {
    $(baloonId).removeClass('is-visible');
  });
};

// 吹き出し関連のイベントハンドラ
$(function() {
  $(document).on('click', '.l-baloon__close', function (e) {
    const baloonId = '#' + $(this).closest('.l-baloon').prop('id');
    app.baloon.close(baloonId);
    e.stopPropagation();
    return false;
  });

  // 吹き出し本体をクリックしても閉じないように
  $(document).on('click', '.l-baloon', function (e) {
    e.stopPropagation();
    return false;
  });
});

/* --------------------------------------------------------------------------------
   ミニメッセージ操作
   -------------------------------------------------------------------------------- */

app.miniMsg = {};

// 渡されたテキスト（String）のミニメッセージを表示
app.miniMsg.openWithText = function(msgStr) {
  const  msg = $('<div class="l-mini-msg">');
  msg.text(msgStr).appendTo('body');

  // ウィンドウ幅の中心に出す
  const w = msg.outerWidth();
  const left = ($(window).width() - w) / 2;
  msg.css('left', left);

  // 上から降りてくるアニメーションで表示
  msg.animate({
    'opacity': 1,
    'top': '3rem',
  });

  // 一定時間後、上へ消える
  app.miniMsg.timerId = setTimeout(function() {
    msg.animate({
      'opacity': 0,
      'top': '-15rem',
    }, function() {
      $(this).remove();
    });
  }, 4000);
};

/* --------------------------------------------------------------------------------
   アコーディオン
   -------------------------------------------------------------------------------- */

$(function() {
  // クリックでトグル
  $(document).on('click', '.c-accordion .c-accordion__label', function() {
    const parent = $(this).closest('.c-accordion');
    parent.toggleClass('is-open');
    if (parent.hasClass('is-open') === true) {
      parent.find('.c-accordion__body').slideDown(200);
    } else {
      parent.find('.c-accordion__body').slideUp(200);
    }
  });

  // 初期状態を設定
  $('.c-accordion').each(function() {
    $(this).find('.c-accordion__body').hide();

    if ($(this).hasClass('is-open') === true) {
      $(this).find('.c-accordion__body').show();
    }
  });
});

/* --------------------------------------------------------------------------------
   ファイル選択したら選択ファイルを表示
   -------------------------------------------------------------------------------- */

$(function() {
  $(document).on('change', '.c-form-file input:file', function () {
    // クリアボタンの表示制御、ファイル名の表示
    if ($(this).val() === '') {
      $(this).siblings('.c-form-file__value').text('');
    } else {
      const files = $(this).prop('files');
      let filesArray = [];
      for (let i = 0; i < files.length; i++) {
        filesArray.push(files[i].name);
      }
      $('.c-form-file__value').text(filesArray.join(', '));
    }
  });
});

/* --------------------------------------------------------------------------------
   ファイル選択のドラッグアンドドロップ
   -------------------------------------------------------------------------------- */

$(function() {
  var ddArea = $('.c-form-file-drop');
  ddArea.on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).addClass('is-over');
  });
  ddArea.on('dragleave', function (e) {
    e.stopPropagation();
    e.preventDefault();
    ddArea.removeClass('is-over');
  });
  ddArea.on('drop', function (e) {
    e.preventDefault();
    ddArea.removeClass('is-over');
  });
});

/* --------------------------------------------------------------------------------
   連絡BOX一覧は行全体をクリッカブルにする
   -------------------------------------------------------------------------------- */

$(function() {
  $(document).on('click', '.p-renraku-list tr', function () {
    const href = $(this).find('a').attr('href');
    location.href = href;
  });
});

/* --------------------------------------------------------------------------------
   アンケートのテーブルセル（ラジオボタン）はセル全体をクリッカブルにする
   -------------------------------------------------------------------------------- */

$(function() {
  // クリック
  $(document).on('click', '.p-enq-point-scale tbody td', function (e) {
    $(this).find('input:radio').prop('checked', true);

    // アンケート「日ごろのマネジメント行動」：もっとも自信がある/ないは、それぞれ１つずつしか選べない
    // bodyクラスで適用対象を限定
    if ($('body').hasClass('page-diagnose is-02') === true ||
        $('body').hasClass('page-diagnose is-04') === true) {
      $(this).closest('tr').find(':radio').prop('checked', false);
      $(this).find('input:radio').prop('checked', true);
    }
  });
});

/* --------------------------------------------------------------------------------
   おすすめの学習ステップ：表示非表示切替
   -------------------------------------------------------------------------------- */

$(function() {
  $(document).on('click', '.page-study-plan__hide, .page-study-plan__show', function() {
    $(this).closest('.page-study-plan__osusume').toggleClass('is-hide');
  });
});

/* --------------------------------------------------------------------------------
   学習テーマカードへのユニーク data 属性の付与
   --------------------------------------------------------------------------------
   NOTE: 実装の際は別途テーマID的なものをサーバサイドで付与するようにしてください
   -------------------------------------------------------------------------------- */

$(function() {
  $('.p-theme-card-list').each(function(i) {
    $(this).find('.p-theme-card').each(function(j) {
      $(this).data('themeId', i + '-' + j);
    });
  });
});

/* --------------------------------------------------------------------------------
   学習計画：「学習テーマ一覧から追加」ポップアップ関連
   -------------------------------------------------------------------------------- */

$(function() {
  // テーマ検索条件のクリア
  $(document).on('click', '.p-theme-filter__clear', function(e) {
    $('.p-theme-filter__conditions input:checkbox').prop('checked', false);
  });

  // 選択中テーマの削除
  $(document).on('click', '.p-selected-theme__delete', function(e) {
    const themeId = $(this).data('themeId');
    $(this).closest('li').remove();

    // 対象のテーマカードのチェックボックスをオフにする（NOTE: themeId はサーバ側にてユニークに付与してください）
    const tgt = $('.p-theme-card[data-themeId="' + themeId + '"]');
    tgt.find('.p-theme-card__check input').prop('checked', false);
  });
});

/* --------------------------------------------------------------------------------
   学習テーマリスト
   -------------------------------------------------------------------------------- */

// ダミー項目を追加する（カード幅を統一するため）
$(function() {
  // トップと学習計画とコンポーネント一覧のみ
  if ($('body').hasClass('page-study') === false &&
      $('body').hasClass('page-study-plan') === false &&
      $('body').hasClass('page-component') === false) {
    return false;
  }

  $('.p-theme-card-list').each(function() {
    for (let i = 0; i < 20; i++) {
      $('<li class="is-filler">').appendTo(this);
    }
  });
});

/* --------------------------------------------------------------------------------
   学習月プルダウンでリンクが開かないようにする
   -------------------------------------------------------------------------------- */

$(function() {
  $('.p-theme-card select').on('click', function(e) {
    e.stopPropagation();
    return false;
  });
});

/* --------------------------------------------------------------------------------
   学習計画のドラッグアンドドロップ & プルダウンによる学習月変更
   -------------------------------------------------------------------------------- */

$(function() {
  let dragFrom = '';
  let isChangeMonth = false;

  // ドラッグ可能にする
  $('.p-plan-list__section:not(.is-past) .p-theme-card-list > li:not(.is-filler)').draggable({
    containment: '#plan',
    start: function(ev, ui) {
      const month = $(this).closest('.p-plan-list__section').prop('id');
      dragFrom = month;
    },
    // ドラッグ終了時
    stop: function(ev, ui) {
      // ドロップ領域以外にドロップした場合は元の場所に戻す
      if (isChangeMonth === false) {
        const targetId = '#' + ev.target.id;
        $(targetId).animate({ left: 0, top: 0 }, 200);
      }
      isChangeMonth = false;
    }
  });

  // ドロップ可能にする
  $('.p-plan-list.is-monthly .p-plan-list__section:not(.is-past)').droppable({
    //ドロップOKの要素を指定
    accept: '.p-theme-card-list > li',
    hoverClass: 'is-dragover',

    //ドロップ時の動作
    drop : function(ev, ui){
      const targetId = '#' + ev.target.id;

      // 同じ月内ならなにもしない
      const dragTo = $(this).prop('id');
      if (dragTo === dragFrom) {
        ui.draggable.animate({ left: 0, top: 0 }, 200);
        return false;
      }

      // 末尾にアペンド
      $(targetId).find('.p-plan-list__add-li').before(ui.draggable);
      ui.draggable.css({ left: 0, top: 0 });
      isChangeMonth = true;
      app.miniMsg.openWithText('学習テーマ「○○○○○○○○○○」を2022年10月に移動しました');
    },

    // ドラッグオーバー時の動作
    over: function(ev, ui) {
      // 同じ月内ならなにもしない
      const dragTo = $(this).prop('id');
      if (dragTo === dragFrom) {
        $(this).removeClass('is-dragover');
      };
    }
  });

  // プルダウンによる学習月変更
  $(document).on('change', '.p-plan-list__section .p-theme-card select', function(e) {
    const month = $(this).val();
    const section = $('.p-plan-list__section[data-month="' + month + '"]');
    section.css('display', 'flex');
    let card = $(this).closest('li').remove();
    section.find('.p-plan-list__add-li').before(card);
    card.draggable({
      containment: '#plan',
      start: function(ev, ui) {
        const month = $(this).closest('.p-plan-list__section').prop('id');
        dragFrom = month;
      },
      // ドラッグ終了時
      stop: function(ev, ui) {
        // ドロップ領域以外にドロップした場合は元の場所に戻す
        if (isChangeMonth === false) {
          const targetId = '#' + ev.target.id;
          $(targetId).animate({ left: 0, top: 0 }, 200);
        }
        isChangeMonth = false;
      }
    });
    app.miniMsg.openWithText('学習テーマ「○○○○○○○○○○」を2022年10月に移動しました');

    e.stopPropagation();
    return false;
  });
});

$(function() {
  // 月セクションにID付与
  $('.p-plan-list__section').each(function(i) {
    $(this).attr('id', 'month-section-' + i);
  });

  // テーマカード（のラッパーのLI要素）にID付与
  $('.p-plan-list__section').each(function(i) {
    $(this).find('.p-theme-card-list > li').each(function(j) {
      $(this).attr('id', 'card-item-' + i + '-' + j);
    });
  });
});

/* --------------------------------------------------------------------------------
   デバイス（PC/SP）タイプを返す
   -------------------------------------------------------------------------------- */

// CSSのメディアクエリと同じ値を取得したいので window.innerWidth を使う
// ※$(window).width() だとスクロールバーを含まない幅になり少しズレる
app.getDeviceType = function() {
  if (window.innerWidth < 600) {
    return 'sp';
  } else if (window.innerWidth < 769) {
    return 'tabS';
  } else if (window.innerWidth < 1025) {
    return 'tab';
  } else {
    return 'pc';
  }
};

/* --------------------------------------------------------------------------------
   診断結果グラフ（リーダー像）
   -------------------------------------------------------------------------------- */

app.chartLeader = {};

// chart.jsに渡すデータ
app.chartLeader.labels = ["改革主導型", "チームビルディング型", "価値観尊重型", "着実実行型"];
app.chartLeader.data = [65, 59, 92, 41];

// オプション
app.chartLeader.options = {
  indexAxis: "y",
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { display: false },
    },
    y: {
      ticks: { font: { size: 13 } },
    },
  },
}

// グラフを生成
app.chartLeader.generate = function(elm) {
  this.elm = elm;

  if ($(this.elm).length === 0) return false;

  // sp ではラベルサイズ小さく
  if (app.getDeviceType() === 'sp') {
    this.options.scales.y.ticks.font.size = 9;
  }

  // canvas のコンテキスト
  let ctx = $(this.elm).get(0).getContext('2d');

  this.chartjs = new Chart(ctx, {
    type: "bar",
    data: {
      labels: app.chartLeader.labels,
      datasets: [{
        axis: "y",
        data: app.chartLeader.data,
        barPercentage: 1,
        categoryPercentage: .6,
        borderWidth: 1,
        backgroundColor: [
          "rgba(1, 156, 225, .3)",
          "rgba(216, 184, 68, .3)",
          "rgba(128, 195, 93, .3)",
          "rgba(134, 110, 200, .3)",
        ],
        borderColor: [
          "#019CE1",
          "#D8B844",
          "#80C35D",
          "#866EC8",
        ],
        hoverBackgroundColor: [
          "rgba(1, 156, 225, .3)",
          "rgba(216, 184, 68, .3)",
          "rgba(128, 195, 93, .3)",
          "rgba(134, 110, 200, .3)",
        ],
        hoverBorderColor: [
          "#019CE1",
          "#D8B844",
          "#80C35D",
          "#866EC8",
        ],
      }]
    },
    options: this.options,
  });
};

// リサイズでラベルサイズ更新
$(function() {
  $(window).on('resize', function() {
    // チャートがなければなにもしない
    if ($(app.chartLeader.elm).length === 0) return false;

    // sp ではラベルサイズ小さく
    app.chartLeader.chartjs.options.scales.y.ticks.font.size = (app.getDeviceType() === 'sp') ? 9 : 13;
    app.chartLeader.chartjs.update();
  });
});

/* --------------------------------------------------------------------------------
   診断結果グラフ（実践度）
   -------------------------------------------------------------------------------- */

app.chartJissen = {};

// chart.jsに渡すデータ
app.chartJissen.labels = [ "イノベーション", "エンゲージメント", "組織（業務）", "組織（人）", "自分" ];
app.chartJissen.data = [3, 4, 2, 4, 3];

// グラフを生成
app.chartJissen.generate = function(elm) {
  this.elm = elm;

  if ($(this.elm).length === 0) return false;

  // canvas のコンテキスト
  let ctx = $(this.elm).get(0).getContext('2d');

  this.chartjs = new Chart(ctx, {
    type: "radar",
    data: {
      labels: app.chartJissen.labels,
      datasets: [{
        label: '診断結果',
        yAxisID: 'y',
        data: app.chartJissen.data,
        fill: true,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 8,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderWidth: 3,
        pointHitRadius: 30,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
      layout: {
        padding: 10,
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 4,
          pointLabels: { display: false },
          ticks: {
            stepSize: 1,
            display: false,
          },
        },
      },
    },
  });

  app.chartJissen.displayLabel();
};

// ラベルを独自で配置する（位置調整したいため）
app.chartJissen.displayLabel = function() {
  $('.p-chart-jissen__label').remove();

  const rect = document.querySelector(this.elm).getBoundingClientRect();
  const clientRect = $(this.elm).position();
  const wrapper = $(this.elm).closest('div');

  // canvas 内の（余白を除いた）グラフそのもののサイズは直接取得できないので近似値を使う
  const chartSize = Math.min(rect.width, rect.height);

  for (let i = 0; i < this.labels.length; i++) {
    const labelStr = this.labels[i];
    const label = $('<span class="p-chart-jissen__label">');
    label.addClass('is-' + i).text(labelStr).appendTo(wrapper);

    // 個別の位置調整
    const w = label.width();
    const offsetX = w / 2;
    let left = 'auto', right = 'auto', top = 'auto', bottom = 'auto';

    if (i === 0) {
      left = 'calc(50% - ' + offsetX + 'px)';
      top = '2%';
    } else if (i === 1) {
      if (app.getDeviceType() === 'sp') {
        left = 'calc(50% + ' + (chartSize / 3) + 'px)';
        top = '20%';
      } else {
        left = 'calc(50% + ' + (chartSize / 2 + 10) + 'px)';
        top = '35%';
      }
    } else if (i === 2) {
      left = 'calc(50% + ' + (chartSize / 3.2 - offsetX) + 'px)';
      top = '87%';
    } else if (i === 3) {
      right = 'calc(50% + ' + (chartSize / 3.2 - offsetX) + 'px)';
      top = '87%';
    } else if (i === 4) {
      right = 'calc(50% + ' + (chartSize / 2 + 10) + 'px)';
      top = '35%';
    }
    label.css({ 'left': left, 'top': top, 'right': right, 'bottom': bottom });
  }
};

// リサイズでラベル再描画（位置調整）
$(function() {
  $(window).on('resize', function() {
    // チャートがなければなにもしない
    if ($(app.chartJissen.elm).length === 0) return false;
    app.chartJissen.displayLabel();
  });
});

/* --------------------------------------------------------------------------------
   アンケート結果グラフ
   -------------------------------------------------------------------------------- */

app.chartEnq = {};

// chart.jsに渡すデータ
app.chartEnq.labels = ["目標管理とは", "目標設定のステップ", "目標設定スキル", "目標の展開・部下指導", "面談"];
app.chartEnq.data_1 = { // 知識
  before: [3, 1, 1, 2, 2],
  after: [4, 4, 4, 4, 3],
};
app.chartEnq.data_2 = { // 実践・自信の程度
  before: [1, 2, 2, 3, 1],
  after: [3, 4, 4, 4, 3],
};

// グラフを生成
app.chartEnq.generate = function(elm) {
  this.elm = elm;

  if ($(this.elm).length === 0) return false;

  // データ
  let data = {};
  if (elm === '#chart-enq-1') {
    data = this.data_1;
  } else if (elm === '#chart-enq-2') {
    data = this.data_2;
  }

  // canvas のコンテキスト
  let ctx = $(this.elm).get(0).getContext('2d');

  this.chartjs = new Chart(ctx, {
    type: "radar",
    data: {
      labels: app.chartEnq.labels,
      datasets: [{
        label: "事前アンケート",
        yAxisID: 'y2',
        data: data.before,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointRadius: 8,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderWidth: 3,
        pointHitRadius: 30,
      }, {
        label: '事後アンケート',
        yAxisID: 'y2',
        data: data.after,
        fill: true,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 8,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderWidth: 3,
        pointHitRadius: 30,
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
      layout: {
        padding: 10,
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 4,
          pointLabels: { display: false },
          ticks: {
            stepSize: 1,
            display: false,
          },
        },
      },
    },
  });

  this.displayLegend();
  this.displayLabel();
};

// 凡例を独自で配置する（位置調整したいため）
app.chartEnq.displayLegend = function() {
  const canvasWrapper = $(this.elm).closest('div');
  const legendWrapper = $('<ul class="p-chart-jissen__legend">').appendTo(canvasWrapper);
  const legendLabel = [ '事前アンケート', '事後アンケート' ];

  for (let i = 0; i < legendLabel.length; i++) {
    const legendStr = legendLabel[i];
    const legend = $('<li>');
    legend.addClass('is-' + i).text(legendStr).appendTo(legendWrapper);
  }
};

// ラベルを独自で配置する（位置調整したいため）
app.chartEnq.displayLabel = function() {
  $(this.elm).closest('div').find('.p-chart-jissen__label').remove();

  for (let i = 0; i < this.labels.length; i++) {
    const labelStr = this.labels[i];
    const label = $('<span class="p-chart-jissen__label">');
    label.addClass('is-' + i).text(labelStr).appendTo($(this.elm).closest('div'));
  }

  this.adjustLabelPosition();
};

// ラベル個別の位置調整
app.chartEnq.adjustLabelPosition = function() {
  // canvas 内の（余白を除いた）グラフそのもののサイズ ※直接取得できないので近似値を使う
  const rect = document.querySelector(this.elm).getBoundingClientRect();
  const chartSize = Math.min(rect.width, rect.height);

  $('.p-chart-jissen__label').each(function(i) {
    const w = $(this).width();
    const offsetX = w / 2;
    let left = 'auto', right = 'auto', top = 'auto', bottom = 'auto';

    if ($(this).hasClass('is-0') === true) {
      left = 'calc(50% - ' + offsetX + 'px)';
      top = '2%';
    } else if ($(this).hasClass('is-1') === true) {
      if (app.getDeviceType() === 'sp') {
        left = 'calc(50% + ' + (chartSize / 3) + 'px)';
        top = '20%';
      } else {
        left = 'calc(50% + ' + (chartSize / 2 + 10) + 'px)';
        top = '35%';
      }
    } else if ($(this).hasClass('is-2') === true) {
      left = 'calc(50% + ' + (chartSize / 3.2 - offsetX) + 'px)';
      top = '87%';
    } else if ($(this).hasClass('is-3') === true) {
      right = 'calc(50% + ' + (chartSize / 3.2 - offsetX) + 'px)';
      top = '87%';
    } else if ($(this).hasClass('is-4') === true) {
      right = 'calc(50% + ' + (chartSize / 2 + 10) + 'px)';
      top = '35%';
    }
    $(this).css({ 'left': left, 'top': top, 'right': right, 'bottom': bottom });
  });
};

// リサイズでラベル再描画（位置調整）
$(function() {
  $(window).on('resize', function() {
    // チャートがなければなにもしない
    if ($(app.chartEnq.elm).length === 0) return false;
    app.chartEnq.adjustLabelPosition();
  });
});

/* --------------------------------------------------------------------------------
   学習実績グラフ
   -------------------------------------------------------------------------------- */

app.chartPrg = {};

// chart.jsに渡すデータ（4ヶ月のサンプル）
const sampleData_1 = {
  'label': ["2022/4", "2022/5", "2022/6", "2022/7"],
  'plan': [1, 2, 4, 7],
  'completed': [0, 1, 5, 7],
};

// chart.jsに渡すデータ（18ヶ月のサンプル）
const sampleData_2 = {
  'label': ["2022/7", "2022/8", "2022/9", "2022/10", "2022/11", "2022/12", "2023/1", "2023/2", "2023/3", "2023/4", "2023/5", "2023/6"],
  'plan': [1, 5, 7, 10, 13, 15, 18, 20, 24, 26, 28, 30, 28, 31, 32],
  'completed': [1, 3, 4],
};

// chart.jsに渡すデータ（24ヶ月のサンプル）
const sampleData_3 = {
  'label': ["2022/4", "2022/5", "2022/6", "2022/7", "2022/8", "2022/9", "2022/10", "2022/11", "2022/12", "2023/1", "2023/2", "2023/3", "2023/4", "2023/5", "2023/6", "2023/7", "2023/8", "2023/9", "2023/10", "2023/11", "2023/12", "2024/1", "2024/2", "2024/3"],
  'plan': [1, 2, 2, 3, 5, 8, 10, 12, 16, 17, 20, 23, 25, 26, 28, 28, 31, 32, 34, 35, 38, 39, 43, 45],
  'completed': [0, 1, 2, 2, 2, 3, 5, 6, 8, 11, 12, 12, 15, 18, 16, 24, 26, 28, 28, 32, 37, 40, 41, 41, 45],
};

// chart.jsに渡すデータ（36ヶ月のサンプル）
const sampleData_4 = {
  'label': ["2022/4", "2022/5", "2022/6", "2022/7", "2022/8", "2022/9", "2022/10", "2022/11", "2022/12", "2023/1", "2023/2", "2023/3", "2023/4", "2023/5", "2023/6", "2023/7", "2023/8", "2023/9", "2023/10", "2023/11", "2023/12", "2024/1", "2024/2", "2024/3", "2024/4", "2024/5", "2024/6", "2024/7", "2024/8", "2024/9", "2024/10", "2024/11", "2024/12", "2025/1", "2025/2", "2025/3"],
  'plan': [1, 2, 2, 3, 5, 8, 10, 12, 16, 17, 20, 23, 25, 26, 28, 28, 31, 32, 34, 35, 38, 39, 43, 45, 46, 48, 48, 52, 53, 54, 56, 57, 59, 62, 65, 66],
  'completed': [0, 1, 2, 2, 2, 3, 5, 6, 8, 11, 12, 12, 15, 18, 16, 24, 26, 28, 28, 32, 37, 40, 41, 41, 45, 48, 49, 49, 49, 54, 55, 57, 58, 58, 61, 62, 66],
};

// chart.jsに渡すデータ（48ヶ月のサンプル）
const sampleData_5 = {
  'label': ["2022/1", "2022/2", "2022/3", "2022/4", "2022/5", "2022/6", "2022/7", "2022/8", "2022/9", "2022/10", "2022/11", "2022/12", "2023/1", "2023/2", "2023/3", "2023/4", "2023/5", "2023/6", "2023/7", "2023/8", "2023/9", "2023/10", "2023/11", "2023/12", "2024/1", "2024/2", "2024/3", "2024/4", "2024/5", "2024/6", "2024/7", "2024/8", "2024/9", "2024/10", "2024/11", "2024/12", "2025/1", "2025/2", "2025/3", "2025/4", "2025/5", "2025/6", "2025/7", "2025/8", "2025/9", "2025/10", "2025/11", "2025/12", "2026/1", "2026/2", "2026/3", "2026/4", "2026/5", "2026/6", "2026/7", "2026/8", "2026/9", "2026/10", "2026/11", "2026/12"],
  'plan': [1, 2, 2, 3, 5, 8, 10, 12, 16, 17, 20, 23, 25, 26, 28, 28, 31, 32, 34, 35, 38, 39, 43, 45, 46, 48, 48, 52, 53, 54, 56, 57, 59, 62, 65, 66, 68, 69, 69, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92],
  'completed': [0, 1, 2, 2, 2, 3, 5, 6, 8, 11, 12, 12, 15, 18, 16, 24, 26, 28, 28, 32, 37, 40, 41, 41, 45, 48, 49, 49, 49, 54, 55, 57, 58, 58, 61, 62, 66],
};

// NOTE: モックアップ用のコード　ここから
if (location.search === '?1') {
  app.chartPrg.data = sampleData_1;
} else if (location.search === '?2') {
  app.chartPrg.data = sampleData_2;
} else if (location.search === '?3') {
  app.chartPrg.data = sampleData_3;
} else if (location.search === '?4') {
  app.chartPrg.data = sampleData_4;
} else if (location.search === '?5') {
  app.chartPrg.data = sampleData_5;
} else {
  app.chartPrg.data = sampleData_2;
}
// NOTE: モックアップ用のコード　ここまで

// ツールチップに表示するデータ（36ヶ月分のサンプル）
// NOTE: chart.js 自体のデータとは別
app.chartPrg.themeData = {
  "2022/1": {
    'plan'     : [{ url: 'plan-6', title: 'リスクマネジメント' }, { url: 'plan-78', title: 'マインドフルネス瞑想' }],
    'completed': [{ url: 'comp-6', title: '『幸福論』で学ぶ くじけない楽観主義' }, { url: 'comp-78', title: '『武士道』で学ぶ ぶれない生きざま' }],
  },
  "2022/2": {
    'plan'     : [{ url: 'plan-7', title: '管理者が読むべき“事業の基本”を知る３冊' }, { url: 'plan-89', title: '管理者が読むべき“組織の基本”を知る３冊' }],
    'completed': [{ url: 'comp-7', title: '管理者が読むべき“人間力の基本”を知る３冊' }, { url: 'comp-89', title: 'ノー残業マネジメント術' }],
  },
  "2022/3": {
    'plan'     : [{ url: 'plan-8', title: '管理者の役割 ３．管理者の７つの能力' }, { url: 'plan-910', title: '管理者の７つの能力 １．目標設定能力を強化する' }],
    'completed': [{ url: 'comp-8', title: '管理者の７つの能力 ２．計画能力を強化する' }, { url: 'comp-910', title: '管理者の７つの能力 ３．組織化能力を強化する' }],
  },
  "2022/4": {
    'plan'     : [{ url: 'plan-1', title: '１ｏｎ１ミーティング' }, { url: 'plan-23', title: 'ボス・マネジメント１' }],
    'completed': [{ url: 'comp-1', title: '管理者とは何か' }, { url: 'comp-23', title: 'ビジネスモデル' }],
  },
  "2022/5": {
    'plan'     : [{ url: 'plan-2', title: 'コーチング' }, { url: 'plan-34', title: 'コンフリクト・マネジメント１' }],
    'completed': [{ url: 'comp-2', title: 'コンフリクト・マネジメント２' }, { url: 'comp-34', title: 'コンフリクト・マネジメント３' }],
  },
  "2022/6": {
    'plan'     : [{ url: 'plan-3', title: 'プロジェクトマネジメントの鉄則３０' }, { url: 'plan-45', title: 'ラテラル・ロジカル・クリティカルシンキングの基本' }],
    'completed': [{ url: 'comp-3', title: 'ラテラル・ロジカル・クリティカルシンキングの実践' }, { url: 'comp-45', title: '周囲を動かす巻き込み力' }],
  },
  "2022/7": {
    'plan'     : [{ url: 'plan-4', title: 'アクティブ・リスニングの本質を学ぶ３' }, { url: 'plan-56', title: '労務管理' }],
    'completed': [{ url: 'comp-4', title: 'ビジネス計数' }, { url: 'comp-56', title: '人事考課' }],
  },
  "2022/8": {
    'plan'     : [{ url: 'plan-5', title: '目標管理の実践' }, { url: 'plan-67', title: 'パワーハラスメント対策' }],
    'completed': [{ url: 'comp-5', title: 'セクハラ・マタハラ対策' }, { url: 'comp-67', title: '人・職場づくり' }],
  },
  "2022/9": {
    'plan'     : [{ url: 'plan-6', title: 'ビジネスモデル' }, { url: 'plan-78', title: '１ｏｎ１ミーティング' }],
    'completed': [{ url: 'comp-6', title: '『ビジネスモデル' }],
  },
  "2022/10": {
    'plan'     : [{ url: 'plan-7', title: '管理者が読むべき“事業の基本”を知る３冊' }, { url: 'plan-89', title: '管理者が読むべき“組織の基本”を知る３冊' }],
    'completed': [{ url: 'comp-7', title: '管理者が読むべき“人間力の基本”を知る３冊' }, { url: 'comp-89', title: 'ノー残業マネジメント術' }],
  },
  "2022/11": {
    'plan'     : [{ url: 'plan-8', title: '管理者の役割 ３．管理者の７つの能力' }, { url: 'plan-910', title: '管理者の７つの能力 １．目標設定能力を強化する' }],
    'completed': [{ url: 'comp-8', title: '管理者の７つの能力 ２．計画能力を強化する' }, { url: 'comp-910', title: '管理者の７つの能力 ３．組織化能力を強化する' }],
  },
  "2022/12": {
    'plan'     : [{ url: 'plan-9', title: '管理者の７つの能力 ６．部下育成能力を強化する' }, { url: 'plan-1011', title: '管理者の７つの能力 ７．自己革新力を強化する' }],
    'completed': [{ url: 'comp-9', title: '人事評価 １．人事評価とは' }, { url: 'comp-1011', title: '人事評価 ２．人事評価の進め方' }],
  },
  "2023/1": {
    'plan'     : [{ url: 'plan-10', title: '目標管理 ２．目標設定' }, { url: 'plan-1112', title: '目標管理 ３．目標の連鎖と展開' }],
    'completed': [{ url: 'comp-10', title: '目標管理 ４．達成度評価' }, { url: 'comp-1112', title: '人事評価と目標管理の面談 １．面談の目的とポイント' }],
  },
  "2023/2": {
    'plan'     : [{ url: 'plan-11', title: '部下が育つ組織づくり １．部下との関係性の変化' }, { url: 'plan-1213', title: '部下が育つ組織づくり ２．心理的安全性の高い職場づくり' }],
    'completed': [{ url: 'comp-11', title: '部下が育つ組織づくり ３．日々の行動習慣①挨拶' }, { url: 'comp-1213', title: '部下が育つ組織づくり ４．日々の行動習慣②傾聴・問いかけ' }],
  },
  "2023/3": {
    'plan'     : [{ url: 'plan-12', title: '部下育成・支援のポイント ３．コーチングとは' }, { url: 'plan-1314', title: '部下育成・支援のポイント ４．コーチングのステップ' }],
    'completed': [{ url: 'comp-12', title: '部下育成・支援のポイント ５．１ｏｎ１による対話' }, { url: 'comp-1314', title: '部下育成・支援のポイント ６．部下のキャリア開発支援' }],
  },
  "2023/4": {
    'plan'     : [{ url: 'plan-13', title: 'チーム力を高めるテレワークマネジメント' }, { url: 'plan-1415', title: '１ｏｎ１ミーティング' }],
    'completed': [{ url: 'comp-13', title: 'ボス・マネジメント１' }, { url: 'comp-1415', title: '管理者とは何か' }],
  },
  "2023/5": {
    'plan'     : [{ url: 'plan-14', title: 'マーケティング基本' }, { url: 'plan-1516', title: 'コーチング' }],
    'completed': [{ url: 'comp-14', title: 'コンフリクト・マネジメント１' }, { url: 'comp-1516', title: 'コンフリクト・マネジメント２' }],
  },
  "2023/6": {
    'plan'     : [{ url: 'plan-15', title: 'リーダーシップ' }, { url: 'plan-1617', title: 'プロジェクトマネジメントの鉄則３０' }],
    'completed': [{ url: 'comp-15', title: 'ラテラル・ロジカル・クリティカルシンキングの基本' }, { url: 'comp-1617', title: 'ラテラル・ロジカル・クリティカルシンキングの実践' }],
  },
  "2023/7": {
    'plan'     : [{ url: 'plan-16', title: 'アクティブ・リスニングの本質を学ぶ２' }, { url: 'plan-1718', title: 'アクティブ・リスニングの本質を学ぶ３' }],
    'completed': [{ url: 'comp-16', title: '労務管理' }, { url: 'comp-1718', title: 'ビジネス計数' }],
  },
  "2023/8": {
    'plan'     : [{ url: 'plan-17', title: '目標管理の基本' }, { url: 'plan-1819', title: '目標管理の実践' }],
    'completed': [{ url: 'comp-17', title: 'パワーハラスメント対策' }, { url: 'comp-1819', title: 'セクハラ・マタハラ対策' }],
  },
  "2023/9": {
    'plan'     : [{ url: 'plan-18', title: 'コストマネジメント' }, { url: 'plan-1920', title: 'リスクマネジメント' }],
    'completed': [{ url: 'comp-18', title: 'マインドフルネス瞑想' }, { url: 'comp-1920', title: '『幸福論』で学ぶ くじけない楽観主義' }],
  },
  "2023/10": {
    'plan'     : [{ url: 'plan-7', title: '管理者が読むべき“事業の基本”を知る３冊' }, { url: 'plan-89', title: '管理者が読むべき“組織の基本”を知る３冊' }],
    'completed': [{ url: 'comp-7', title: '管理者が読むべき“人間力の基本”を知る３冊' }, { url: 'comp-89', title: 'ノー残業マネジメント術' }],
  },
  "2023/11": {
    'plan'     : [{ url: 'plan-8', title: '管理者の役割 ３．管理者の７つの能力' }, { url: 'plan-910', title: '管理者の７つの能力 １．目標設定能力を強化する' }],
    'completed': [{ url: 'comp-8', title: '管理者の７つの能力 ２．計画能力を強化する' }, { url: 'comp-910', title: '管理者の７つの能力 ３．組織化能力を強化する' }],
  },
  "2023/12": {
    'plan'     : [{ url: 'plan-9', title: '管理者の７つの能力 ６．部下育成能力を強化する' }, { url: 'plan-1011', title: '管理者の７つの能力 ７．自己革新力を強化する' }],
    'completed': [{ url: 'comp-9', title: '人事評価 １．人事評価とは' }, { url: 'comp-1011', title: '人事評価 ２．人事評価の進め方' }],
  },
  "2024/1": {
    'plan'     : [{ url: 'plan-10', title: '目標管理 ２．目標設定' }, { url: 'plan-1112', title: '目標管理 ３．目標の連鎖と展開' }],
    'completed': [{ url: 'comp-10', title: '目標管理 ４．達成度評価' }, { url: 'comp-1112', title: '人事評価と目標管理の面談 １．面談の目的とポイント' }],
  },
  "2024/2": {
    'plan'     : [{ url: 'plan-11', title: '部下が育つ組織づくり １．部下との関係性の変化' }, { url: 'plan-1213', title: '部下が育つ組織づくり ２．心理的安全性の高い職場づくり' }],
    'completed': [{ url: 'comp-11', title: '部下が育つ組織づくり ３．日々の行動習慣①挨拶' }, { url: 'comp-1213', title: '部下が育つ組織づくり ４．日々の行動習慣②傾聴・問いかけ' }],
  },
  "2024/3": {
    'plan'     : [{ url: 'plan-12', title: '部下育成・支援のポイント ３．コーチングとは' }, { url: 'plan-1314', title: '部下育成・支援のポイント ４．コーチングのステップ' }],
    'completed': [{ url: 'comp-12', title: '部下育成・支援のポイント ５．１ｏｎ１による対話' }, { url: 'comp-1314', title: '部下育成・支援のポイント ６．部下のキャリア開発支援' }],
  },
  "2024/4": {
    'plan'     : [{ url: 'plan-1', title: '１ｏｎ１ミーティング' }, { url: 'plan-23', title: 'ボス・マネジメント１' }],
    'completed': [{ url: 'comp-1', title: '管理者とは何か' }, { url: 'comp-23', title: 'ビジネスモデル' }],
  },
  "2024/5": {
    'plan'     : [{ url: 'plan-2', title: 'コーチング' }, { url: 'plan-34', title: 'コンフリクト・マネジメント１' }],
    'completed': [{ url: 'comp-2', title: 'コンフリクト・マネジメント２' }, { url: 'comp-34', title: 'コンフリクト・マネジメント３' }],
  },
  "2024/6": {
    'plan'     : [{ url: 'plan-3', title: 'プロジェクトマネジメントの鉄則３０' }, { url: 'plan-45', title: 'ラテラル・ロジカル・クリティカルシンキングの基本' }],
    'completed': [{ url: 'comp-3', title: 'ラテラル・ロジカル・クリティカルシンキングの実践' }, { url: 'comp-45', title: '周囲を動かす巻き込み力' }],
  },
  "2024/7": {
    'plan'     : [{ url: 'plan-4', title: 'アクティブ・リスニングの本質を学ぶ３' }, { url: 'plan-56', title: '労務管理' }],
    'completed': [{ url: 'comp-4', title: 'ビジネス計数' }, { url: 'comp-56', title: '人事考課' }],
  },
  "2024/8": {
    'plan'     : [{ url: 'plan-5', title: '目標管理の実践' }, { url: 'plan-67', title: 'パワーハラスメント対策' }],
    'completed': [{ url: 'comp-5', title: 'セクハラ・マタハラ対策' }, { url: 'comp-67', title: '人・職場づくり' }],
  },
  "2024/9": {
    'plan'     : [{ url: 'plan-6', title: 'リスクマネジメント' }, { url: 'plan-78', title: 'マインドフルネス瞑想' }],
    'completed': [{ url: 'comp-6', title: '『幸福論』で学ぶ くじけない楽観主義' }, { url: 'comp-78', title: '『武士道』で学ぶ ぶれない生きざま' }],
  },
  "2024/10": {
    'plan'     : [{ url: 'plan-7', title: '管理者が読むべき“事業の基本”を知る３冊' }, { url: 'plan-89', title: '管理者が読むべき“組織の基本”を知る３冊' }],
    'completed': [{ url: 'comp-7', title: '管理者が読むべき“人間力の基本”を知る３冊' }, { url: 'comp-89', title: 'ノー残業マネジメント術' }],
  },
  "2024/11": {
    'plan'     : [{ url: 'plan-8', title: '管理者の役割 ３．管理者の７つの能力' }, { url: 'plan-910', title: '管理者の７つの能力 １．目標設定能力を強化する' }],
    'completed': [{ url: 'comp-8', title: '管理者の７つの能力 ２．計画能力を強化する' }, { url: 'comp-910', title: '管理者の７つの能力 ３．組織化能力を強化する' }],
  },
  "2024/12": {
    'plan'     : [{ url: 'plan-9', title: '管理者の７つの能力 ６．部下育成能力を強化する' }, { url: 'plan-1011', title: '管理者の７つの能力 ７．自己革新力を強化する' }],
    'completed': [{ url: 'comp-9', title: '人事評価 １．人事評価とは' }, { url: 'comp-1011', title: '人事評価 ２．人事評価の進め方' }],
  },
  "2025/1": {
    'plan'     : [{ url: 'plan-10', title: '目標管理 ２．目標設定' }, { url: 'plan-1112', title: '目標管理 ３．目標の連鎖と展開' }],
    'completed': [{ url: 'comp-10', title: '目標管理 ４．達成度評価' }, { url: 'comp-1112', title: '人事評価と目標管理の面談 １．面談の目的とポイント' }],
  },
  "2025/2": {
    'plan'     : [{ url: 'plan-11', title: '部下が育つ組織づくり １．部下との関係性の変化' }, { url: 'plan-1213', title: '部下が育つ組織づくり ２．心理的安全性の高い職場づくり' }],
    'completed': [{ url: 'comp-11', title: '部下が育つ組織づくり ３．日々の行動習慣①挨拶' }, { url: 'comp-1213', title: '部下が育つ組織づくり ４．日々の行動習慣②傾聴・問いかけ' }],
  },
  "2025/3": {
    'plan'     : [{ url: 'plan-12', title: '部下育成・支援のポイント ３．コーチングとは' }, { url: 'plan-1314', title: '部下育成・支援のポイント ４．コーチングのステップ' }],
    'completed': [{ url: 'comp-12', title: '部下育成・支援のポイント ５．１ｏｎ１による対話' }, { url: 'comp-1314', title: '部下育成・支援のポイント ６．部下のキャリア開発支援' }],
  },
  "2025/4": {
    'plan'     : [{ url: 'plan-1', title: '１ｏｎ１ミーティング' }, { url: 'plan-23', title: 'ボス・マネジメント１' }],
    'completed': [{ url: 'comp-1', title: '管理者とは何か' }, { url: 'comp-23', title: 'ビジネスモデル' }],
  },
  "2025/5": {
    'plan'     : [{ url: 'plan-2', title: 'コーチング' }, { url: 'plan-34', title: 'コンフリクト・マネジメント１' }],
    'completed': [{ url: 'comp-2', title: 'コンフリクト・マネジメント２' }, { url: 'comp-34', title: 'コンフリクト・マネジメント３' }],
  },
  "2025/6": {
    'plan'     : [{ url: 'plan-3', title: 'プロジェクトマネジメントの鉄則３０' }, { url: 'plan-45', title: 'ラテラル・ロジカル・クリティカルシンキングの基本' }],
    'completed': [{ url: 'comp-3', title: 'ラテラル・ロジカル・クリティカルシンキングの実践' }, { url: 'comp-45', title: '周囲を動かす巻き込み力' }],
  },
  "2025/7": {
    'plan'     : [{ url: 'plan-4', title: 'アクティブ・リスニングの本質を学ぶ３' }, { url: 'plan-56', title: '労務管理' }],
    'completed': [{ url: 'comp-4', title: 'ビジネス計数' }, { url: 'comp-56', title: '人事考課' }],
  },
  "2025/8": {
    'plan'     : [{ url: 'plan-5', title: '目標管理の実践' }, { url: 'plan-67', title: 'パワーハラスメント対策' }],
    'completed': [{ url: 'comp-5', title: 'セクハラ・マタハラ対策' }, { url: 'comp-67', title: '人・職場づくり' }],
  },
  "2025/9": {
    'plan'     : [{ url: 'plan-6', title: 'リスクマネジメント' }, { url: 'plan-78', title: 'マインドフルネス瞑想' }],
    'completed': [{ url: 'comp-6', title: '『幸福論』で学ぶ くじけない楽観主義' }, { url: 'comp-78', title: '『武士道』で学ぶ ぶれない生きざま' }],
  },
  "2025/10": {
    'plan'     : [{ url: 'plan-7', title: '管理者が読むべき“事業の基本”を知る３冊' }, { url: 'plan-89', title: '管理者が読むべき“組織の基本”を知る３冊' }],
    'completed': [{ url: 'comp-7', title: '管理者が読むべき“人間力の基本”を知る３冊' }, { url: 'comp-89', title: 'ノー残業マネジメント術' }],
  },
  "2025/11": {
    'plan'     : [{ url: 'plan-8', title: '管理者の役割 ３．管理者の７つの能力' }, { url: 'plan-910', title: '管理者の７つの能力 １．目標設定能力を強化する' }],
    'completed': [{ url: 'comp-8', title: '管理者の７つの能力 ２．計画能力を強化する' }, { url: 'comp-910', title: '管理者の７つの能力 ３．組織化能力を強化する' }],
  },
  "2025/12": {
    'plan'     : [{ url: 'plan-9', title: '管理者の７つの能力 ６．部下育成能力を強化する' }, { url: 'plan-1011', title: '管理者の７つの能力 ７．自己革新力を強化する' }],
    'completed': [{ url: 'comp-9', title: '人事評価 １．人事評価とは' }, { url: 'comp-1011', title: '人事評価 ２．人事評価の進め方' }],
  },
  "2025/1": {
    'plan'     : [{ url: 'plan-10', title: '目標管理 ２．目標設定' }, { url: 'plan-1112', title: '目標管理 ３．目標の連鎖と展開' }],
    'completed': [{ url: 'comp-10', title: '目標管理 ４．達成度評価' }, { url: 'comp-1112', title: '人事評価と目標管理の面談 １．面談の目的とポイント' }],
  },
  "2026/2": {
    'plan'     : [{ url: 'plan-11', title: '部下が育つ組織づくり １．部下との関係性の変化' }, { url: 'plan-1213', title: '部下が育つ組織づくり ２．心理的安全性の高い職場づくり' }],
    'completed': [{ url: 'comp-11', title: '部下が育つ組織づくり ３．日々の行動習慣①挨拶' }, { url: 'comp-1213', title: '部下が育つ組織づくり ４．日々の行動習慣②傾聴・問いかけ' }],
  },
  "2026/3": {
    'plan'     : [{ url: 'plan-12', title: '部下育成・支援のポイント ３．コーチングとは' }, { url: 'plan-1314', title: '部下育成・支援のポイント ４．コーチングのステップ' }],
    'completed': [{ url: 'comp-12', title: '部下育成・支援のポイント ５．１ｏｎ１による対話' }, { url: 'comp-1314', title: '部下育成・支援のポイント ６．部下のキャリア開発支援' }],
  },
  "2026/4": {
    'plan'     : [{ url: 'plan-1', title: '１ｏｎ１ミーティング' }, { url: 'plan-23', title: 'ボス・マネジメント１' }],
    'completed': [{ url: 'comp-1', title: '管理者とは何か' }, { url: 'comp-23', title: 'ビジネスモデル' }],
  },
  "2026/5": {
    'plan'     : [{ url: 'plan-2', title: 'コーチング' }, { url: 'plan-34', title: 'コンフリクト・マネジメント１' }],
    'completed': [{ url: 'comp-2', title: 'コンフリクト・マネジメント２' }, { url: 'comp-34', title: 'コンフリクト・マネジメント３' }],
  },
  "2026/6": {
    'plan'     : [{ url: 'plan-3', title: 'プロジェクトマネジメントの鉄則３０' }, { url: 'plan-45', title: 'ラテラル・ロジカル・クリティカルシンキングの基本' }],
    'completed': [{ url: 'comp-3', title: 'ラテラル・ロジカル・クリティカルシンキングの実践' }, { url: 'comp-45', title: '周囲を動かす巻き込み力' }],
  },
  "2026/7": {
    'plan'     : [{ url: 'plan-4', title: 'アクティブ・リスニングの本質を学ぶ３' }, { url: 'plan-56', title: '労務管理' }],
    'completed': [{ url: 'comp-4', title: 'ビジネス計数' }, { url: 'comp-56', title: '人事考課' }],
  },
  "2026/8": {
    'plan'     : [{ url: 'plan-5', title: '目標管理の実践' }, { url: 'plan-67', title: 'パワーハラスメント対策' }],
    'completed': [{ url: 'comp-5', title: 'セクハラ・マタハラ対策' }, { url: 'comp-67', title: '人・職場づくり' }],
  },
  "2026/9": {
    'plan'     : [{ url: 'plan-6', title: 'リスクマネジメント' }, { url: 'plan-78', title: 'マインドフルネス瞑想' }],
    'completed': [{ url: 'comp-6', title: '『幸福論』で学ぶ くじけない楽観主義' }, { url: 'comp-78', title: '『武士道』で学ぶ ぶれない生きざま' }],
  },
  "2026/10": {
    'plan'     : [{ url: 'plan-7', title: '管理者が読むべき“事業の基本”を知る３冊' }, { url: 'plan-89', title: '管理者が読むべき“組織の基本”を知る３冊' }],
    'completed': [{ url: 'comp-7', title: '管理者が読むべき“人間力の基本”を知る３冊' }, { url: 'comp-89', title: 'ノー残業マネジメント術' }],
  },
  "2026/11": {
    'plan'     : [{ url: 'plan-8', title: '管理者の役割 ３．管理者の７つの能力' }, { url: 'plan-910', title: '管理者の７つの能力 １．目標設定能力を強化する' }],
    'completed': [{ url: 'comp-8', title: '管理者の７つの能力 ２．計画能力を強化する' }, { url: 'comp-910', title: '管理者の７つの能力 ３．組織化能力を強化する' }],
  },
  "2026/12": {
    'plan'     : [{ url: 'plan-9', title: '管理者の７つの能力 ６．部下育成能力を強化する' }, { url: 'plan-1011', title: '管理者の７つの能力 ７．自己革新力を強化する' }],
    'completed': [{ url: 'comp-9', title: '人事評価 １．人事評価とは' }, { url: 'comp-1011', title: '人事評価 ２．人事評価の進め方' }],
  },
};

// グラフを生成
app.chartPrg.generate = function(elm) {
  if ($(elm).length === 0) return false;

  // 幅設定：何ヶ月分のデータかに応じて canvas 幅を設定（はみ出す場合は横スクロール）
  if ($('.p-chart-progress__inner').length === 0) {
    $(elm).wrap('<div class="p-chart-progress__inner">');
  }
  const canvasWidth = this.getCanvasWidth(this.data.label.length);
  $('.p-chart-progress__inner').width(canvasWidth);

  // canvas のコンテキスト
  this.elm = $(elm).get(0);
  this.ctx = this.elm.getContext('2d');

  // chart.js オブジェクト
  this.chartjs = new Chart(this.ctx, {
    type: "bar",
    data: {
      labels: this.data.label,
      datasets: [
        {
          label: "計画",
          type: "line",
          fill: false,
          data: this.data.plan,
          borderColor: "#80C35D",
          backgroundColor: "transparent",
          pointRadius: 6,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          pointHoverBorderColor: '#D8B844',
          pointHoverBackgroundColor: '#D8B844',
          pointHoverBorderWidth: 2,
          pointHitRadius: 30,
        },
        {
          label: "合格",
          data: this.data.completed,
          backgroundColor: "#019CE1",
          hoverBackgroundColor: "#D8B844",
          barPercentage: .7,
          maxBarThickness: 15,
        },
      ]
    },
    options: {
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    }
  });

  this.displayLegend();
};

// 凡例を独自で配置する（横スクロール発生しても位置固定するため）
app.chartPrg.displayLegend = function() {
  if ($('.p-chart-progress__legend').length > 0) return false;
  const legendWrapper = $('<ul class="p-chart-progress__legend">');
  const legendLabel = [ '計画', '合格' ];

  for (let i = 0; i < legendLabel.length; i++) {
    const legendStr = legendLabel[i];
    const legend = $('<li>');
    legend.addClass('is-' + i).text(legendStr).appendTo(legendWrapper);
  }

  // ラッパー要素の「前」に追加
  const canvasWrapper = $(this.elm).parent().parent();
  canvasWrapper.before(legendWrapper);
};

// 渡されたクリックポイント（chart.js の要素オブジェクト）から、ツールチップを表示する
app.chartPrg.showTooltip = function(point) {
  // クリックポイントのアイテムの情報を取得
  const month = this.chartjs.data.labels[point.index];

  // ツールチップオブジェクトを取得
  let themeTip = this.getTooltip();

  // 同じツールチップを表示中なら消す
  if ((parseInt(themeTip.dataset.index) === point.index) &&
      (parseInt(themeTip.dataset.datasetIndex) === point.datasetIndex) &&
      (themeTip.style.display === 'block')) {
    this.hideTooltip();
    return false;
  }

  // ツールチップオブジェクトの中身を作成
  themeTip.dataset.index = point.index;
  themeTip.dataset.datasetIndex = point.datasetIndex;
  themeTip.innerHTML = this.getTooltipContent(month);

  // ツールチップの最適な表示場所を設定して表示
  this.adjustTooltipPosition(point);
};

// ツールチップを隠す
app.chartPrg.hideTooltip = function() {
  let themeTip = this.getTooltip();
  themeTip.style.display = 'none';
  themeTip.style.opacity = 0;
  themeTip.classList.remove('is-left');
  themeTip.classList.remove('is-offset-arrow');
};

// 渡されたクリックポイント（chart.js の要素オブジェクト）から、ツールチップの最適な表示場所を設定する
app.chartPrg.adjustTooltipPosition = function(point) {
  let themeTip = this.getTooltip();

  // スマホ、タブレットでは位置固定で表示
  if (app.getDeviceType() === 'sp' || app.getDeviceType() === 'tabS') {
    themeTip.style.position = 'fixed';
    themeTip.style.display = 'block';
    themeTip.style.opacity = 1;
    themeTip.style.left = '5%';
    themeTip.style.top = '2rem';
    return false;
  }

  // ポジション設定のために透明で表示
  themeTip.style.position = 'absolute';
  themeTip.style.display = 'block';
  themeTip.style.opacity = 0;
  themeTip.classList.remove('is-left');
  themeTip.classList.remove('is-offset-arrow');

  // まずは標準の位置
  const canvasBound = this.ctx.canvas.getBoundingClientRect();
  let left = window.pageXOffset + canvasBound.left + point.element.x + 30;
  let top = window.pageYOffset + canvasBound.top + point.element.y;
  themeTip.style.left = left + 'px';
  themeTip.style.top = top + 'px';
  const tipBound = themeTip.getBoundingClientRect();

  // 右端がウィンドウの右端以上なら左側にする
  if (this.tooltipIsOutsideOfTheRightEdge()) {
    left -= (tipBound.width + 60);
    themeTip.classList.add('is-left');
  }

  // 下端がキャンバスの下端以上なら上にずらす（矢印も）
  const offset = this.tooltipOutsidePxOfTheBottomEdge();
  top -= offset;
  themeTip.querySelector('.p-chart-progress__theme-tip__arrow').style.top = offset + 'px';
  if (offset > 0) {
    themeTip.classList.add('is-offset-arrow');
    themeTip.querySelector('.p-chart-progress__theme-tip__arrow').style.top = (offset + 10) + 'px';
  }

  // 調整後の left, top を設定し opacity を 1 にして表示
  themeTip.style.left = left + 'px';
  themeTip.style.top = top + 'px';
  themeTip.style.opacity = 1;
};

// ツールチップがウィンドウ右端からはみ出していたら true を返す（Boolean）
app.chartPrg.tooltipIsOutsideOfTheRightEdge = function() {
  let themeTip = this.getTooltip();

  // 右端がウィンドウの右端以上かどうか？
  const tipBound = themeTip.getBoundingClientRect();
  const winW = document.documentElement.clientWidth; // スクロールバーを除いた幅
  return (tipBound.right - winW > 0) ? true : false;
};

// ツールチップがウィンドウ下端からのはみ出し量を返す（Number）※Booleanではない
app.chartPrg.tooltipOutsidePxOfTheBottomEdge = function() {
  let themeTip = this.getTooltip();

  // 下端がウィンドウの下端以上かどうか？
  const tipBound = themeTip.getBoundingClientRect();
  const winH = document.documentElement.clientHeight; // スクロールバーを除いた幅
  return (tipBound.bottom - winH > 0) ? tipBound.bottom - winH : 0;
};

// ツールチップのDOMを返す
app.chartPrg.getTooltip = function() {
  // ツールチップオブジェクトを取得
  let themeTip = document.getElementById('chartjs-theme-tip');

  // なければツールチップを作る
  if (!themeTip) {
    themeTip = document.createElement('div');
    themeTip.id = 'chartjs-theme-tip';
    themeTip.className = 'p-chart-progress__theme-tip';
    themeTip.style.position = 'absolute';
    document.body.appendChild(themeTip);
  }

  return themeTip;
}

// 渡された年月（String）からツールチップに表示するHTML（String）を返す
app.chartPrg.getTooltipContent = function(month) {
  let html = '';

  // 矢印（::before/after だと js で位置調整できないので）
  html += '<span class="p-chart-progress__theme-tip__arrow"></span>';

  // インナーラッパー（スクロールさせるのはここ）
  html += '<div class="p-chart-progress__theme-tip__inner">';

  const data = this.themeData[month];

  // 年月タイトル
  html += '<header>' + month + '</header>';

  // 計画
  html += '<dl class="is-plan"><dt>学習予定のテーマ</dt><dd><ul class="u-ls-normal">';
  data['plan'].forEach(function(theme) {
    html += '<li><a href="' + theme.url + '">' + theme.title + '</a></li>';
  });
  html += '</ul></dd></dl>';

  // 合格
  html += '<dl class="is-completed"><dt>合格したテーマ</dt><dd><ul class="u-ls-normal">';
  data['completed'].forEach(function(theme) {
    html += '<li><a href="' + theme.url + '">' + theme.title + '</a></li>';
  });
  html += '</ul></dd></dl></div>';

  return html;
};

window.onload = function() {
  const _this = app.chartPrg;

  // イベントハンドラ：クリックでツールチップを表示＆隠す
  if (typeof _this.elm === 'undefined') return false;

  _this.elm.addEventListener('click', function(evt) {
    // クリック位置のアイテム情報を取得（chart.js の要素オブジェクト）
    var points = _this.chartjs.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

    // 何もないところのクリックなら、ツールチップを消す
    if (points.length === 0) {
      _this.getTooltip().style.opacity = 0;
      _this.getTooltip().style.display = 'none';
      return false;
    }

    // 渡されたクリックポイントから、ツールチップを表示する
    _this.showTooltip(points[0]);
  });
};

// 領域外クリックでツールチップを隠す
$(function() {
  $(app.chartPrg.elm).on('click', function(e) {
    e.stopPropagation;
    return false;
  });

  $('body').on('click', function(e) {
    app.chartPrg.hideTooltip();
  });
});

// データ量（nヶ月）に応じた canvas 幅を取得し .p-chart-progress に設定
app.chartPrg.getCanvasWidth = function(month) {
  let w = 0;

  if (month <= 18) {
    w = 0; // 18ヶ月以下の場合は 100% にしたいので
  } else if (month <= 24) {
    w = 350;
  } else if (month <= 36) {
    w = 570;
  } else {
    w = (300 + (month - 20) * 18);
  }

  if (w < $('.p-chart-progress').width()) {
    w = '100%';
  } else {
    w = (w / 10) + 'rem';
  }

  return w;
};

// リサイズで再描画（注意：幅のりサイズ時のみ　※スマホは縦スクロールでも上下UI要素のサイズ変更等でリサイズイベントが発生してしまうため幅変更のみを検知する resizeW を定義している）
$(function() {
  app.chartPrg.timerId;

  $(window).on('resizeW', function() {
    // チャートがなければなにもしない
    if ($('#chart-progress').length === 0) return false;

    // タイマー動作中ならなにもしない（連続描画回避）
    if (typeof app.chartPrg.timerId !== 'undefined') {
      return false;
    }

    app.chartPrg.timerId = setTimeout(function() {
      if (app.chartPrg.chartjs) {
        app.chartPrg.chartjs.destroy();
      }
      app.chartPrg.generate('#chart-progress');
      app.chartPrg.timerId = undefined;
    }, 2000);
  });
});

/* --------------------------------------------------------------------------------
   学習実績一覧
   -------------------------------------------------------------------------------- */

// datatables プラグインを適用
$(function() {
  app.ptbl = $('.p-progress-table').DataTable({
    'paging': false,
    'searching': false,
    'info': false,
    'responsive': true,
    columnDefs: [
      { "orderable": false, "targets": 0 }
    ],
    order: [[1, 'asc']],
  });
});

app.filterTblArray = [];

// 絞り込み
app.filterTbl = function() {
  app.filterTblArray = []; // とりあえずリセット

  // チェックボックスの状態を取得しフィルタすべき項目を配列に入れる
  $('.p-datatables-filter').find('input:checkbox').each(function() {
    if ($(this).is(':checked') === true) {
      if ($(this).val() === '学習中') {
        app.filterTblArray.push('学習中', '添削中', '再レポート');
      } else {
        app.filterTblArray.push($(this).val());
      }
    }
  });

  // とりあえず全部非表示
  $('.p-progress-table tbody tr').hide();

  // フィルタする行のみ表示
  if (app.filterTblArray.length === 0) {
    $('.p-progress-table').find('tbody tr').show();
  } else {
    for (let i = 0; i < app.filterTblArray.length; i++) {
      const str = app.filterTblArray[i];

      $('.p-progress-table').find('tbody tr').each(function() {
        let td = $(this).find('.p-progress-table__status');
        if (td.text().indexOf(str) >= 0) {
          td.closest('tr').show();
        }
      });
    }
  }
};

// 並べ替え
$(function () {
  $('select[name="progress-table-sort"]').on('change', function() {
    const sortKey = $(this).val();
    app.ptbl.order([[ sortKey, 'asc' ]]).draw();
  });
});

// スマホ：標準表示、詳細表示の切替
$(function () {
  $('input:radio[name="progress-table-toggle"]').on('change', function() {
    if (app.getDeviceType() !== 'sp' || $(this).val() === '詳細') {
      $('.p-progress-table tr > *').show();
    } else {
      $('.p-progress-table tr :nth-child(7)').hide();
      $('.p-progress-table tr :nth-child(8)').hide();
      $('.p-progress-table tr :nth-child(9)').hide();
      $('.p-progress-table tr :nth-child(10)').hide();
    }
  });

  // 初期値は「標準」
  $('input:radio[name="progress-table-toggle"]').eq(0).prop('checked', true).trigger('change');
});

// PCレイアウトに切り替わるときは「詳細」表示にしておく
$(function () {
  $(window).on('resize', function() {
    if (app.getDeviceType() !== app.currentDeviceType) {
      if (app.getDeviceType() !== 'sp') {
        $('input:radio[name="progress-table-toggle"]').eq(1).prop('checked', true).trigger('change');
      }
    }
    app.currentDeviceType = app.getDeviceType();
  });
});

/* --------------------------------------------------------------------------------
   スマホ / テーマ一覧から追加モーダル / 「テーマ絞り込み」表示切り替え
   -------------------------------------------------------------------------------- */

$(function() {
  $(document).on('click', '.p-theme-filter > h2', function () {
    const modal = $(this).closest('.p-list-add');
    const filter = modal.find('.p-theme-filter');
    const curHeight = filter.height();
    const autoHeight = filter.css('height', 'auto').height();

    modal.toggleClass('is-open-filter');
    if (modal.hasClass('is-open-filter') === true) {
      filter.height(curHeight).animate({height: autoHeight}, 200);
    } else {
      filter.animate({height: 40}, 200);
    }
  });

  // PCに切り替わったらリセット
  $(window).on('resize', function() {
    $('.p-list-add').removeClass('is-open-filter');

    if (app.getDeviceType() === 'pc') {
      $('.p-theme-filter').css('height', 'auto');
    } else {
      $('.p-theme-filter').css('height', 40);
    }
  });
});

/* --------------------------------------------------------------------------------
   スマホ / テーマ一覧から追加モーダル / 「選択中」表示切り替え
   -------------------------------------------------------------------------------- */

$(function () {
  $('.p-selected-theme > h2').on('click', function(e) {
    $(this).closest('.p-list-add').toggleClass('is-open-selected');
    e.stopPropagation();
    return false;
  });

  $('.p-list-add .l-modal__container').on('click', function(e) {
    if ($('.p-list-add ').hasClass('is-open-selected') === true) {
      $(this).closest('.p-list-add').removeClass('is-open-selected');
      e.stopPropagation();
      return false;
    }
  });

  $('.p-selected-theme').on('click', function(e) {
    e.stopPropagation();
    return false;
  });
});

/* --------------------------------------------------------------------------------
   スマホ / 学習計画リストの年月タップ
   -------------------------------------------------------------------------------- */

app.spStudyPlan = {};

$(function () {
  // 年月タップで表示
  $('.p-plan-list.is-monthly .p-plan-list__section > h4').on('click', function () {
    // スマホのみ
    if (app.getDeviceType() !== 'sp') return false;

    $(this).toggleClass('is-open');
    $(this).closest('.p-plan-list__section').toggleClass('is-open');
    const _this = this;
    $(this).siblings('.p-theme-card-list').slideToggle(300, function() {
      // 当該年月までスクロール
      const top = $(_this).closest('.p-plan-list__section').offset().top - 10;
      $('html, body').animate({ scrollTop: top }, 500);
    });
  });

  // 初期設定（学習計画ページのみ）
  if ($('body').hasClass('page-study-plan') === true) {
    app.spStudyPlan.changeView();

    // 初期状態では当月分を開く
    if (app.getDeviceType() === 'sp') {
      const today = new Date();
      const ym = today.getFullYear() + '/' + (today.getMonth() + 1);
      const target = $('.p-plan-list.is-monthly .p-plan-list__section[data-month="' + ym + '"]');
      target.addClass('is-open');
      target.find('> h4').addClass('is-open');
      target.find('.p-theme-card-list').show();
    }
  }

  // レイアウト切替
  $(window).on('resize', function() {
    app.spStudyPlan.changeView();
  });
});

// 現在スマホレイアウトか否かを保持
app.spStudyPlan.isSpLayout = false;

// レイアウト切替
app.spStudyPlan.changeView = function() {
  if (app.getDeviceType() === 'sp') {
    if (app.spStudyPlan.isSpLayout === true) return false;
    app.spStudyPlan.isSpLayout = true;
    $('.p-plan-list.is-monthly .p-plan-list__section > h4').removeClass('is-open');
    $('.p-plan-list.is-monthly .p-plan-list__section').removeClass('is-open');
    $('.p-plan-list.is-monthly .p-plan-list__section .p-theme-card-list').hide();
  } else {
    if (app.spStudyPlan.isSpLayout === false) return false;
    app.spStudyPlan.isSpLayout = false;
    $('.p-plan-list.is-monthly .p-plan-list__section > h4').removeClass('is-open');
    $('.p-plan-list.is-monthly .p-plan-list__section').removeClass('is-open');
    $('.p-plan-list.is-monthly .p-plan-list__section .p-theme-card-list').show();
  }
};

/* --------------------------------------------------------------------------------
   スマホ / スマホ用のドラッグハンドルを追加
   -------------------------------------------------------------------------------- */

$(function () {
  // ドラッグハンドルを使用しない端末ではCSSで非表示にするので一律追加してしまう
  $('.p-plan-list__section:not(.is-past) .p-theme-card').each(function() {
    const html = '<div class="p-theme-card__handle"><i class="fas fa-grip-lines"></i></div>';
    $(this).append(html).addClass('is-handle');
  });
});

/* --------------------------------------------------------------------------------
   学習計画リストのドラッグ制御
   -------------------------------------------------------------------------------- */

$(function () {
  app.spThemeDragInit();

  $(window).on('resizeW', function() {
    app.spThemeDragInit();
  });
});

// ドラッグ操作の切替
app.spThemeDragInit = function() {
  // 「spの場合」 or 「タッチデバイスかつiOS以外」
  // NOTE: iOS以外のタッチデバイスではドラッグハンドルがないとドラッグ操作とタップ操作の両立ができないためドラッグハンドルでのドラッグとする
  if (this.getDeviceType() === 'sp' || (this.isTouchDevice() && !this.isIOS())) {
    this.spThemeDragEnable();
  } else {
    this.spThemeDragDisable();
  }
}

// ドラッグハンドルでのみドラッグ可能にする
app.spThemeDragEnable = function() {
  $('body').addClass('is-enable-theme-drag-handle');
  $('.p-plan-list__section:not(.is-past) .p-theme-card-list > li:not(.is-filler)').draggable({
    handle: '.p-theme-card__handle',
  });
};

// その解除
app.spThemeDragDisable = function() {
  $('body').removeClass('is-enable-theme-drag-handle');
  $('.p-plan-list__section:not(.is-past) .p-theme-card-list > li:not(.is-filler)').draggable({
    handle: null,
  });
};

/* --------------------------------------------------------------------------------
   スマホ / 学習計画リスト / フローティングボタンを追加
   -------------------------------------------------------------------------------- */

$(function () {
  if ($('body').hasClass('page-study-plan') === true) {
    const btn1 = $('<button type="button" class="p-plan-list__sp-add-btn">');
    btn1.text('学習テーマを追加').appendTo('body');
    const btn2 = $('<button type="button" class="p-plan-list__sp-toggle-btn">');
    btn2.text('月をすべて開く/閉じる').appendTo('body');
  }

  $(window).on('scroll', function () {
    if ($('body').hasClass('page-study-plan') !== true) return false;

    const sc = $(this).scrollTop();
    const planTop = $('#plan').offset().top - $(window).height() / 2; // 学習計画がウィンドウの半分まで来たら

    if (sc >= planTop) {
      $('.p-plan-list__sp-add-btn, .p-plan-list__sp-toggle-btn').addClass('is-active');
    } else {
      $('.p-plan-list__sp-add-btn, .p-plan-list__sp-toggle-btn').removeClass('is-active');
    }
  });
});

/* --------------------------------------------------------------------------------
   スマホ / 学習計画リスト / 月をすべて閉じる、開くボタン
   -------------------------------------------------------------------------------- */

$(function () {
  $('.p-plan-list__sp-toggle-btn').on('click', function() {
    if ($('.p-plan-list__section').hasClass('is-open') === true) {
      $('.p-plan-list.is-monthly .p-plan-list__section').removeClass('is-open');
      $('.p-plan-list.is-monthly .p-plan-list__section > h4').removeClass('is-open');
      $('.p-plan-list.is-monthly .p-plan-list__section .p-theme-card-list').hide();
    } else {
      $('.p-plan-list.is-monthly .p-plan-list__section').addClass('is-open');
      $('.p-plan-list.is-monthly .p-plan-list__section > h4').addClass('is-open');
      $('.p-plan-list.is-monthly .p-plan-list__section .p-theme-card-list').show();
    }
  });
});

/* --------------------------------------------------------------------------------
   学習計画リスト / 過去月を表示
   -------------------------------------------------------------------------------- */

$(function () {
  $('.p-plan-list__show-past-months input:checkbox').on('change', function() {
    if ($(this).prop('checked') === true) {
      $('.p-plan-list__section.is-past').css('display', 'flex');
    } else {
      $('.p-plan-list__section.is-past').hide();
    }
  });
});

/* --------------------------------------------------------------------------------
   共通 / ウィンドウの横幅のりサイズだけを検出
   -------------------------------------------------------------------------------- */

$(function () {
  app.lastWindowWidth = $(window).width();

  $(window).on('resize', function() {
    if (app.lastWindowWidth !== $(window).width()) {
      app.lastWindowWidth = $(window).width();
      $(window).trigger('resizeW');
    }
  });
});

/* --------------------------------------------------------------------------------
   共通 / タッチデバイスなら true を返す
   -------------------------------------------------------------------------------- */

app.isTouchDevice = function() {
  const touchEvent = window.ontouchstart;
  const touchPoints = navigator.maxTouchPoints;

  if (touchEvent !== 'undefined' && touchPoints > 0) {
    return true;
  } else {
    return false;
  }
};

/* --------------------------------------------------------------------------------
   共通 / iOSなら true を返す
   -------------------------------------------------------------------------------- */

app.isIOS = function() {
  const ua = navigator.userAgent;
  return ua.indexOf('iPhone') >= 0
      || ua.indexOf('iPad') >= 0
      || ua.indexOf('iPod') >= 0;
};
