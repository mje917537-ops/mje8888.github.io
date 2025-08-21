document.addEventListener('DOMContentLoaded', () => {

    // 모든 맛집 카드와 필터 버튼, 검색창 요소를 가져옴
    const placeCards = document.querySelectorAll('.place-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    // --- 1. 스크롤에 따른 카드 등장 애니메이션 ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 화면에 요소가 보이면 'visible' 클래스 추가
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 보인 요소는 계속 보이도록 관찰 중지
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 카드의 10%가 보일 때 애니메이션 실행
    });

    // 모든 카드에 대해 관찰 시작
    placeCards.forEach(card => {
        observer.observe(card);
    });

    // --- 2. 카테고리 필터링 기능 ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 모든 버튼의 'active' 클래스 제거
            filterBtns.forEach(b => b.classList.remove('active'));
            // 현재 클릭한 버튼에 'active' 클래스 추가
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // 모든 카드를 순회하며 필터링
            placeCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // '전체'를 선택했거나, 카드의 카테고리가 필터 값과 일치하면 보이기
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide');
                } else {
                    // 일치하지 않으면 숨기기
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- 3. 이름으로 검색 기능 ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        placeCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            
            // 가게 이름에 검색어가 포함되어 있으면 보이기
            if (title.includes(searchTerm)) {
                card.classList.remove('hide');
            } else {
                // 포함되어 있지 않으면 숨기기
                card.classList.add('hide');
            }
        });
    });

});
