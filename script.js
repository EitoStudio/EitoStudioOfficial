document.addEventListener('DOMContentLoaded', () => {
    // モバイルメニューの実装
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', () => {
        // メニューの表示/非表示を切り替え
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // メニュー項目のクリックイベント
    links.forEach(link => {
        link.addEventListener('click', () => {
            // メニューを閉じる
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // モバイルメニューを閉じる
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // スクロール時のヘッダーのスタイル変更
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = '#000000';
        }
    });

    // フォーム送信処理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 送信ボタンの状態を更新
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.innerHTML = '<span>送信中...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;

            // Formspreeにデータを送信
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // 送信成功時の処理
                    submitButton.innerHTML = '<span>送信完了</span><i class="fas fa-check"></i>';
                    submitButton.classList.add('success');
                    contactForm.reset();
                    
                    // 3秒後に元の状態に戻す
                    setTimeout(() => {
                        submitButton.innerHTML = '<span>送信する</span><i class="fas fa-paper-plane"></i>';
                        submitButton.classList.remove('success');
                        submitButton.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('送信に失敗しました');
                }
            })
            .catch(error => {
                // エラー時の処理
                submitButton.innerHTML = '<span>送信失敗</span><i class="fas fa-exclamation-circle"></i>';
                submitButton.classList.add('error');
                submitButton.disabled = false;
                
                // 3秒後に元の状態に戻す
                setTimeout(() => {
                    submitButton.innerHTML = '<span>送信する</span><i class="fas fa-paper-plane"></i>';
                    submitButton.classList.remove('error');
                }, 3000);
            });
        });
    }

    // Pricingボタンとお問い合わせフォームの連動
    const pricingButtons = document.querySelectorAll('.pricing-button');
    const serviceSelect = document.getElementById('service');

    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            serviceSelect.value = service;
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // モーダル機能
    const modal = document.getElementById('workModal');
    const closeBtn = document.querySelector('.close-modal');
    const workDetails = document.querySelectorAll('.work-details');

    workDetails.forEach(detail => {
        detail.addEventListener('click', function(e) {
            e.preventDefault();
            const workId = this.getAttribute('data-work');
            const workDetail = document.getElementById(workId);
            
            // 他の詳細を非表示
            document.querySelectorAll('.work-detail').forEach(detail => {
                detail.classList.remove('active');
            });
            
            // 選択した詳細を表示
            workDetail.classList.add('active');
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
