(function () {
    'use strict';

    /**
     * Відкриття iframe-плеєра у повноекранному режимі без перезавантаження Lampa при виході
     * @param {string} url - посилання на плеєр / iframe
     * @param {string} title - назва контенту (опціонально)
     */
    function openIframePlayer(url, title) {
        // Видаляємо дублікати плеєра, якщо вони вже були в DOM
        $('.ukr-player-overlay').remove();

        // 1. Повноекранний контейнер для iframe
        var playerHtml = $(`
            <div class="ukr-player-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                z-index: 99999;
                display: flex;
                justify-content: center;
                align-items: center;
            ">
                <iframe src="${url}" 
                        style="width: 100%; height: 100%; border: none;" 
                        allow="autoplay; fullscreen" 
                        allowfullscreen="true" 
                        webkitallowfullscreen="true" 
                        mozallowfullscreen="true">
                </iframe>
            </div>
        `);

        $('body').append(playerHtml);

        // Запам'ятовуємо назву активного контролера Lampa перед відкриттям плеєра
        var previousController = Lampa.Controller.enabled().name;

        // 2. Реєстрація власного контролера в Lampa для перехоплення кнопки "Назад" (Back / Escape / Return)
        Lampa.Controller.add('ukr_player_controller', {
            toggle: function () {
                // Фокусування на шарі плеєра
            },
            back: function () {
                // При натисканні "Назад" на пульті видаляємо iframe і повертаємо фокус у Lampa
                playerHtml.remove();
                Lampa.Controller.toggle(previousController || 'content');
            }
        });

        // 3. Активація контролера плеєра
        Lampa.Controller.toggle('ukr_player_controller');
    }

    // Для виклику в інших частинах вашого скрипту
    window.ukrSourcesOpenPlayer = openIframePlayer;
})();
