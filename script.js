// 문서의 모든 콘텐츠가 로드된 후 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 인터랙티브 타임라인 기능 ---
    // 설명: 타임라인 항목이 화면에 나타날 때 부드럽게 등장하는 효과를 구현합니다.
    const timelineItems = document.querySelectorAll('.timeline-item');

    // IntersectionObserver: 특정 요소가 뷰포트와 교차하는지 감지
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // isIntersecting: 요소가 화면에 보이는지 여부 (boolean)
            if (entry.isIntersecting) {
                // 화면에 보이면 'is-visible' 클래스를 추가하여 CSS 애니메이션을 발동
                entry.target.classList.add('is-visible');
                // 한 번 효과가 적용된 항목은 더 이상 관찰하지 않아 성능을 최적화
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1 // 요소가 10% 이상 보일 때 콜백 함수 실행
    });

    // 모든 타임라인 항목에 대해 관찰 시작
    timelineItems.forEach(item => {
        observer.observe(item);
    });


    // --- 2. 개념 카드 모달 기능 ---
    // 설명: '결정적 증거' 섹션의 개념 카드를 클릭하면 상세 설명이 담긴 모달 창을 띄웁니다.
    const modal = document.getElementById('concept-modal');
    const closeBtn = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    // 각 개념에 대한 제목과 설명 텍스트를 담은 데이터 객체
    const conceptData = {
        'heat-expansion': {
            title: '열팽창 (Thermal Expansion)',
            text: '물질이 열을 받으면 부피가 늘어나는 현상입니다. 특히 기체는 열팽창 정도가 매우 커서, 끓는 물에서 나온 수증기는 엄청난 힘으로 피스톤을 밀어낼 수 있었습니다. 이것이 바로 증기기관의 핵심적인 동력원입니다.'
        },
        'heat-equilibrium': {
            title: '열평형 (Heat Equilibrium)',
            text: '온도가 다른 두 물체가 접촉하면, 온도가 높은 쪽에서 낮은 쪽으로 열이 이동하여 결국 두 물체의 온도가 같아지는 현상입니다. 와트는 실린더를 항상 뜨겁게 유지하고, 응축기를 차갑게 분리하여 불필요한 열의 이동과 에너지 손실을 최소화함으로써 엔진의 효율을 극대화했습니다.'
        },
        'specific-heat': {
            title: '비열 (Specific Heat)',
            text: '어떤 물질 1kg의 온도를 1℃ 높이는 데 필요한 열에너지의 양입니다. 물은 비열이 매우 큰 물질로, 많은 열에너지를 저장할 수 있습니다. 와트는 물의 높은 비열 특성을 이해하고, 적은 양의 물을 증기로 만들어 효율적으로 에너지를 사용하는 방법을 고민했습니다.'
        }
    };
    
    // 모든 개념 카드 버튼에 클릭 이벤트 리스너 추가
    document.querySelectorAll('.concept-card-button').forEach(button => {
        button.addEventListener('click', () => {
            const conceptId = button.dataset.concept; // 버튼의 data-concept 속성 값 가져오기
            const data = conceptData[conceptId]; // 해당 id에 맞는 데이터 조회
            
            // 모달에 제목과 텍스트 채우기
            modalTitle.innerText = data.title;
            modalText.innerText = data.text;
            
            // 모달을 화면에 표시
            modal.style.display = 'block';
        });
    });

    // 닫기 버튼(X) 클릭 시 모달 닫기
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 모달 외부의 어두운 배경 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });


    // --- 3. 연구원의 노트 (로컬 스토리지) 기능 ---
    // 설명: 사용자가 '나의 연구 노트'에 입력한 내용을 브라우저의 로컬 스토리지에 저장하고, 다음에 방문했을 때도 유지되도록 합니다.
    const notebook = document.getElementById('notebook-textarea');
    const saveBtn = document.getElementById('save-notes-btn');

    const storageKey = 'case003_notes';

    // 페이지 로드 시, 로컬 스토리지에 저장된 내용이 있으면 불러오기
    notebook.value = localStorage.getItem(storageKey) || '';

    // '노트 저장하기' 버튼 클릭 시
    saveBtn.addEventListener('click', () => {
        // 텍스트 영역의 현재 내용을 로컬 스토리지에 저장
        localStorage.setItem(storageKey, notebook.value);
        alert('노트가 성공적으로 저장되었습니다!'); // 사용자에게 저장 완료 피드백 제공
    });
});
