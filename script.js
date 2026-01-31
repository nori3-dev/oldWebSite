// 古き良き2000年代サイトのインタラクション

document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時のエフェクト
    console.log('%c★ ようこそ、虚空の回廊へ ★', 'color: #FF1493; font-size: 16px; font-weight: bold;');
    
    // カウンター表示の更新
    updateVisitorCounter();
    
    // リンククリック時のエフェクト
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // フラッシュエフェクト
                    targetElement.style.animation = 'flash 0.5s';
                    setTimeout(() => {
                        targetElement.style.animation = '';
                    }, 500);
                }
            }
        });
    });

    // マウスオーバーエフェクト
    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ランキングバーのアニメーション
    const rankingBars = document.querySelectorAll('.ranking-fill');
    rankingBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 100);
    });

    // ランダムな背景色パターン
    const bgPatterns = [
        'linear-gradient(135deg, #FFE4FF 0%, #FFE4E1 100%)',
        'linear-gradient(135deg, #FFFACD 0%, #FFE4FF 100%)',
        'linear-gradient(135deg, #FFE4E1 0%, #FFFACD 100%)'
    ];

    // 時間帯に応じた背景変更（オプション）
    function updateBackground() {
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 6) {
            document.body.style.backgroundImage = 
                'linear-gradient(180deg, #2a2a4a 0%, #4a3a6a 100%)';
        }
    }
    updateBackground();

    // 星のまたたき効果
    createTwinklingStars();
});

// 星のまたたき効果を追加
function createTwinklingStars() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        .star {
            position: fixed;
            width: 2px;
            height: 2px;
            background: yellow;
            border-radius: 50%;
            animation: twinkle 3s infinite;
            pointer-events: none;
            z-index: -1;
        }
    `;
    document.head.appendChild(style);

    // ランダムに星を配置
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(star);
    }
}

// ページを離れる時のメッセージ
window.addEventListener('beforeunload', function(e) {
    // (プロダクション環境では使用を避けるべきですが、2000年代風です)
});

// マウスカーソルの位置に応じた効果
document.addEventListener('mousemove', function(e) {
    // パフォーマンスを考慮して10ms毎に実行
    if (window.lastMouseX === undefined) {
        window.lastMouseX = e.clientX;
        window.lastMouseY = e.clientY;
    }
});

// 訪問者カウンターの更新関数
function updateVisitorCounter() {
    const DEFAULT_VISITOR_COUNT = 247;
    const COUNTER_DISPLAY_LENGTH = 6;
    
    const counterElement = document.getElementById('visitor-counter');
    const messageElement = document.getElementById('visitor-message');
    
    if (counterElement && messageElement) {
        // カウンター値を取得（実際はローカルストレージやサーバーから取得）
        let count = localStorage.getItem('visitorCount');
        if (!count) {
            count = DEFAULT_VISITOR_COUNT;
        } else {
            count = parseInt(count, 10);
        }
        
        // カウントを増やす
        count++;
        localStorage.setItem('visitorCount', count);
        
        // カウンター表示を更新（ゼロパディング）
        const paddedCount = String(count).padStart(COUNTER_DISPLAY_LENGTH, '0');
        counterElement.textContent = paddedCount;
        
        // メッセージ表示を更新
        messageElement.textContent = `あなたは${count}人目の夢追い人です`;
    }
}
