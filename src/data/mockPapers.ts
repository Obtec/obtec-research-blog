import { Paper } from '../types/paper';

export const CATEGORIES = [
  'All',
  'API',
  '물리학',
  '컴퓨터 과학',
  '반도체',
  'etc.',
] as const;

export const MOCK_PAPERS: Paper[] = [
  {
    id: 'gravnet-astrophysical-dynamical-network',
    slug: 'gravnet-astrophysical-potential-dynamical-network',
    type: 'report',
    title: '시공간 중력장 궤도 신경망 (GravNet) 개발 보고서',
    subtitle: '오차 역전파 없이 다중 헤일로 플러머 중력장과 심플렉틱 궤도 역학만으로 별·은하·퀘이사를 분류하다',
    coverImage: '/assets/gravnet/cover-gravnet.webp',
    authors: [
      { name: '이인수', affiliation: 'Obtec Research', role: 'Author' },
    ],
    publishedDate: '2026.11.07',
    journalOrConference: 'Obtec Research · Astrophysical Dynamical Machine Learning',
    doi: '10.48550/OBTEC.2026.1108',
    category: '물리학',
    tags: [
      '천체역학',
      'GravNet',
      '플러머 퍼텐셜',
      '심플렉틱 적분',
      '무역전파 학습',
      'SDSS-17',
    ],
    readTimeMinutes: 16,
    citationCount: 0,
    viewsCount: 1,
    downloadCount: 0,
    featured: true,
    abstract: `* **저자**: 이인수 (Obtec Research)
* **패러다임**: Astrophysical Dynamical Machine Learning · Zero-Backpropagation Paradigm
* **데이터셋**: SDSS-17 (정제 표본 99,999천체)
* **패러다임 비교**: 역전파 DL vs. 위상 진화 TWEANN vs. 중력 동역학 GravNet

---

전통적인 딥러닝(DL)은 층별 행렬곱과 전역 오차 역전파(Backpropagation)에 의존하며, 진화 신경망(EDL/TWEANN)은 세대별 돌연변이와 자연선택을 모사합니다. 본 연구에서는 제3의 독창적 패러다임으로, 천체 분류기 내부에 실제 천체역학의 다중 헤일로 플러머 중력장(Multi-Halo Plummer Gravitational Potential)과 심플렉틱 감쇠 리프프로그(Symplectic Dissipative Leapfrog) 적분기를 구축한 GravNet을 제안하고 개발하였습니다.

> [!IMPORTANT] 핵심 연구 요약 (Executive Summary)
> * **완전 무역전파(100% Backpropagation-Free) 학습**: 궤도를 시간 역방향으로 미분(BPTT)하지 않고, 종착 위치에서의 볼츠만 포획 잔차와 **종착 조석력 벡터(Terminal Tidal Force Vector)**만으로 중력 질량, 헤일로 좌표, 발사 렌즈를 직접 조각한다.
> * **수학적·물리적 엄밀성 검증**: 기호 연산(SymPy)으로 해석적 중력장 잔차 $0$ 및 해밀토니안 소산 항등식 $\\frac{dH}{dt} + \\gamma \\|\\mathbf{p}\\|_2^2 = 0$을 증명하고, 유한차분 오차 $1.84 \\times 10^{-10}$ 이내임을 수치 검증하였다.
> * **기존 신경망을 상회하는 분류 정확도**: 20,000개 테스트 천체에서 단일 우주 GravNet이 **정확도 97.55%** ($\\text{Macro-}F_1$ **0.9718**, 학습 40.69초), 3-우주 다중우주(Multiverse)가 **정확도 97.59%** ($\\text{Macro-}F_1$ **0.9724**)를 달성하여 역전파 DL 단일/3-Seed MLP(97.37%/97.42%)와 진화 신경망 EDL/TWEANN(97.45%)을 모두 넘어섰다. 특히 테스트 항성(STAR) 4,319개를 단 1건의 누락도 없이 **100.00% 재현율(4,319/4,319)**로 포획하였다.
> * **라그랑주 $L_1$ 안장점 기반 물리적 불확실성 해부**: 두 은하단 중력이 비기는 라그랑주 $L_1$ 능선 장벽 $\\Delta E_{L_1}$을 통해, 별도의 불확실성 모듈 없이도 모은하 빛이 혼입된 저적색편이 퀘이사 경계군(하위 5% 경계군 정확도 75.50% vs. 상위 95% 깊은 우물 포획군 **98.71%**)을 자연스럽게 분리하였다.`,
    keyContributions: [
      '완전 무역전파(100% Backpropagation-Free) 학습: 궤도를 시간 역방향으로 미분(BPTT)하지 않고 종착 볼츠만 포획 잔차와 종착 조석력 벡터(Terminal Tidal Force Vector)만으로 중력 질량, 헤일로 좌표, 발사 렌즈를 직접 조각',
      '수학적·물리적 엄밀성 검증: SymPy 기호 대수로 해석적 중력장 잔차 0 및 해밀토니안 소산 항등식 dH/dt + γ‖p‖₂² = 0을 증명하고, 2차 중앙 유한차분 오차 1.836×10⁻¹⁰ 이내 및 전 스텝 에너지 단조 감소를 수치 검증',
      '기존 정적·진화 신경망 상회 정확도 달성: SDSS-17 테스트 천체 20,000개에서 단일 우주 97.55%(Macro-F1 0.9718, 40.69s), 3-우주 다중우주 97.59%(Macro-F1 0.9724)를 달성하고 항성(STAR) 4,319개 전수 포획(100.00% Recall)',
      '라그랑주 L1 안장점 기반 물리적 불확실성 해부: 퍼텐셜 장벽 ΔE_L1 지표만으로 상위 95% 깊은 우물 포획군(정확도 98.71%)과 모은하 별빛이 혼입된 저적색편이 퀘이사 경계군(하위 5%, 정확도 75.50%)을 자발적으로 분리',
    ],
    pdfDownloadName: 'gravnet_research_report.pdf',
    pdfUrl: '/papers/gravnet_research_report.pdf',
    bibtex: `@techreport{lee2026gravnet,
  title={시공간 중력장 궤도 신경망 (GravNet) 개발 보고서: 오차 역전파 없이 다중 헤일로 플러머 중력장과 심플렉틱 궤도 역학만으로 별·은하·퀘이사를 분류하다},
  author={Lee, Insoo},
  institution={Obtec Research},
  year={2026},
  month={11}
}`,
    apaCitation: '이인수. (2026). 시공간 중력장 궤도 신경망 (GravNet) 개발 보고서: 오차 역전파 없이 다중 헤일로 플러머 중력장과 심플렉틱 궤도 역학만으로 별·은하·퀘이사를 분류하다. Obtec Research.',
    sections: [
      {
        id: '1-서론-왜-중력장-동역학으로-별빛을-분류하는가',
        title: '1. 서론: 왜 ‘중력장 동역학’으로 별빛을 분류하는가?',
        level: 1,
        content: `슬론 디지털 전천 탐사(SDSS-17)의 천체 분류 문제는 5개 측광 필터 등급($u, g, r, i, z$), 인접 파장 색지수 4종($u - g, g - r, r - i, i - z$), 그리고 분광 적색편이($z$, \`redshift\`)로 이루어진 입력 벡터 $\\mathbf{x} \\in \\mathbb{R}^{10}$로부터 해당 천체가 은하(\`GALAXY\`), 퀘이사(\`QSO\`), 항성(\`STAR\`) 중 무엇인지 판별하는 과제이다.

앞서 구축한 두 파이프라인은 서로 다른 철학으로 이 문제를 해결하였다.

1. **전역 오차 역전파 딥러닝 (\`DL/\`)**: 인간이 설계한 고정 다층 퍼셉트론($10 \\to 64 \\to 32 \\to 3$)에서 연쇄법칙(Chain Rule)으로 전역 손실 기울기를 역전파하여 테스트 정확도 **97.37%**(3-Seed 앙상블 **97.42%**)를 기록하였다.
2. **위상·가중치 동시 진화 신경망 (\`EDL/TWEANN\`)**: 8개의 독립된 섬에서 Net2Net 함수 보존 변이와 결정 경계 진화 전략을 통해 \`10 -> [104:gelu] -> [48:gelu] -> [48+skip:silu] -> 3\` 구조를 스스로 발명하여 **97.43%**(상위 4섬 앙상블 **97.45%**)를 달성하였다.

그러나 두 방식 모두 **“이산적인 은닉층 행렬곱과 비선형 활성화 함수의 합성”**이라는 정적 계산 그래프 틀 안에 머물러 있다. 본 연구는 천체물리 도메인 그 자체에서 영감을 얻어 근본적인 질문을 던졌다.

> *“은닉층을 쌓는 대신, 관측된 별빛 $\\mathbf{x}$를 인공 시공간 속의 천체 입자로 발사하여 실제 구상성단과 은하 헤일로가 따르는 **플러머 중력 방정식(Plummer Gravitational Law)**에 따라 스스로 궤도 운동하며 자신의 은하단 중력 우물로 낙하·포획되게 만들 수 없을까?”*

이 발상으로부터 탄생한 **GravNet (Astrophysical Potential Dynamical Network)**의 전체 물리 파이프라인을 그림 1에 도식화하였다.

\`\`\`mermaid
flowchart LR
  Input["1. 천체 관측 입력 x in R^10"] --> Lens["2. 다중 해상도 분광 렌즈 Phi(x) in R^3826"]
  Lens --> Orbit["3. 플러머 중력장 궤도 적분 (GravNet Plummer Leapfrog T=10)"]
  Orbit --> Capture["4. 우물 포획 & L1 진단"]
  Capture -.->|"Zero-BPTT 조석 학습"| Orbit
  Capture -.->|"종착 조석력 f_tidal"| Lens
\`\`\``,
      },
      {
        id: '2-물리-수학적-정식화-및-단계별-엄밀-유도',
        title: '2. 물리·수학적 정식화 및 단계별 엄밀 유도',
        level: 1,
        content: `### 2.1 섬유 다발 위상 공간과 다중 해상도 천체 분광 렌즈

관측된 천체 데이터 $\\mathbf{x} \\in \\mathbb{R}^{d_{\\text{in}}}$ ($d_{\\text{in}} = 10$)를 위상 공간(Phase Space) $\\mathcal{P} = \\mathbb{R}^d \\times \\mathbb{R}^d$ ($d = 6$) 위의 단위 질량($m = 1$) 시험 입자 상태 $(\\mathbf{q}(t), \\mathbf{p}(t))$로 사상한다. 이때 위치 공간 $\\mathbb{R}^6$은 기하학적 역할이 분리된 직합(Direct Sum) 구조를 갖는다:

$$
\\mathbf{q}(t) = \\bigl(\\mathbf{q}_{\\text{orb}}(t),\\; \\mathbf{q}_{\\text{spec}}(t)\\bigr) \\in \\mathbb{R}^2 \\oplus \\mathbb{R}^4. \\tag{1}
$$

여기서 $\\mathbf{q}_{\\text{orb}}(t) = (q_1(t), q_2(t))^\\top \\in \\mathbb{R}^2$는 세 천체 종족의 초은하단 중심 $\\mathbf{S}_c \\in \\mathbb{R}^6$ ($c \\in \\{0, 1, 2\\}$)가 반지름 $R_{\\text{sc}} = 3.2$, 위상각 $\\theta_c \\in \\{\\frac{\\pi}{2}, \\frac{7\\pi}{6}, \\frac{11\\pi}{6}\\}$ ($120^\\circ$ 정삼각형 대칭)로 배치된 **2차원 초은하단 궤도 평면**이며, $\\mathbf{q}_{\\text{spec}}(t) \\in \\mathbb{R}^4$는 종족 내부의 세부 천체군(적색 타원은하 vs. 청색 나선은하, 고적색편이 퀘이사 vs. 세이퍼트 활동은하핵 등)을 분해하는 **4차원 분광 섬유(Spectral Fiber)**이다.

극단적 이상치에 대한 수치 안정성을 위해 부드러운 포화 사상 $\\tilde{\\mathbf{x}} = 15\\tanh(\\mathbf{x}/15) \\in (-15, 15)^{10}$을 거친 후, 보크너 정리(Bochner's Theorem; Rahimi & Recht, 2007)와 도플러 주파수 격자를 결합한 **다중 해상도 분광 렌즈** $\\Phi(\\mathbf{x}) \\in \\mathbb{R}^M$ ($M = 3,826$)를 다음과 같이 정의한다:

$$
\\Phi(\\mathbf{x}) = \\left[\\, 1 \\;\\Big\\|\\; \\tilde{\\mathbf{x}}^\\top \\;\\Big\\|\\; \\frac{1}{4}\\bigl(\\tilde{x}_i \\tilde{x}_j\\bigr)_{1 \\le i \\le j \\le 10} \\;\\Big\\|\\; \\frac{1}{\\sqrt{F}}\\sin(\\tilde{\\mathbf{x}} \\otimes \\boldsymbol{\\omega}_{\\text{1D}}) \\;\\Big\\|\\; \\frac{1}{\\sqrt{F}}\\cos(\\tilde{\\mathbf{x}} \\otimes \\boldsymbol{\\omega}_{\\text{1D}}) \\;\\Big\\|\\; \\sqrt{\\frac{2}{M_{\\text{RFF}}}}\\cos(\\tilde{\\mathbf{x}}^\\top \\boldsymbol{\\Omega} + \\boldsymbol{\\varphi}^\\top) \\,\\right]^\\top. \\tag{2}
$$

여기서 $\\boldsymbol{\\omega}_{\\text{1D}} \\in \\mathbb{R}^F$ ($F = 44$)는 $\\omega_{\\min} = 0.25$부터 $\\omega_{\\max} = 120.0$까지 기하 급수로 배치된 1차원 주파수 격자($\\omega_k = 0.25 \\times (480)^{k/(F-1)}$)이며, $\\boldsymbol{\\Omega} \\in \\mathbb{R}^{10 \\times M_{\\text{RFF}}}$ ($M_{\\text{RFF}} = 2,880$)는 다중 대역폭 $\\sigma_b \\in \\{0.25, 0.60, 1.40, 3.20\\}$ 가우시안 스펙트럼 측도에서 추출된 비등방성 주파수 행렬이다.

**우주 원점 발사 조건(Cosmic-Origin Launch Constraint)**: 시각 $t = 0$에서 모든 천체가 궤도 평면 위에서 어떠한 사전 편향도 없이 출발하도록 발사 행렬 $\\mathbf{W}_q \\in \\mathbb{R}^{M \\times 6}$의 처음 두 열을 영벡터로 강제한다($[\\mathbf{W}_q]_{:,1:2} = \\mathbf{0}$):

$$
\\mathbf{q}_{\\text{orb}}(0) = \\mathbf{0}_2, \\qquad \\mathbf{q}_{\\text{spec}}(0) = \\Phi(\\mathbf{x})^\\top [\\mathbf{W}_q]_{:,3:6}, \\qquad \\mathbf{p}(0) = \\Phi(\\mathbf{x})^\\top \\mathbf{W}_p. \\tag{3}
$$

따라서 궤도 적분을 수행하지 않은 $T = 0$ 상태에서는 모든 천체가 궤도 평면 원점 $(0, 0)$에 놓여 분류가 불가능하며, 오직 $t > 0$ 동안의 중력 궤도 운동을 통해서만 초은하단 포획이 이루어진다.

---

### 2.2 다중 헤일로 플러머 중력 퍼텐셜과 해석적 중력장 유도

점질량 뉴턴 중력 퍼텐셜 $U_{\\text{Newton}}(\\mathbf{q}) = -G / \\|\\mathbf{q} - \\boldsymbol{\\mu}\\|_2$는 $\\mathbf{q} \\to \\boldsymbol{\\mu}$일 때 분모가 $0$이 되어 수치 적분 시 무한대 발산(Singularity)을 일으킨다. 이를 방지하기 위해 실제 천체물리학에서 구상성단과 은하 암흑물질 헤일로의 밀도 분포를 기술하는 **플러머 퍼텐셜(Plummer Potential; Plummer, 1911)**을 도입한다.

각 클래스 $c \\in \\{0, 1, 2\\}$가 $K = 6$개의 응축된 중력 핵 위치 $\\boldsymbol{\\mu}_{c,m} \\in \\mathbb{R}^d$와 양의 중력 질량 $G_{c,m} > 0$ ($m = 1, \\dots, K$, 총 $3K = 18$개 중력원)을 보유할 때, 클래스별 플러머 퍼텐셜 $U_c(\\mathbf{q})$와 우주 조화 가둠(Harmonic Cosmic Confinement)을 포함한 총 퍼텐셜 에너지 $U(\\mathbf{q})$를 다음과 같이 정의한다:

$$
U_c(\\mathbf{q}) = -\\sum_{m=1}^{K} \\frac{G_{c,m}}{\\sqrt{\\|\\mathbf{q} - \\boldsymbol{\\mu}_{c,m}\\|_2^2 + \\epsilon^2}}, \\qquad U(\\mathbf{q}) = \\sum_{c=0}^{2} U_c(\\mathbf{q}) + \\frac{1}{2}\\kappa \\|\\mathbf{q}\\|_2^2. \\tag{4}
$$

**정의역 및 정칙성 제약 조건**: 연화 길이(Softening Length) $\\epsilon > 0$, 중력 질량 $G_{c,m} > 0$, 가둠 탄성 계수 $\\kappa > 0$으로 선언한다. 모든 $\\mathbf{q} \\in \\mathbb{R}^d$에 대하여 제곱근 내부의 값 $r_{c,m}^2(\\mathbf{q}) \\triangleq \\|\\mathbf{q} - \\boldsymbol{\\mu}_{c,m}\\|_2^2 + \\epsilon^2 \\ge \\epsilon^2 > 0$이므로, 분모는 전 공간에서 결코 $0$이 되지 않으며 $U \\in C^\\infty(\\mathbb{R}^d)$ 급의 매끄러운 함수가 된다.

이제 자동미분(Autograd)에 의존하지 않기 위해 위치 성분 $q_j$ ($j \\in \\{1, \\dots, d\\}$)에 대한 편미분을 연쇄법칙으로 단계별 전개한다:

$$
\\begin{aligned}
\\frac{\\partial U(\\mathbf{q})}{\\partial q_j} &= \\sum_{c=0}^{2} \\sum_{m=1}^{K} \\left( -G_{c,m} \\frac{\\partial}{\\partial q_j} \\bigl(r_{c,m}^2(\\mathbf{q})\\bigr)^{-1/2} \\right) + \\frac{1}{2}\\kappa \\frac{\\partial}{\\partial q_j} \\sum_{l=1}^{d} q_l^2 \\\\
&= \\sum_{c=0}^{2} \\sum_{m=1}^{K} \\left( -G_{c,m} \\left(-\\frac{1}{2}\\right) \\bigl(r_{c,m}^2(\\mathbf{q})\\bigr)^{-3/2} \\cdot 2(q_j - \\mu_{c,m,j}) \\right) + \\kappa q_j \\\\
&= \\sum_{c=0}^{2} \\sum_{m=1}^{K} G_{c,m} \\frac{q_j - \\mu_{c,m,j}}{\\left(\\|\\mathbf{q} - \\boldsymbol{\\mu}_{c,m}\\|_2^2 + \\epsilon^2\\right)^{3/2}} + \\kappa q_j.
\\end{aligned} \\tag{5}
$$

벡터 형태로 결합하면 입자가 받는 닫힌 수식(Closed-Form) 중력장 $\\mathbf{F}_{\\text{grav}}(\\mathbf{q}) = -\\nabla_{\\mathbf{q}} U(\\mathbf{q})$를 얻는다:

$$
\\mathbf{F}_{\\text{grav}}(\\mathbf{q}) = -\\sum_{c=0}^{2} \\sum_{m=1}^{K} G_{c,m} \\frac{\\mathbf{q} - \\boldsymbol{\\mu}_{c,m}}{\\left(\\|\\mathbf{q} - \\boldsymbol{\\mu}_{c,m}\\|_2^2 + \\epsilon^2\\right)^{3/2}} - \\kappa \\mathbf{q}. \\tag{6}
$$

---

### 2.3 리아푸노프 해밀토니안 소산 정리와 심플렉틱 리프프로그 적분기

보존 중력장만 존재하면 초기 운동 에너지를 지닌 천체 입자가 우물 바닥에 정착하지 못하고 영구히 진동하거나 쌍곡선 궤도로 이탈할 수 있다. 이를 물리적으로 해결하기 위해 우주 팽창에 따른 **허블 마찰 계수(Hubble Drag)** $\\gamma > 0$을 도입한 감쇠 해밀턴 동역학계를 구성한다:

$$
\\frac{d\\mathbf{q}}{dt} = \\mathbf{p}, \\qquad \\frac{d\\mathbf{p}}{dt} = -\\nabla_{\\mathbf{q}} U(\\mathbf{q}) - \\gamma \\mathbf{p}. \\tag{7}
$$

> [!TIP] 정리 1 (리아푸노프 에너지 단조 소산 및 평형점 수렴성)
> 연화 길이 $\\epsilon > 0$, 중력 질량 $G_{c,m} > 0$, 가둠 계수 $\\kappa > 0$, 허블 마찰 계수 $\\gamma > 0$일 때, 총 역학적 해밀토니안 $H(\\mathbf{q}, \\mathbf{p}) = \\frac{1}{2}\\|\\mathbf{p}\\|_2^2 + U(\\mathbf{q})$는 아래 유계(Bounded Below)이자 방사 강제성(Radially Coercive)을 가지며, 궤적을 따라 단조 감소하여 모든 초기 상태 $(\\mathbf{q}(0), \\mathbf{p}(0)) \\in \\mathbb{R}^{2d}$가 정지 평형 집합 $\\mathcal{E} = \\{(\\mathbf{q}^*, \\mathbf{0}) \\mid \\nabla_{\\mathbf{q}} U(\\mathbf{q}^*) = \\mathbf{0}\\}$으로 수렴한다.

#### 증명 (단계별 유도)

1. **하계 존재성 및 강제성(Coercivity)**: 모든 $\\mathbf{q} \\in \\mathbb{R}^d$에 대해 연화 거리 $r_{c,m}(\\mathbf{q}) = \\sqrt{\\|\\mathbf{q} - \\boldsymbol{\\mu}_{c,m}\\|_2^2 + \\epsilon^2} \\ge \\epsilon$이므로 각 중력 우물 항은 $-G_{c,m} / r_{c,m}(\\mathbf{q}) \\ge -G_{c,m} / \\epsilon$을 만족한다. 따라서

$$
H(\\mathbf{q}, \\mathbf{p}) \\ge \\frac{1}{2}\\|\\mathbf{p}\\|_2^2 + \\frac{1}{2}\\kappa \\|\\mathbf{q}\\|_2^2 - \\frac{1}{\\epsilon}\\sum_{c=0}^{2}\\sum_{m=1}^{K} G_{c,m} > -\\infty \\tag{8}
$$

이며, $\\kappa > 0$이므로 $\\|(\\mathbf{q}, \\mathbf{p})\\|_2 \\to \\infty$일 때 $H(\\mathbf{q}, \\mathbf{p}) \\to +\\infty$이다. 즉 모든 부분준위집합(Sublevel Set) $\\Omega_c = \\{(\\mathbf{q}, \\mathbf{p}) \\mid H(\\mathbf{q}, \\mathbf{p}) \\le H(\\mathbf{q}(0), \\mathbf{p}(0))\\}$은 유계 닫힌집합(Compact Set)이다.

2. **궤도 시간 도함수 유도**: 다변수 연쇄법칙과 식 (7)을 대입하면

$$
\\begin{aligned}
\\frac{d}{dt} H\\bigl(\\mathbf{q}(t), \\mathbf{p}(t)\\bigr) &= \\langle \\nabla_{\\mathbf{q}} H, \\dot{\\mathbf{q}} \\rangle + \\langle \\nabla_{\\mathbf{p}} H, \\dot{\\mathbf{p}} \\rangle \\\\
&= \\langle \\nabla_{\\mathbf{q}} U(\\mathbf{q}), \\mathbf{p} \\rangle + \\langle \\mathbf{p}, -\\nabla_{\\mathbf{q}} U(\\mathbf{q}) - \\gamma \\mathbf{p} \\rangle \\\\
&= \\langle \\nabla_{\\mathbf{q}} U(\\mathbf{q}), \\mathbf{p} \\rangle - \\langle \\mathbf{p}, \\nabla_{\\mathbf{q}} U(\\mathbf{q}) \\rangle - \\gamma \\langle \\mathbf{p}, \\mathbf{p} \\rangle = -\\gamma \\|\\mathbf{p}\\|_2^2 \\le 0.
\\end{aligned} \\tag{9}
$$

3. **라살의 불변성 원리(LaSalle's Invariance Principle) 적용**: $\\dot{H} = 0 \\iff \\mathbf{p} = \\mathbf{0}$이다. 집합 $\\{(\\mathbf{q}, \\mathbf{p}) \\in \\Omega_c \\mid \\mathbf{p} = \\mathbf{0}\\}$ 내부에 영구히 머무르는 최대 양불변 집합(Largest Positively Invariant Set)에서는 항등적으로 $\\mathbf{p}(t) \\equiv \\mathbf{0} \\implies \\dot{\\mathbf{p}}(t) \\equiv \\mathbf{0}$이어야 하므로 식 (7)에 의해 $-\\nabla_{\\mathbf{q}} U(\\mathbf{q}) = \\mathbf{0}$이다. 따라서 라살의 불변성 원리에 의해 모든 해 궤적은 $t \\to \\infty$에서 정지 중력 평형점 집합 $\\mathcal{E}$로 수렴한다. $\\square$

**대칭 스트랭 분할(Strang Operator Splitting) 리프프로그 이산화**: 수치 적분 시 오일러 방법을 쓰면 위상 공간 면적이 왜곡되어 인공적인 수치 가열이 발생할 수 있다. 식 (7)의 벡터장을 선형 감쇠 연산자 $\\mathcal{D}$ ($\\dot{\\mathbf{p}} = -\\gamma \\mathbf{p}$), 중력 충격 연산자 $\\mathcal{K}$ ($\\dot{\\mathbf{p}} = \\mathbf{F}_{\\text{grav}}(\\mathbf{q})$), 자유 표류 연산자 $\\mathcal{T}$ ($\\dot{\\mathbf{q}} = \\mathbf{p}$)로 분해한 뒤, 시간 간격 $\\Delta t > 0$에 대해 2차 정확도($\\mathcal{O}(\\Delta t^2)$ 전역 오차)의 대칭 스트랭 합성 $\\Psi_{\\Delta t} = e^{\\frac{\\Delta t}{2}(\\mathcal{D}+\\mathcal{K})} \\circ e^{\\Delta t \\mathcal{T}} \\circ e^{\\frac{\\Delta t}{2}(\\mathcal{D}+\\mathcal{K})}$을 구성한다. 감쇠 인자를 $\\eta_d \\triangleq \\exp(-\\frac{1}{2}\\gamma \\Delta t) \\in (0, 1)$로 두면 1스텝 갱신식은 다음과 같다:

$$
\\begin{aligned}
\\mathbf{p}_{t+1/2} &= \\eta_d\\, \\mathbf{p}_t + \\frac{\\Delta t}{2}\\mathbf{F}_{\\text{grav}}(\\mathbf{q}_t), \\\\
\\mathbf{q}_{t+1} &= \\mathbf{q}_t + \\Delta t\\, \\mathbf{p}_{t+1/2}, \\\\
\\mathbf{p}_{t+1} &= \\eta_d\\, \\mathbf{p}_{t+1/2} + \\frac{\\Delta t}{2}\\mathbf{F}_{\\text{grav}}(\\mathbf{q}_{t+1}).
\\end{aligned} \\tag{10}
$$

특히 외력이 없을 때 단위 초기 속도의 $T$스텝 누적 탄도 도달 거리(Ballistic Reach)는 기하급수 합에 의해 닫힌 수식으로 결정된다:

$$
R_{\\text{reach}}(T) = \\Delta t\\, \\eta_d \\sum_{t=0}^{T-1} \\eta_d^{2t} = \\Delta t\\, \\eta_d \\frac{1 - \\eta_d^{2T}}{1 - \\eta_d^2} = \\frac{\\Delta t\\, e^{-\\gamma \\Delta t / 2}\\bigl(1 - e^{-\\gamma T \\Delta t}\\bigr)}{1 - e^{-\\gamma \\Delta t}}. \\tag{11}
$$

본 모델의 기본 설정($\\Delta t = 0.11$, $\\gamma = 0.95$, $T = 10$)에서 반스텝 감쇠 기하급수 닫힌 해는 $R_{\\text{reach}}(10) = 0.6821$이며, 보고서 프로토타입의 초기 전스텝 감쇠 보정 계수 반영값($0.6512$)을 1단계 초기 탄도 속도 스케일 보정에 일관되게 반영하였다.

---

### 2.4 무-BPTT 시공간 곡률 조각 및 종착 조석력 가소성

$T$스텝 종료 후 종착 위치 $\\mathbf{q}_T$에서 역온도 $\\beta > 0$ 및 화학 퍼텐셜 $\\nu_c \\in \\mathbb{R}$ ($\\sum_{c=0}^{2} \\nu_c = 0$)를 갖는 대정준 볼츠만-깁스(Grand-Canonical Boltzmann-Gibbs) 포획 확률을 계산한다:

$$
P(c \\mid \\mathbf{q}_T) = \\frac{\\exp\\bigl(-\\beta U_c(\\mathbf{q}_T) + \\nu_c\\bigr)}{\\sum_{k=0}^{2} \\exp\\bigl(-\\beta U_k(\\mathbf{q}_T) + \\nu_k\\bigr)}. \\tag{12}
$$

정답 레이블이 $y \\in \\{0, 1, 2\\}$일 때 음의 로그 우도 $\\mathcal{L}(\\mathbf{q}_T) = -\\ln P(y \\mid \\mathbf{q}_T)$에 대하여, 부호 있는 포획 잔차를 $r_c \\triangleq \\mathbb{I}[c = y] - P(c \\mid \\mathbf{q}_T)$로 정의하면(정답 은하단 $r_y > 0$, 경쟁 은하단 $r_{c \\neq y} < 0$), 시간 역전파(BPTT)를 전혀 수행하지 않고 종착 상태의 해석적 미분만으로 세 가지 국소 물리 학습 법칙이 도출된다:

1. **대조적 시공간 질량 조각 (Contrastive Mass Sculpting)**: $-\\frac{\\partial \\mathcal{L}}{\\partial G_{c,m}} = \\beta\\, r_c \\bigl(\\|\\boldsymbol{\\mu}_{c,m} - \\mathbf{q}_T\\|_2^2 + \\epsilon^2\\bigr)^{-1/2}$이므로, 정답 은하단에 도달하지 못한 천체는 정답 핵의 질량 $G_{y,m}$을 무겁게 키우고 침범한 오답 핵의 질량을 깎아낸다.
2. **중력 핵 위치 표류 (Contrastive Halo Drift)**: $-\\nabla_{\\boldsymbol{\\mu}_{c,m}} \\mathcal{L} = -\\beta\\, r_c G_{c,m} \\frac{\\boldsymbol{\\mu}_{c,m} - \\mathbf{q}_T}{(\\|\\boldsymbol{\\mu}_{c,m} - \\mathbf{q}_T\\|_2^2 + \\epsilon^2)^{3/2}}$에 정삼각형 기하 복원 탄성력 $\\alpha_{\\text{anc}}(\\mathbf{S}_c - \\boldsymbol{\\mu}_{c,m})$를 더해 은하단 위상을 정교하게 정렬한다.
3. **종착 조석력 벡터(Terminal Tidal Force Vector) 기반 헤비안 렌즈 가소성**: 종착 입자에 작용하는 목표 조석력 벡터 $\\mathbf{f}_{\\text{tidal}}(\\mathbf{q}_T) \\triangleq -\\nabla_{\\mathbf{q}_T} \\mathcal{L}$를 계산하면

$$
\\mathbf{f}_{\\text{tidal}}(\\mathbf{q}_T) = \\sum_{c=0}^{2}\\sum_{m=1}^{K} \\beta\\, r_c G_{c,m} \\frac{\\boldsymbol{\\mu}_{c,m} - \\mathbf{q}_T}{\\left(\\|\\boldsymbol{\\mu}_{c,m} - \\mathbf{q}_T\\|_2^2 + \\epsilon^2\\right)^{3/2}} \\in \\mathbb{R}^d \\tag{13}
$$

이다. 이 벡터는 정답 핵 방향($r_y > 0$)으로는 인력을, 오답 핵 방향($r_{c \\neq y} < 0$)으로는 척력을 가리킨다. 리프프로그 야코비안을 거꾸로 곱하는 BPTT 대신, 탄도 도달 상관성 $\\Delta \\mathbf{W}_p \\propto \\frac{1}{B}\\Phi(\\mathbf{X}_B)^\\top \\mathbf{f}_{\\text{tidal}} - \\lambda_w \\mathbf{W}_p$만으로 발사 렌즈를 직접 갱신한다.

---

### 2.5 차원 정합성 검증 및 코드 기반 기호·수치 자가 검산

과학적 엄밀성을 보장하기 위해 모든 상태 변수와 매개변수의 무차원 정규화 체계 및 검증 결과를 표 1에 정리하였다. \`GravNet/physics_model.py\` 내부의 \`verify_physics_rigor()\` 함수는 매 학습 실행 전 SymPy 기호 대수 검증과 2차 중앙 유한차분($\\delta = 10^{-6}$) 검증을 자동으로 수행한다.

* **Table 1: 물리량 차원 정규화 체계 및 기호(SymPy)·수치 자가 검산 결과.**

| 검증 항목 / 물리량 | 정규화 단위 및 제약 | 해석적 수식 및 코드 기반 자가 검산 결과 |
| :--- | :--- | :--- |
| **위상 좌표 $(\\mathbf{q}, \\mathbf{p})$, 시간 $t$** | 무차원 ($m = 1$ 정규화) | $\\Delta t = 0.11 > 0$, $\\gamma = 0.95 > 0$, $\\epsilon = 0.90 > 0$, $\\kappa = 0.04 > 0$ |
| **플러머 중력장 기호 검산** | $[\\text{에너지}/\\text{길이}]$ 동치 | SymPy $\\text{simplify}(-\\nabla_{\\mathbf{q}} U - \\mathbf{F}_{\\text{grav}}) = \\mathbf{0}$ (**정확히 일치**) |
| **리아푸노프 소산 기호 검산** | $[\\text{일률}]$ 차원 동치 | SymPy $\\text{simplify}(\\dot{H} + \\gamma \\|\\mathbf{p}\\|_2^2) = 0$ (**항등 성립**) |
| **유한차분 기울기 정밀도** | $\\max_{i,j} \\lvert F_{ij}^{\\text{analytic}} - F_{ij}^{\\text{FD}} \\rvert$ | 최대 절대 오차 **$1.836 \\times 10^{-10} < 10^{-8}$ 통과** |
| **수치 리프프로그 에너지 단조성** | $\\max_{t,i} (H_{t+1,i} - H_{t,i})$ | 최대 스텝 변화량 **$-1.381 \\times 10^{-2} < 0$** (모든 스텝 단조 감소) |`,
      },
      {
        id: '3-개발-과정-연대기-등방성-렌즈의-한계-진단과-도플러-돌파구',
        title: '3. 개발 과정 연대기: 등방성 렌즈의 한계 진단과 도플러 돌파구',
        level: 1,
        content: `GravNet 개발 과정에서 가장 결정적이었던 과학적 전환점은 **초기 프로토타입(‘96.78%’)의 병목 원인을 천체물리학적으로 규명하고 돌파(‘97.59%’)한 순간**이었다.

> [!WARNING] 개발 시행착오 진단 1: 왜 등방성(Isotropic) 랜덤 푸리에 렌즈는 96.78%에서 정체되었는가?
> 초기 프로토타입에서는 10개 입력 특성에 동일한 대역폭 $\\sigma_b \\in \\{0.35, 0.75, 1.50, 3.00\\}$을 적용한 등방성 랜덤 푸리에 기저($M = 4,096$)를 사용하였다. 그러나 검증 정확도는 **96.78%**에 머물렀다. 원인을 추적한 결과, 우리 은하 내부 항성(\`STAR\`, $|z| < 0.001$)과 근거리 은하(\`GALAXY\`, $z \\approx 0.005$) 사이의 적색편이 차이는 표준화된 $\\ln(1 + z)$ 축에서 불과 $\\Delta x_{10} \\approx 0.008\\,\\sigma$에 지나지 않았다. 대역폭 $\\sigma_b = 0.35$인 코사인 기저에서 이는 위상 변화 $\\Delta \\phi \\approx 0.02\\,\\text{rad}$만 유발하여, 별과 저적색편이 외부은하의 도플러 경계가 흐려진 것이었다!

> [!WARNING] 개발 시행착오 진단 2: 초기 발사 위치가 정답 근처로 직행하면 중력 궤도($T > 0$)가 할 일이 사라진다
> 또한 초기 설계에서 $\\mathbf{q}(0) = \\Phi(\\mathbf{x})\\mathbf{W}_q$가 곧바로 2차원 초은하단 중심 근처로 입자를 투영하자, $T = 0$(‘96.77%’)과 $T = 12$(‘96.78%’)의 차이가 ‘$+0.01\\%\\text{p}$’에 불과했다. 즉 중력 궤도 역학이 실질적인 비선형 분류 연산을 수행하지 못하고 있었던 것이다.

이 두 가지 진단을 바탕으로 다음 두 가지 핵심 설계 혁신을 단행하였다:

1. **기하 급수 도플러 주파수 격자 도입**: $\\omega \\in [0.25, 120.0]$까지 로그 간격으로 배치된 1차원 다중 해상도 파동과 적색편이-색지수 결합 고주파 모드를 분광 렌즈에 통합하자마자, 검증 정확도가 **96.78% → 97.51% (+0.73%p)**로 단숨에 도약하였다.
2. **우주 원점 발사 조건($\\mathbf{q}_{\\text{orb}}(0) = \\mathbf{0}_2$)과 SVD 분광 섬유 응축**: 모든 입자를 궤도 평면 원점 $(0, 0)$에서 출발시키고 각 클래스 내 $K = 6$개 세부 천체군(K-Means + 특이값 분해 SVD)에 총 18개의 플러머 중력 핵을 배치함으로써, 입자가 $t = 0 \\dots 10$ 동안 원점에서 출발해 실제 중력장 곡선을 따라 유영하며 포획되도록 재설계하였다.`,
      },
      {
        id: '4-실험-결과-및-시각화-분석',
        title: '4. 실험 결과 및 시각화 분석',
        level: 1,
        content: `모든 실험은 \`DL/\` 및 \`EDL/\` 파이프라인과 100% 동일한 결정론적 층화 분할(학습 63,999건 / 검증 16,000건 / 테스트 20,000건, \`random_state=42\`) 위에서 수행되었다.

### 4.1 시공간 중력 퍼텐셜 지형과 천체 입자 포획 궤적

그림 2(a)는 학습이 완료된 GravNet의 2차원 궤도 평면 단면 $U(q_1, q_2, \\mathbf{0}_4)$ 등퍼텐셜 지형과 중력장 벡터($-\\nabla_{\\mathbf{q}} U$), 18개의 응축된 플러머 중력 핵($\\star$), 그리고 우주 원점 $(0, 0)$($+$ 기호)에서 발사된 실제 테스트 천체들의 궤도 $\\mathbf{q}_{\\text{orb}}(t)$를 보여준다. 은하(청색), 퀘이사(적색), 항성(녹색) 입자들이 각각 $90^\\circ, 210^\\circ, 330^\\circ$ 방향의 초은하단 중력 우물 깊숙이 매끄럽게 낙하하는 반면, 두 초은하단 중력이 팽팽히 맞서는 경계 천체(황색 점선)는 라그랑주 $L_1$ 능선($\\diamond$) 부근에서 궤도가 휘어지며 감속된다. 그림 2(b)의 2,500개 테스트 천체 종착 분포에서도 세 은하단 우물과 ‘은하–퀘이사’ 사이의 물리적 $L_1$ 필라멘트 연결 구조가 선명하게 확인된다.

\`\`\`figure
{
  "columns": 1,
  "panels": [
    {
      "webp": "/assets/gravnet/fig2-plummer-potential-trajectories.webp",
      "src": "/assets/gravnet/fig2-plummer-potential-trajectories.png",
      "alt": "학습된 18-헤일로 플러머 중력 퍼텐셜 지형과 천체 입자들의 포획 궤도 및 종착 위상 분포",
      "width": 2200,
      "height": 936
    }
  ],
  "caption": "**Figure 2:** (a) 학습된 18-헤일로 플러머 중력 퍼텐셜 지형과 우주 원점 $(0, 0)$에서 출발한 천체 입자들의 포획 궤도. (b) 테스트 천체 2,500개의 종착 위상 분포 $\\\\mathbf{q}_{\\\\text{orb}}(T)$와 라그랑주 $L_1$ 안장점 영역."
}
\`\`\`

---

### 4.2 리아푸노프 에너지 소산 실증 및 궤도 스텝 $T$ 절제 실험

그림 3(a)는 3,000개 테스트 천체의 리프프로그 적분 스텝 $t = 0 \\dots 14$에 따른 평균 운동 에너지 $K(t)$, 플러머 퍼텐셜 $U(\\mathbf{q}(t))$, 총 해밀토니안 $H(t) = K(t) + U(t)$ 및 사분위수 대역($25\\%\\text{–}75\\%$)을 측정한 결과이다. 정리 1에서 증명한 $\\frac{dH}{dt} = -\\gamma \\|\\mathbf{p}\\|_2^2 \\le 0$ 법칙 그대로, 초기 발사 운동 에너지가 허블 마찰에 의해 단조 소산되면서 총 해밀토니안이 흔들림 없이 감소하여 안정된 우물 바닥 퍼텐셜로 수렴한다.

\`\`\`figure
{
  "columns": 1,
  "panels": [
    {
      "webp": "/assets/gravnet/fig3-lyapunov-dissipation-steps.webp",
      "src": "/assets/gravnet/fig3-lyapunov-dissipation-steps.png",
      "alt": "테스트 천체 3,000개에 대한 리아푸노프 해밀토니안 단조 소산 곡선 및 적분 스텝 수 T에 따른 분류 성능 추이",
      "width": 2200,
      "height": 853
    }
  ],
  "caption": "**Figure 3:** (a) 테스트 천체 3,000개에 대한 리아푸노프 해밀토니안 단조 소산 곡선. (b) 심플렉틱 리프프로그 적분 스텝 수 $T$에 따른 테스트 정확도 및 $\\\\text{Macro-}F_1$ 추이."
}
\`\`\`

그림 3(b) 및 표 2는 적분 스텝 수 $T$에 따른 분류 성능 변화를 정량적으로 보여준다. $T = 0$(우주 원점 대기 상태)에서는 정확도가 다수 클래스 비율인 **59.45%**($\\text{Macro-}F_1$ **0.2485**)에 불과하나, 중력장이 가동되자마자 $T = 1$에서 **70.33%**, $T = 2$에서 **96.92%**, $T = 6\\text{–}12$ 구간에서 **97.55%–97.56%**의 포획 평형에 도달한다.

* **Table 2: 심플렉틱 리프프로그 궤도 적분 스텝 수 $T$에 따른 검증 및 테스트 성능 변화 (단일 우주 Seed 42).**

| 궤도 스텝 $T$ | 0 | 1 | 2 | 3 | 4 | 6 | 8 | **10** | 12 | 16 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Val Acc (%)** | 59.44 | 69.94 | 96.71 | 97.34 | 97.41 | 97.49 | 97.51 | **97.53** | 97.50 | 97.49 |
| **Test Acc (%)** | 59.45 | 70.33 | 96.92 | 97.42 | 97.47 | 97.55 | 97.53 | **97.55** | 97.56 | 97.54 |
| **Test $\\text{Macro-}F_1$** | 0.2485 | 0.5102 | 0.9644 | 0.9701 | 0.9708 | 0.9718 | 0.9715 | **0.9718** | 0.9720 | 0.9717 |

---

### 4.3 라그랑주 $L_1$ 안장점 분석: 모은하 혼입 저적색편이 퀘이사의 물리적 분리

천체역학에서 두 질량체 사이의 중력과 원심력/탄성이 평형을 이루는 불안정 안장점을 **라그랑주 $L_1$ 지점(Lagrange $L_1$ Saddle Point)**이라 부른다. GravNet에서는 종착 위치 $\\mathbf{q}_T$에서 가장 깊은 포획 우물 에너지 $E_{(1)}(\\mathbf{q}_T)$와 차순위 경쟁 우물 에너지 $E_{(2)}(\\mathbf{q}_T)$ 사이의 퍼텐셜 장벽 높이

$$
\\Delta E_{L_1}(\\mathbf{q}_T) \\triangleq E_{(2)}(\\mathbf{q}_T) - E_{(1)}(\\mathbf{q}_T) \\ge 0, \\qquad E_c(\\mathbf{q}_T) = U_c(\\mathbf{q}_T) - \\frac{\\nu_c}{\\beta} \\tag{14}
$$

가 곧 해당 천체가 $L_1$ 경계 능선으로부터 얼마나 안전하게 포획되었는지를 나타내는 물리적 확실성 지표가 된다($\\Delta E_{L_1} \\to 0$일수록 두 은하단 중력이 정확히 비기는 $L_1$ 능선 위에 위치함).

\`\`\`figure
{
  "columns": 1,
  "panels": [
    {
      "webp": "/assets/gravnet/fig4-lagrange-l1-uncertainty.webp",
      "src": "/assets/gravnet/fig4-lagrange-l1-uncertainty.png",
      "alt": "라그랑주 L1 퍼텐셜 장벽 기준 선택적 분류 커버리지 대비 정확도 및 퀘이사 분광 적색편이 분포 비교",
      "width": 2200,
      "height": 836
    }
  ],
  "caption": "**Figure 4:** (a) 라그랑주 $L_1$ 퍼텐셜 장벽 $\\\\Delta E_{L_1}$ 기준 선택적 분류 커버리지 대비 정확도 및 $\\\\text{Macro-}F_1$. (b) 깊은 우물 포획 퀘이사 vs. 라그랑주 $L_1$ 경계 퀘이사의 실제 분광 적색편이($z$) 분포 비교."
}
\`\`\`

그림 4의 결과는 놀라운 물리적 일관성을 보여준다:

* **98.71% vs. 75.50%의 극명한 불확실성 분리**: 테스트 천체 20,000개 중 라그랑주 장벽 $\\Delta E_{L_1}$이 높은 상위 95%(19,000개, 깊은 우물 포획군)에서는 단일 우주 정확도가 **98.71%**($\\text{Macro-}F_1$ **0.9848**)에 달하며, 상위 80% 구간에서는 **99.13%**까지 상승한다. 반면 $L_1$ 능선 근처에 머무른 하위 5%(1,000개)의 정확도는 **75.50%**로, 모델의 오분류 대부분이 물리적 라그랑주 안장점 부근에 집중되어 있음을 입증한다.
* **실제 천체물리 현상과의 부합**: 그림 4(b)에서 깊은 플러머 우물에 포획된 퀘이사들의 중앙 적색편이는 $z_{\\text{median}} = 1.73$(전형적인 고광도 우주론적 퀘이사)인 반면, 라그랑주 $L_1$ 능선에 포획된 모호한 퀘이사들은 중앙 적색편이가 $z_{\\text{median}} = 0.98$로 현저히 낮고 $z < 0.5$ 영역의 비중이 급증한다. 이는 활동은하핵(AGN) 밝기가 약해 주변 모은하(Host Galaxy) 별빛이 측광 필터에 함께 섞여 들어오는 저적색편이 세이퍼트/퀘이사 천체들이 인공 시공간에서도 실제로 ‘은하’와 ‘퀘이사’ 사이의 중력 평형점($L_1$)에 포획되었음을 뜻한다!

---

### 4.4 3대 패러다임 종합 벤치마크 비교 (DL vs. EDL/TWEANN vs. GravNet)

마지막으로 본 프로젝트에서 개발한 세 가지 독립적 신경망 학습 패러다임(\`DL/\` 역전파, \`EDL/\` 위상·가중치 진화, \`GravNet/\` 시공간 중력 동역학)의 성능과 계산 비용을 표 3 및 그림 5에 종합하였다.

\`\`\`figure
{
  "columns": 1,
  "panels": [
    {
      "webp": "/assets/gravnet/fig5-three-paradigm-benchmark.webp",
      "src": "/assets/gravnet/fig5-three-paradigm-benchmark.png",
      "alt": "3대 학습 패러다임별 테스트 정확도 및 학습 소요 시간 비교와 GravNet 3-우주 다중우주 정규화 혼동 행렬",
      "width": 2200,
      "height": 844
    }
  ],
  "caption": "**Figure 5:** (a) 3대 학습 패러다임별 테스트 정확도 및 학습 소요 시간 비교. (b) GravNet 3-우주 다중우주의 20,000개 테스트 천체 정규화 혼동 행렬(\`STAR\` 재현율 **100.00%**)."
}
\`\`\`

* **Table 3: SDSS-17 테스트 세트(20,000건)에 대한 3대 학습 패러다임 최종 종합 벤치마크.**

| 모델 및 패러다임 | 핵심 학습 원리 | Test Acc | $\\text{Macro-}F_1$ | STAR Recall | 학습 시간 | 추론(20k) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **EDL Pure ES (32-16)** | 직교 자연 진화 전략 (무미분) | 96.48% | 0.9599 | 99.63% | 13.55 s | 1.42 ms |
| **DL 단일 MLP (64-32)** | 전역 오차 역전파 (Adam) | 97.37% | 0.9700 | 99.72% | 24.16 s | 2.83 ms |
| **DL 3-Seed MLP 앙상블** | 전역 오차 역전파 3회 결합 | 97.42% | 0.9705 | 99.77% | 72.49 s | 8.49 ms |
| **EDL 단일 챔피언** | Net2Net 위상+가중치 진화 | 97.43% | 0.9706 | 99.79% | 94.22 s$^\\dagger$ | 7.08 ms |
| **EDL 상위 4섬 앙상블** | 이종 진화 위상 결합 (TWEANN) | 97.45% | 0.9709 | 99.84% | 94.22 s | 27.26 ms |
| **GravNet 단일 우주** | **플러머 중력 + 무-BPTT 조석력** | **97.55%** | **0.9718** | **99.93%** | **40.69 s$^\\ddagger$** | **652.52 ms** |
| **GravNet 3-우주 다중우주** | **3개 독립 중력 우주 볼츠만 평균** | **97.59%** | **0.9724** | **100.00%** | **119.83 s** | **1967.45 ms** |
| *DL 이종 트리 결합 참고선* | *MLP×3 + XGBoost + HistGB* | *97.88%* | *0.9755* | *99.91%* | *81.35 s* | *121.86 ms* |

> $^\\dagger$ 8개 섬 순차 총합 시간(섬 1개당 평균 11.78초). $^\\ddagger$ 1단계 원시 헤일로 응축 및 숄레스키 발사 보정 단독 수행 시 **7.45초** 만에 검증 정확도 97.45% 달성.

벤치마크에서 주목할 핵심 성과는 세 가지이다:

1. **비트리(Non-Tree) 순수 신경/동역학 모델 중 최고 정확도 달성**: GravNet 단일 우주(**97.55%**)만으로도 역전파 3-Seed MLP 앙상블(**97.42%**)과 8개 섬에서 진화한 TWEANN 상위 4섬 앙상블(**97.45%**)을 모두 능가하며, 3-우주 다중우주(**97.59%**, $\\text{Macro-}F_1$ **0.9724**)는 결정 트리 부스팅(XGBoost/HistGB)을 제외한 모든 연속 표현 모델 중 가장 높은 성능을 기록하였다.
2. **항성(STAR) 4,319개 전수 포획 (100.00% Recall)**: 그림 5(b)의 혼동 행렬에서 확인되듯, 테스트 세트의 실제 항성 4,319개 중 은하나 퀘이사로 잘못 빠진 개체가 단 **0건(4,319/4,319 정분류)**이다. 도플러 주파수 격자가 $z \\approx 0$ 고유운동 영역을 예리하게 분리한 뒤 항성 초은하단 우물이 이를 완벽히 포획한 결과이다.
3. **추론 연산 구조의 투명한 트레이드오프**: GravNet은 매 추론 시 20,000개 입자에 대해 18개 중력원과의 6차원 거리 세제곱 역수($r^{-3}$) 계산을 10스텝 반복(총 360만 회 이체 중력 상호작용)하므로 순수 CPU \`float64\` 기준 $652.5\\,\\text{ms}$(천체 1개당 $0.033\\,\\text{ms}$, 초당 약 30,600천체 처리)가 소요된다. 이는 2층 행렬곱만 수행하는 정적 MLP($2.83\\,\\text{ms}$)보다는 계산량이 많지만, 그 대가로 **실제 위상 궤적 시각화, 리아푸노프 안정성 보장, 라그랑주 $L_1$ 불확실성 정량화**라는 정적 신경망이 줄 수 없는 물리적 해석력을 제공한다.`,
      },
      {
        id: '5-모델의-이상화-가정-한계점-및-향후-연구-방향',
        title: '5. 모델의 이상화 가정, 한계점 및 향후 연구 방향',
        level: 1,
        content: `과학적 모델링의 엄밀성을 위해 본 GravNet이 채택한 물리적 이상화 가정(Idealizations)과 한계 영역을 명확히 밝힌다:

* **시험 입자 근사(Test-Particle Approximation)**: 현재 모델에서 관측 천체들은 고정된 18개 거대 플러머 헤일로가 만든 배경 중력장 속을 유영하는 질량 $m \\to 0$ 시험 입자로 취급되며, 추론 배치 내부의 천체 입자끼리는 서로 중력을 행사하지 않는다($\\mathcal{O}(N \\cdot CK)$ 복잡도 유지). 만약 준지도 학습(Semi-Supervised Transductive Learning) 환경에서 미분류 천체 무리끼리의 자체 중력 응집(Self-Gravity, $\\mathcal{O}(N \\log N)$ Barnes-Hut 트리 근사)까지 허용한다면 희소 밀도 영역의 경계 판별력이 더욱 향상될 수 있다.
* **고차원 탭 데이터에서의 기저 확장성**: 현재 분광 렌즈는 $d_{\\text{in}} = 10$ 천체물리 변수에 최적화된 2차 교차항과 다중 해상도 푸리에 모드를 사용한다. 수백 차원 이상의 원시 분광 스펙트럼(SDSS 4,000개 파장 채널 전체)으로 확장할 때에는 무작위 기저 대신 파장 국소 합성곱 또는 복소 파동 간섭망(\`QWIN\`, \`docs/proposed_novel_models.md\` 참조)을 전면부 광학계로 결합하는 후속 연구가 유망하다.

---

### 재현성 안내 (Reproducibility)

본 보고서의 모든 실험 코드, 기호 검증 스크립트, 모델 체크포인트 및 시각화 생성기는 저장소의 \`GravNet/\` 디렉토리에 수록되어 있다. 제안된 전체 9종 대안 학습 패러다임 설계서는 \`docs/proposed_novel_models.md\`에 기록되어 있으며, 아래 명령으로 모든 실험을 재현할 수 있다:

\`\`\`bash
conda activate dl_env && python GravNet/physics_model.py && python GravNet/train_gravnet.py
\`\`\``,
      },
    ],
    references: [
      {
        id: 'ref-gravnet-1',
        label: '[1]',
        authors: 'Plummer, H. C.',
        year: 1911,
        title: 'On the problem of distribution in globular star clusters',
        venue: 'Monthly Notices of the Royal Astronomical Society (MNRAS), 71(5), 460–470',
      },
      {
        id: 'ref-gravnet-2',
        label: '[2]',
        authors: 'Rahimi, A., & Recht, B.',
        year: 2007,
        title: 'Random features for large-scale kernel machines',
        venue: 'Advances in Neural Information Processing Systems (NeurIPS), 20',
      },
      {
        id: 'ref-gravnet-3',
        label: '[3]',
        authors: 'LaSalle, J. P.',
        year: 1960,
        title: "Some extensions of Liapunov's second method",
        venue: 'IRE Transactions on Circuit Theory, 7(4), 520–527',
      },
      {
        id: 'ref-gravnet-4',
        label: '[4]',
        authors: "Abdurro'uf, et al.",
        year: 2022,
        title: 'The Seventeenth Data Release of the Sloan Digital Sky Survey: Complete Release of MaNGA, MaStar, and APOGEE-2 Data',
        venue: 'The Astrophysical Journal Supplement Series (ApJS), 259(2), 35',
      },
    ],
  },
  {
    id: 'stellar-classification-dl-vs-tweann',
    slug: 'stellar-classification-dl-vs-evolutionary-neural-networks',
    type: 'paper',
    title: '밤하늘의 10만 개 빛을 분류하는 두 가지 인공지능 이야기',
    subtitle: '정통 딥러닝(DL)부터 스스로 뇌 구조를 진화시키는 신경망(EDL/TWEANN)까지',
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: '이인수', affiliation: 'Obtec Research', role: 'Author' },
    ],
    publishedDate: '2026.11.07',
    journalOrConference: 'Obtec Research · Astroinformatics & Neuroevolution',
    doi: '10.48550/OBTEC.2026.1107',
    category: '컴퓨터 과학',
    tags: [
      '천체물리학',
      'SDSS-17',
      '딥러닝',
      '진화 신경망',
      'TWEANN',
      'Neuroevolution',
    ],
    readTimeMinutes: 14,
    citationCount: 0,
    viewsCount: 1,
    downloadCount: 0,
    featured: false,
    abstract: `> *"멀리서 반짝이는 저 작은 빛은 우리 은하 안의 **별(Star)**일까, 수억 개의 별이 모인 외부 **은하(Galaxy)**일까, 아니면 초기 우주의 초대질량 블랙홀이 뿜어내는 **퀘이사(Quasar)**일까?"*

* **저자**: 이인수
* **데이터셋**: SDSS-17 (100,000 천체 관측 기록)
* **분야**: Astroinformatics & Neuroevolution (천체정보학 및 진화 신경망)
* **작성일**: 2026년 11월

---

본 리서치 블로그는 슬론 디지털 전천 탐사(**SDSS-17**)가 관측한 **100,000개의 천체 데이터**를 바탕으로, 천체를 $97.4\\% \\sim 97.9\\%$의 높은 정확도로 분류해 내는 두 가지 상반된 인공지능 패러다임의 연구 여정을 일반 독자의 눈높이에서 소개합니다.

1. **정통 딥러닝과 이종 앙상블 (\`DL/\`)**: 천문학적 도메인 지식(색지수와 적색편이)을 바탕으로 정교하게 다듬은 역전파 다층 신경망(**97.37%**)과 그래디언트 부스팅 트리 결합(**97.88%**)의 여정
2. **스스로 뇌 구조와 가중치를 진화시키는 진화 신경망 (\`EDL/\`)**: 미분 공식 대신 생물학적 진화 원리(돌연변이·교배·적자생존)를 통해 **인간이 설계하지 않은 3층 스킵 연결 신경망 구조를 스스로 발명**하며 기존 딥러닝 단일 모델을 뛰어넘기(**97.45%**)까지의 탐구 기록`,
    keyContributions: [
      'SDSS-17 10만 개 관측치에서 통계적 이상치(1.5×IQR)로 지목된 적색편이 극단값 8,990개 중 99.6%(8,956개)가 초기 우주 퀘이사(QSO)임을 규명하고, 색지수 4종(u-g, g-r, r-i, i-z)을 결합한 10차원 물리 특성 공간 구축',
      '정통 역전파 MLP(64, 32) 단일 모델(97.37%)의 오분류 522건 중 75.3%가 모은하 별빛이 섞이는 저적색편이 퀘이사(중앙값 z = 0.588) 경계에서 발생함을 규명하고, MLP×3 + XGBoost + HistGB 이종 앙상블로 정확도 97.88%(Macro-F1 0.9755) 달성',
      '함수 보존형 Net2Net 구조 변이와 다중 섬 라마르크·결정 경계 ES를 결합한 TWEANN으로 3층 스킵 신경망(10 -> [104:gelu] -> [48:gelu] -> [48+skip:silu] -> 3)을 자율 발명하여, 섬당 11.78초 학습·2만 건 7.08 ms 추론 속도와 함께 테스트 정확도 97.45%(단일 챔피언 97.43%)로 고정 설계 DL 단일 모델을 추월',
    ],
    pdfDownloadName: 'research_blog_stellar_classification.pdf',
    pdfUrl: '/papers/research_blog_stellar_classification.pdf',
    bibtex: `@article{lee2026stellar,
  title={밤하늘의 10만 개 빛을 분류하는 두 가지 인공지능 이야기: 정통 딥러닝(DL)부터 스스로 뇌 구조를 진화시키는 신경망(EDL/TWEANN)까지},
  author={Lee, Insoo},
  journal={Obtec Research Publications},
  year={2026},
  month={11}
}`,
    apaCitation: '이인수. (2026). 밤하늘의 10만 개 빛을 분류하는 두 가지 인공지능 이야기: 정통 딥러닝(DL)부터 스스로 뇌 구조를 진화시키는 신경망(EDL/TWEANN)까지. Obtec Research.',
    sections: [
      {
        id: '1-프롤로그-밤하늘의-점-10만-개를-구분하는-법',
        title: '1. 프롤로그: 밤하늘의 점 10만 개를 구분하는 법',
        level: 1,
        content: `망원경으로 밤하늘을 촬영하면 수없이 많은 빛의 점들이 찍힙니다. 맨눈이나 단순한 흑백 사진만으로는 그 빛이 우리 은하 내부의 가까운 **별(STAR)**인지, 아득한 우주 너머 수천억 개의 별이 모인 **은하(GALAXY)**인지, 혹은 초기 우주의 중심 블랙홀이 은하 전체보다 밝게 빛나는 **퀘이사(QSO, Quasar)**인지 구별하기 어렵습니다.

우리가 분석한 **SDSS-17 (Sloan Digital Sky Survey Data Release 17)** 데이터셋에는 총 **100,000개**의 실제 천체 관측 기록이 담겨 있습니다.

| 천체 종류 (Class) | 데이터 수 | 비중 | 천체물리학적 정체 및 관측 특징 |
| :--- | :---: | :---: | :--- |
| **은하 (GALAXY)** | 59,445개 | **59.4%** | 수억~수조 개의 항성과 성운이 중력으로 묶인 거대 천체 집단 |
| **별 (STAR)** | 21,594개 | **21.6%** | 우리 은하 내부에서 핵융합으로 스스로 빛을 내는 항성 (지구와 매우 가까움) |
| **퀘이사 (QSO)** | 18,961개 | **19.0%** | 초기 우주의 초대질량 블랙홀 주변 강착원반에서 뿜어져 나오는 극도로 밝은 활동성 은하핵 |

천문학자들은 이 천체들의 정체를 밝히기 위해 크게 두 가지 물리량을 측정합니다.

* **5가지 색상 필터를 통과한 밝기 (측광 등급, $u, g, r, i, z$)**: 자외선($u$), 초록빛($g$), 붉은빛($r$), 근적외선($i, z$) 5개 파장 대역에서 천체의 겉보기 등급을 측정합니다. (등급 숫자가 작을수록 밝고, 숫자가 클수록 어두운 천체입니다.)
* **분광 적색편이 (Redshift, $z_{\\text{spec}}$)**: 우주는 팽창하고 있기 때문에 지구에서 멀리 떨어진 천체일수록 그 천체가 방출한 빛의 파장이 길어지며 붉은색 쪽으로 치우칩니다. 즉, **적색편이(\`redshift\`)는 천체가 지구로부터 얼마나 먼 우주에 있는지를 알려주는 '우주 거리계'**입니다.`,
      },
      {
        id: '2-데이터-탐험-이상치outlier인-줄-알았는데-보물이었다',
        title: '2. 데이터 탐험: “이상치(Outlier)인 줄 알았는데 보물이었다!”',
        level: 1,
        content: `데이터 과학의 첫걸음은 결측치와 이상치(Outlier)를 점검하는 일입니다. 10만 개 행을 전수 검사한 결과, 딱 한 행(79,543번째 관측치)에 센서 결측 센티널 값(\`-9999\`)이 기록되어 있어 이를 제거하고 **99,999개**의 깨끗한 천체 데이터를 확보했습니다.

그런데 표준 통계 기법($1.5 \\times \\text{IQR}$ 사분위수 범위 규칙)으로 이상치를 탐지하자 놀라운 현상이 발견되었습니다. **\`redshift\`(적색편이) 변수에서 무려 8,990개(전체의 9.0%)가 '통계적 이상치'로 지목된 것**입니다.

> [!WARNING] 초보 데이터 분석가가 빠지기 쉬운 함정
> 교과서적인 전처리 규칙만 기계적으로 적용해 *"박스플롯 바깥에 찍힌 8,990개의 이상치를 노이즈로 보고 삭제하자!"*라고 결정했다면 어떻게 되었을까요? 아래 교차 분석 결과가 그 해답을 보여줍니다.

우리는 이상치를 지우는 대신, 이상치로 분류된 8,990개의 천체가 실제로 어떤 클래스에 속하는지 역추적했습니다.

\`\`\`figure
{
  "columns": 2,
  "panels": [
    {
      "webp": "/assets/stellar-classification/fig1a-redshift-by-class.webp",
      "src": "/assets/stellar-classification/fig1a-redshift-by-class.png",
      "alt": "클래스별 적색편이(redshift) 박스플롯 분포",
      "width": 1200,
      "height": 750,
      "subcaption": "(a) 클래스별 적색편이(redshift) 분포"
    },
    {
      "webp": "/assets/stellar-classification/fig1b-color-index-distributions.webp",
      "src": "/assets/stellar-classification/fig1b-color-index-distributions.png",
      "alt": "파생 색지수(u-g, g-r, r-i, i-z) 클래스별 밀도 분포",
      "width": 1920,
      "height": 540,
      "subcaption": "(b) 파생 색지수($u-g, g-r, r-i, i-z$) 밀도 분포"
    }
  ],
  "caption": "**Figure 1:** 천체물리학적 도메인 지식이 드러나는 핵심 분포. 적색편이의 긴 꼬리는 퀘이사(QSO)의 고유 신호이며, 인접 필터 간 밝기 차이인 색지수(Color Index)는 세 천체의 온도 차이를 선명하게 분리합니다."
}
\`\`\`

결과는 극적이었습니다(그림 1a):

* **\`redshift\` 이상치로 지목된 8,990개 중 무려 99.6%(8,956개)가 퀘이사(QSO)였습니다!**
* 우리 은하 내부의 **별(STAR)**은 거리가 매우 가까워 $\\text{redshift} \\approx 0$에 모여 있고, 일반 **은하(GALAXY)**는 중앙값 $0.42$ 부근에 분포하는 반면, 초기 우주 끝에 자리한 **퀘이사(QSO)**는 적색편이가 $1.6$에서 최대 $7.01$까지 길게 뻗어 있었던 것입니다.
* 즉, 통계적으로는 '극단값'처럼 보였지만 실제로는 **"이 천체는 거의 확실히 퀘이사다!"라고 알려주는 결정적 보물 신호**였습니다. 우리는 이를 보존하되, 긴 우측 꼬리를 신경망이 안정적으로 학습하도록 $\\log(1 + \\text{redshift})$ 변환을 적용했습니다.

### 2.1 천체의 '표면 온도'를 읽어내는 마법의 파생 변수: 색지수 (Color Index)

여기에 천문학 도메인 지식을 하나 더 접목했습니다. 인접한 두 필터의 등급 차이인 **색지수(Color Index) 4종**($u-g,\\; g-r,\\; r-i,\\; i-z$)을 추가한 것입니다. 등급(Magnitude)은 로그 스케일이므로, 두 등급의 뺄셈은 곧 **두 파장 대역의 빛의 세기 비율(플럭스 비)**이 되어 거리와 무관하게 천체의 고유 색깔과 온도를 나타냅니다(그림 1b):

* **퀘이사 (QSO)**: 블랙홀 강착원반의 초고온 자외선 방출로 인해 $u - g$ 중앙값이 $0.393$으로 가장 푸릅니다.
* **은하 (GALAXY)**: 적색 거성들의 빛과 적색편이가 겹쳐 $u - g \\approx 1.640$, $g - r \\approx 1.404$로 가장 붉습니다.
* **별 (STAR)**: $g - r \\approx 0.527$로 은하와 퀘이사의 사이 대역에 날카롭게 자리 잡습니다.

이렇게 정제된 **10차원 입력 벡터**($u, g, r, i, z, \\text{redshift}$ + 색지수 4종)가 정통 딥러닝(\`DL/\`)과 진화 신경망(\`EDL/\`) 두 모델의 공정한 공통 출발선이 되었습니다.`,
      },
      {
        id: '3-첫-번째-길-정통-딥러닝dl-작지만-강한-신경망과-물리적-한계',
        title: '3. 첫 번째 길 — 정통 딥러닝(DL): 작지만 강한 신경망과 물리적 한계',
        level: 1,
        content: `첫 번째 연구 트랙(\`DL/\`)에서는 현대 딥러닝의 표준인 **오차 역전파(Backpropagation)와 Adam 경사하강법**으로 다층 퍼셉트론(MLP)을 구축했습니다.

### 3.1 “신경망을 무조건 깊게 쌓으면 더 똑똑해질까?”

흔히 딥러닝이라고 하면 수십 층의 거대한 네트워크를 떠올리지만, 10개의 물리량으로 구성된 정형 데이터에서도 깊은 신경망이 유리할까요? 은닉층 0개(선형 로지스틱 회귀)부터 3개 층까지 체계적인 깊이 실험을 수행했습니다(그림 2a).

\`\`\`figure
{
  "columns": 2,
  "panels": [
    {
      "webp": "/assets/stellar-classification/fig2a-hidden-layer-depth.webp",
      "src": "/assets/stellar-classification/fig2a-hidden-layer-depth.png",
      "alt": "은닉층 깊이(0층~3층)에 따른 검증 Macro-F1 비교",
      "width": 1050,
      "height": 540,
      "subcaption": "(a) 은닉층 깊이(0층~3층)에 따른 검증 성능"
    },
    {
      "webp": "/assets/stellar-classification/fig2b-mlp-ablation.webp",
      "src": "/assets/stellar-classification/fig2b-mlp-ablation.png",
      "alt": "PyTorch MLP (64, 32) 클래스 가중치 및 색지수 절제 실험",
      "width": 1050,
      "height": 540,
      "subcaption": "(b) PyTorch MLP 절제 실험 (가중치 vs. 색지수)"
    }
  ],
  "caption": "**Figure 2:** 정통 딥러닝(DL) 아키텍처 탐색. 선형 모델(0층) 대비 비선형 은닉층 도입 시 큰 성능 도약이 일어나며, 2층 구조 \`(64, 32)\`에 색지수 4종을 결합했을 때 가장 안정적인 성능을 달성합니다."
}
\`\`\`

실험 결과, 0층 선형 모델(Macro-F1 $0.9531$)에서 1층 비선형 신경망($0.9660$)으로 갈 때 $+1.3\\%\\text{p}$가 도약하고 **2층 \`(64, 32)\` 구조($0.9681$)**에서 정점을 찍은 뒤, 3층 \`(64, 32, 16)\`($0.9675$)에서는 오히려 소폭 하락했습니다. 여기에 색지수 특성 4개를 추가한 PyTorch 단일 MLP 모델은 20,000건 테스트 세트에서 **정확도 97.37%, Macro-F1 0.9700**을 달성했습니다(그림 2b).

### 3.2 “왜 정확도 99%는 불가능할까?” — 오분류 522건의 천체물리학적 해부

20,000개의 테스트 천체 가운데 단일 딥러닝 모델이 틀린 **522건(2.61%)**을 정밀 추적한 결과, 인공지능의 실수 뒤에는 뚜렷한 **천체물리학적 한계**가 숨어 있었습니다(그림 3a).

\`\`\`figure
{
  "columns": 2,
  "panels": [
    {
      "webp": "/assets/stellar-classification/fig3a-error-analysis.webp",
      "src": "/assets/stellar-classification/fig3a-error-analysis.png",
      "alt": "테스트 오분류 522건의 혼동 행렬 및 적색편이·밝기 분포",
      "width": 1650,
      "height": 1275,
      "subcaption": "(a) 테스트 오분류 522건의 적색편이 및 밝기 분포"
    },
    {
      "webp": "/assets/stellar-classification/fig3b-ensemble-comparison.webp",
      "src": "/assets/stellar-classification/fig3b-ensemble-comparison.png",
      "alt": "MLP와 GBDT(XGBoost, HistGB) 소프트 보팅 이종 앙상블 성능 비교",
      "width": 1050,
      "height": 570,
      "subcaption": "(b) MLP + GBDT 이종 소프트 보팅 앙상블"
    }
  ],
  "caption": "**Figure 3:** 오류 원인의 천체물리학적 규명과 이종 앙상블 결합. 오분류의 75.3%는 모은하의 별빛이 함께 섞여 관측되는 '저적색편이 퀘이사'와 어두운 은하의 경계에서 발생합니다."
}
\`\`\`

* **전체 오류의 75.3%가 은하(\`GALAXY\`) ↔ 퀘이사(\`QSO\`) 혼동**: 별(\`STAR\`)은 $99.5\\%$ 이상 완벽히 구분되는 반면, 은하와 퀘이사 경계에 오류가 집중되었습니다.
* **저적색편이 퀘이사(Low-redshift QSO)와 모은하의 빛 중첩**: 은하로 오분류된 퀘이사의 적색편이 중앙값은 $0.588$로, 정상 분류된 퀘이사($1.711$)보다 지구에 훨씬 가까웠습니다. 가까운 퀘이사는 중심 블랙홀을 감싸고 있는 **모은하(Host Galaxy)의 별빛이 망원경에 함께 섞여 들어오기 때문에** 측광 색상만으로는 일반 은하와 물리적으로 스펙트럼이 겹칩니다.
* **이종 앙상블을 통한 극한 최적화**: 신경망(\`MLP×3\`)에 정형 데이터의 강자인 그래디언트 부스팅 트리(\`XGBoost + HistGB\`)를 소프트 보팅으로 결합하여, 물리적 경계선에서 달성 가능한 최고 수준인 **테스트 정확도 97.88%, Macro-F1 0.9755**를 기록했습니다(그림 3b).`,
      },
      {
        id: '4-두-번째-길-진화-신경망edl-미분-대신-생물학적-진화로-학습하다',
        title: '4. 두 번째 길 — 진화 신경망(EDL): 미분 대신 ‘생물학적 진화’로 학습하다',
        level: 1,
        content: `정통 딥러닝 파이프라인을 완성한 뒤, 우리는 근본적이고도 흥미로운 과학적 질문을 던졌습니다.

> [!IMPORTANT] 연구의 핵심 질문: 미분과 인간 설계 없이 진화만으로 학습할 수 있을까?
> *"오차 역전파(미분) 없이 다윈의 생물학적 진화 원리(돌연변이·교배·자연선택)만으로 신경망을 학습시킬 수 있을까? 더 나아가, 인간이 \`(64, 32)\`라는 뇌 구조를 정해주지 않아도 **신경망 스스로 자신의 뇌 구조(층수, 뉴런 수, 활성화 함수, 직통 연결)를 진화시켜 기존 딥러닝 모델을 뛰어넘을 수 있을까?**"*

이 질문에서 탄생한 두 번째 트랙이 바로 **\`EDL/\` (Evolutionary Deep Learning)**입니다. 일반 독자를 위해 두 학습 방식의 차이를 그림 4로 도식화했습니다.

\`\`\`mermaid
flowchart LR
    %% Backpropagation vs TWEANN Paradigm Comparison
\`\`\`
`,
      },
      {
        id: '5-시행착오와-돌파구-왜-초기-진화-신경망은-딥러닝보다-낮았을까',
        title: '5. 시행착오와 돌파구: 왜 초기 진화 신경망은 딥러닝보다 낮았을까?',
        level: 1,
        content: `### 5.1 1차 시도: 순수 무미분 진화 전략 (Pure ES) — 13.5초의 쾌속 수렴과 96.48%의 벽

첫 실험에서는 역전파를 전혀 사용하지 않는 **자연 진화 전략(Natural Evolution Strategy, OpenAI-ES)**을 구현했습니다. 중심 가중치 벡터 $\\boldsymbol{\\mu} \\in \\mathbb{R}^D$ 주변에 대칭 가우시안 섭동 $\\boldsymbol{\\theta}_i^{\\pm} = \\boldsymbol{\\mu} \\pm \\sigma \\boldsymbol{\\epsilon}_i$를 뿌리고, 순위 정규화 적합도 $R_i$로 의사 기울기(Pseudo-gradient)를 추정해 갱신하는 방식입니다:

$$\\nabla_{\\boldsymbol{\\mu}} \\mathbb{E}\\big[F(\\boldsymbol{\\theta})\\big] \\approx \\frac{1}{2 P \\sigma} \\sum_{i=1}^{P} \\left(R_i^{+} - R_i^{-}\\right) \\boldsymbol{\\epsilon}_i \\qquad (1)$$

놀랍게도 미분을 단 한 번도 쓰지 않고 **단 13.55초(190세대) 만에 테스트 정확도 96.48% (Macro-F1 0.9599)**에 도달했습니다! 하지만 정통 딥러닝 단일 MLP($97.37\\%$)와는 약 **0.89%p의 성능 격차**가 있었습니다. 세대를 300세대로 늘려도 $96.5\\%$ 부근에서 성장이 멈추었습니다.

### 5.2 원인 진단: 왜 순수 무작위 진화는 96.5%에서 멈추었을까?

정밀 진단을 통해 순수 0차 진화 탐색이 겪는 세 가지 수학적 병목을 규명했습니다:

1. **고차원 '눈 감고 다이얼 맞추기'의 분산 한계 ($\\mathrm{Var}[\\hat{\\mathbf{g}}] = \\mathcal{O}(D/P)$)**: 신경망 가중치 개수 $D$가 수천 개일 때 세대당 $P = 80$개 개체(40개 대칭 방향)만 무작위로 찔러보면, 추정 기울기의 분산이 $\\mathcal{O}(D/P)$로 커집니다. 큰 줄기(별 vs. 은하)는 순식간에 맞추지만, **저적색편이 퀘이사와 은하가 미세하게 겹치는 비선형 협곡**을 정교하게 깎아내는 국소 탐색 해상도가 부족했습니다.
2. **계단형 점수판(이산 Macro-F1)의 평탄면 문제**: 이산 Macro-F1은 최종 예측 클래스($\\arg\\max$)가 뒤집히지 않으면 가중치가 조금 좋아져도 점수 변화가 $\\Delta F = 0$이 되어 진화 방향 신호가 사라집니다.
3. **불균형 클래스 결정 경계 조율 유전자의 부재**: 은하($59.4\\%$)와 퀘이사($19.0\\%$)의 표본 수 불균형 속에서 Macro-F1을 극대화하려면 출력층의 클래스별 결정 문턱값을 세밀하게 이동시키는 전용 유전자가 필요했습니다.

### 5.3 1차 돌파: 다중 섬 라마르크 진화 + 결정 경계 유전자 ES ($96.48\\% \\to 97.38\\%$)

이 한계를 돌파하기 위해 생물학의 **라마르크 진화(후천적 학습의 유전)**와 **갈라파고스 다중 섬 모델(Island Model)**을 결합한 **Memetic 진화 알고리즘**을 도입했습니다. 고차원 가중치의 미세 곡률은 라마르크 국소 학습으로 빠르게 다듬고, 출력층에 부여한 **6개의 결정 경계 유전자**($\\mathbf{s} \\odot \\mathbf{z} + \\mathbf{b},\\; \\mathbf{s}, \\mathbf{b} \\in \\mathbb{R}^3$)를 무미분 진화 전략(ES)으로 직접 진화시켰습니다. 그 결과 동일 \`(64, 32)\` 구조에서 **테스트 정확도 97.38% (Macro-F1 0.9700)**를 기록하며 역전파 딥러닝 단일 MLP($97.37\\%$)를 따라잡는 데 성공했습니다!`,
      },
      {
        id: '6-궁극의-진화-뇌-구조topology-자체를-스스로-진화시키다-tweann',
        title: '6. 궁극의 진화 — 뇌 구조(Topology) 자체를 스스로 진화시키다 (TWEANN)',
        level: 1,
        content: `여기서 우리는 마지막 도전에 나섰습니다. 고정된 \`(64, 32)\` 골격을 버리고, **신경망의 구조(은닉층 깊이, 층별 뉴런 폭, 활성화 함수, 입력 직통 스킵 연결, 시냅스 희소성) 자체를 유전체(\`TopologyGenome\`)로 인코딩**하여 가중치와 동시에 진화시키는 **TWEANN (Topology & Weight Evolving Artificial Neural Network)**을 구축한 것입니다.

$$\\mathcal{G}_{\\text{topo}} = \\Big(\\underbrace{(d_1, \\dots, d_L)}_{\\text{가변 층 깊이 및 뉴런 폭}},\\; \\underbrace{(\\phi_1, \\dots, \\phi_L)}_{\\text{층별 활성화 함수}},\\; \\underbrace{(\\kappa_1, \\dots, \\kappa_L)}_{\\text{원본 입력 직결 스킵 유전자}}\\Big) \\qquad (2)$$

### 6.1 뇌 수술 후 기억 상실을 막는 비결: 함수 보존형 Net2Net 구조 변이

진화 도중 신경망에 무작위 가중치를 가진 뉴런이나 새로운 은닉층을 갑자기 끼워 넣으면, 기존에 수십 세대 동안 학습해 둔 표현이 깨져 **'기억 상실(Catastrophic Forgetting)'**이 발생하고 새 구조가 즉시 도태됩니다. 이를 막기 위해 **"뇌 구조는 바꾸되 수술 직후의 예측 함수는 그대로 보존하는"** 6가지 구조 진화 연산자와 **종 분화 보호(Speciation Protection)** 메커니즘을 구현했습니다(그림 5).

\`\`\`mermaid
flowchart TD
    %% Net2Wider & Speciation Protection Operators
\`\`\`

### 6.2 실제 45세대 진화 다큐멘터리: 챔피언 신경망(Island 4)의 탄생 일지

8개의 갈라파고스 섬(Island $0 \\sim 7$)에 서로 다른 작은 초기 구조를 심고 45세대 동안 진화시킨 결과, 생태계 전체에서 **총 36번의 성공적인 뇌 구조 변이**가 채택되었습니다. 그중 전체 챔피언에 등극한 **4번 섬(Island 4)**의 실제 진화 연대기는 표 2와 같습니다.

| 세대 | 채택된 구조 변이 연산 | 진화된 신경망 구조 (Topology) | 검증 Macro-F1 |
| :--- | :--- | :--- | :--- |
| \`Gen 0\` | 초기 씨앗 (2층, 4,249 params) | \`10 -> [80:gelu] -> [40:gelu] -> 3\` | 출발점 |
| \`Gen 1\` | 1층 뉴런 +16 확장 (\`widen\`) | \`10 -> [96:gelu] -> [40:gelu] -> 3\` | 0.9267 → **0.9368** |
| \`Gen 4\` | 2층 뉴런 +8 확장 (\`widen\`) | \`10 -> [96:gelu] -> [48:gelu] -> 3\` | 0.9588 → **0.9607** |
| \`Gen 19\` | 미세 시냅스 4% 소거 (\`prune\`) | \`10 -> [96:gelu] -> [48:gelu] -> 3\` (희소화) | 0.9657 → **0.9679** |
| **\`Gen 28\`** | **3번째 은닉층 자가 증식 (\`add_layer\`)** | \`10 -> [96:gelu] -> [48:gelu] -> [48:silu] -> 3\` | 0.9690 → **0.9692** |
| \`Gen 34\` | 1층 뉴런 104개로 확장 (\`widen\`) | \`10 -> [104:gelu] -> [48:gelu] -> [48:silu] -> 3\` | 0.9687 → **0.9700** |
| **\`Gen 43\`** | **3층에 입력 직통 스킵 장착 (\`+skip\`)** | \`10 -> [104:gelu] -> [48:gelu] -> [48+skip:silu] -> 3\` | 0.9706 → **0.9713** |

> [!TIP] 놀라운 발견: 인간이 실패했던 ‘3층 구조’를 진화 신경망은 어떻게 성공시켰을까?
> 앞서 3절에서 인간 연구자가 단순 3층 구조 \`(64, 32, 16)\`을 실험했을 때는 2층 구조보다 오히려 성능이 하락했었습니다. 그런데 **진화 신경망(Island 4)**은 어떻게 3층으로 진화해서 더 높은 성적을 거두었을까요?
>
> 비결은 바로 **Gen 28과 Gen 43의 조합**에 있습니다. AI는 1·2층에 매끄러운 \`GELU\` 함수를 배치하고 3번째 층에 \`SiLU\` 함수를 신설한 뒤, **3번째 깊은 층에 원본 10차원 천체 데이터(적색편이와 색지수)를 직접 재주입하는 스킵 고속도로(\`[48+skip:silu]\`)를 스스로 연결**했습니다! 깊은 층의 고차원 비선형 추상화 능력과 원본 물리량의 날카로운 판별력을 동시에 살리는 설계를 진화가 스스로 발명해 낸 것입니다.

\`\`\`figure
{
  "columns": 1,
  "panels": [
    {
      "webp": "/assets/stellar-classification/fig6-tweann-convergence.webp",
      "src": "/assets/stellar-classification/fig6-tweann-convergence.png",
      "alt": "TWEANN 45세대 적합도 수렴 곡선 및 챔피언 파라미터 수 진화 추이",
      "width": 2550,
      "height": 2040
    }
  ],
  "caption": "**Figure 6:** TWEANN의 45세대 적합도 수렴 곡선(상단) 및 챔피언 신경망의 파라미터 복잡도 진화 추이(하단). 초기 4,249개 파라미터에서 출발한 신경망이 세대가 거듭됨에 따라 뉴런 확장과 은닉층 증식을 통해 9,169개 파라미터의 최적 위상으로 성장합니다."
}
\`\`\`

### 6.3 8개의 섬에서 진화한 8종의 이종 뇌 구조와 최종 테스트 성능

45세대 진화 종료 시점에 8개의 섬은 표 3처럼 2층, 3층, 4층, 스킵 연결 등이 다채롭게 분화된 **8가지 고유한 신경망 종(Species)**으로 진화했습니다.

| 섬 (Island) | 최종 진화된 챔피언 신경망 구조 (TWEANN) | 파라미터 | Test Acc | Test F1 |
| :--- | :--- | :---: | :---: | :---: |
| Island 0 | \`10 -> [64:relu] -> [24:relu] -> 3\` (2층 경량형) | 2,345 | 97.20% | 0.9681 |
| Island 1 | \`10 -> [64:relu] -> [32:elu] -> [32:gelu] -> 3\` (3층 진화) | 3,945 | 97.36% | 0.9697 |
| Island 2 | \`10 -> [64:relu] -> [40+skip:silu] -> 3\` (2층+Skip) | 3,833 | 97.28% | 0.9691 |
| Island 3 | \`10 -> [80:silu] -> [32:gelu] -> [32:gelu] -> [32:relu] -> 3\` (4층 심층형) | 5,689 | 97.35% | 0.9697 |
| **Island 4 (챔피언)** | \`10 -> [104:gelu] -> [48:gelu] -> [48+skip:silu] -> 3\` | **9,169** | **97.43%** | **0.9706** |
| Island 5 | \`10 -> [80:relu] -> [48+skip:gelu] -> [24:elu] -> 3\` (3층+Skip) | 6,505 | 97.41% | 0.9704 |
| Island 6 | \`10 -> [72:elu] -> [44+skip:gelu] -> 3\` (2층+Skip) | 4,585 | 97.32% | 0.9695 |
| Island 7 | \`10 -> [64:silu] -> [60:silu] -> 3\` (2층 확장형) | 4,793 | 97.23% | 0.9685 |
| **이종 위상 앙상블** | **상위 4개 진화 섬(Island 4, 5, 6, 3) 적합도 가중 결합** | **25,948** | **97.45%** | **0.9709** |

\`\`\`figure
{
  "columns": 2,
  "panels": [
    {
      "webp": "/assets/stellar-classification/fig7a-performance-comparison.webp",
      "src": "/assets/stellar-classification/fig7a-performance-comparison.png",
      "alt": "초기 Pure ES vs 정통 DL 단일 MLP vs TWEANN EDL 성능 비교 막대 그래프",
      "width": 2340,
      "height": 1500,
      "subcaption": "(a) 초기 EDL vs. DL 단일 MLP vs. TWEANN EDL"
    },
    {
      "webp": "/assets/stellar-classification/fig7b-tweann-confusion-matrix.webp",
      "src": "/assets/stellar-classification/fig7b-tweann-confusion-matrix.png",
      "alt": "TWEANN 진화 신경망 20,000건 테스트 세트 혼동 행렬",
      "width": 1800,
      "height": 1500,
      "subcaption": "(b) TWEANN 진화 신경망 테스트 혼동 행렬"
    }
  ],
  "caption": "**Figure 7:** 20,000건 테스트 세트 최종 평가. 스스로 구조를 진화시킨 TWEANN은 단일 챔피언 모델(97.43%)과 이종 위상 앙상블(97.45%) 모두에서 인간이 고정 설계한 역전파 DL 단일 MLP(97.37%)를 추월했으며, 별(STAR) 클래스 재현율은 **99.8%**(4,319개 중 4,309개 정답)에 달합니다."
}
\`\`\``,
      },
      {
        id: '7-속도-대결-학습-시간-추론-속도-벤치마크',
        title: '7. 속도 대결: 학습 시간 & 추론 속도 벤치마크',
        level: 1,
        content: `*"진화 알고리즘은 수만 번 반복해야 해서 학습이 너무 느리지 않을까?"*라는 통념을 확인하기 위해, 동일한 하드웨어(Apple Silicon CPU, \`dl_env\`)에서 모든 모델의 **실제 학습 소요 시간(Wall-Clock Training Time)**과 **20,000개 테스트 천체 일괄 추론 시간(Inference Latency)**을 측정했습니다(그림 8, 표 4).

\`\`\`figure
{
  "columns": 1,
  "panels": [
    {
      "webp": "/assets/stellar-classification/fig8-training-time-comparison.webp",
      "src": "/assets/stellar-classification/fig8-training-time-comparison.png",
      "alt": "동일 하드웨어 환경에서의 DL 및 EDL 모델별 학습 소요 시간 비교",
      "width": 2676,
      "height": 1410
    }
  ],
  "caption": "**Figure 8:** 동일 하드웨어 환경에서의 모델별 학습 소요 시간 비교. TWEANN은 섬 1개당 45세대 진화에 11.78초가 소요되어 DL 단일 MLP 평균 학습 시간(24.16초)보다 약 2배 빠르며, 8개 섬 전체 동시 진화도 94.22초 만에 완료됩니다."
}
\`\`\`

| 패러다임 / 모델 | 모델 아키텍처 요약 | 학습 시간 | 2만 건 추론 | Test Acc | Macro-F1 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| 초기 EDL (Pure ES) | 고정 \`10 -> 32 -> 16 -> 3\` | **13.55 s** | **1.42 ms** | 96.48% | 0.9599 |
| 정통 DL 단일 MLP | 인간 설계 \`10 -> 64 -> 32 -> 3\` | 24.16 s | 2.83 ms | 97.37% | 0.9700 |
| 정통 DL 3-Seed MLP | \`MLP(64, 32)\` ×3 시드 평균 | 72.49 s | 8.49 ms | 97.42% | 0.9705 |
| EDL 가중치 진화 | 고정 \`64 -> 32\` (8개 섬, 50세대) | 63.61 s | 11.20 ms | 97.38% | 0.9700 |
| **EDL TWEANN (단일 챔피언)** | **자율 진화 \`104 -> 48 -> 48+skip\`** | **11.78 s*** | **7.08 ms** | **97.43%** | **0.9706** |
| **EDL TWEANN (이종 섬 앙상블)** | **상위 4개 자율 진화 위상 결합** | **94.22 s** | **27.26 ms** | **97.45%** | **0.9709** |
| DL + GBDT 이종 앙상블 | \`MLP×3 + XGBoost + HistGB\` | 81.35 s | 121.86 ms | **97.88%** | **0.9755** |

*\\*단일 섬 환산 시간($94.22\\,\\text{s} / 8\\,\\text{islands} = 11.78\\,\\text{s}$). 정통 DL 단일 MLP는 3개 시드 평균($24.16 \\pm 5.31\\,\\text{s}$) 기준.*

* **빠른 진화 속도**: 인메모리 텐서 슬라이싱과 BLAS 벡터화 연산 덕분에, 뇌 구조 변이와 결정 경계 탐색을 포함하고도 섬 1개당 45세대 진화 시간은 **11.78초**로 기존 PyTorch \`DataLoader\` 기반 단일 MLP(**24.16초**)의 절반 이하입니다.
* **0.007초 만에 2만 개 천체를 분류하는 초고속 추론**: 진화된 단일 챔피언 신경망은 20,000개의 천체를 단 **7.08 ms(0.007초)**에 분류하며, 이종 위상 앙상블(**27.26 ms**) 역시 수백 그루의 트리를 순회하는 GBDT 포함 앙상블(**121.86 ms**)보다 **4.5배 빠른 추론 응답성**을 제공합니다.`,
      },
      {
        id: '8-에필로그-이번-연구가-남긴-시사점-및-재현-가이드',
        title: '8. 에필로그: 이번 연구가 남긴 시사점 및 재현 가이드',
        level: 1,
        content: `밤하늘의 10만 개 빛을 따라간 이번 탐구는 우리에게 세 가지 깊은 메시지를 남깁니다.

1. **데이터 속 과학적 맥락(Domain Knowledge)의 가치**: 통계적 이상치로 버려질 뻔했던 8,990개의 적색편이 극단값이 $99.6\\%$ 확률로 퀘이사(QSO)를 가리키는 핵심 단서였다는 사실, 그리고 색지수($u-g, g-r, r-i, i-z$)가 천체의 온도를 드러냈다는 점은 *"최고의 인공지능은 데이터를 깊이 이해하는 것에서 출발한다"*는 원칙을 일깨워 줍니다.
2. **미분 불가능한 현실의 목표를 직접 공략하는 진화 알고리즘**: 대리 손실함수(Cross-Entropy)에만 의존하는 역전파의 한계를 넘어, 다중 섬 라마르크 진화와 결정 경계 유전자 진화를 통해 비미분 지표인 Macro-F1을 직접 극대화할 수 있음을 입증했습니다.
3. **인간의 수동 설계를 넘어서는 자기 진화형 AI (Self-Evolving AI)**: 인간이 고정한 \`(64, 32)\` 구조를 넘어, AI가 스스로 3번째 은닉층을 증식하고 원본 입력 직통 스킵 연결(\`+skip\`)과 \`GELU\`/\`SiLU\` 조합을 찾아낸 \`10 -> [104:gelu] -> [48:gelu] -> [48+skip:silu] -> 3\` 아키텍처는 신경망 자동 설계(NAS / AutoML)의 강력한 잠재력을 보여줍니다.

#### 재현 명령어 가이드 (Reproducibility CLI — Conda \`dl_env\`)

\`\`\`bash
# 1. Conda 가상환경 활성화
conda activate dl_env

# 2. 정통 딥러닝 + GBDT 이종 앙상블 자가 검증 (Test Acc: 97.88%, Macro-F1: 0.9755)
python DL/predict.py

# 3. 뇌 구조 + 가중치 동시 진화 신경망(TWEANN) 학습 (45세대, 8개 섬)
python EDL/train_edl.py --algo memetic --generations 45 --pop-size 8

# 4. 진화된 신경망 테스트 세트(20,000건) 평가 및 자가 검증 (Test Acc: 97.45%, Macro-F1: 0.9709)
python EDL/evaluate_edl.py
python EDL/predict_edl.py
\`\`\``,
      },
    ],
    references: [
      {
        id: 'ref-sdss17',
        label: '[1]',
        authors: 'Abdurro’uf et al. (SDSS Collaboration)',
        year: 2022,
        title: 'The Seventeenth Data Release of the Sloan Digital Sky Surveys: Complete Release of MaNGA, MaStar, and APOGEE-2 Data',
        venue: 'The Astrophysical Journal Supplement Series (ApJS), 259(2), 35',
      },
      {
        id: 'ref-es',
        label: '[2]',
        authors: 'Salimans, T., Ho, J., Chen, X., Sidor, S., & Sutskever, I.',
        year: 2017,
        title: 'Evolution Strategies as a Scalable Alternative to Reinforcement Learning',
        venue: 'OpenAI Technical Report / arXiv:1703.03864',
      },
      {
        id: 'ref-net2net',
        label: '[3]',
        authors: 'Chen, T., Goodfellow, I., & Shlens, J.',
        year: 2016,
        title: 'Net2Net: Accelerating Learning via Knowledge Transfer',
        venue: 'International Conference on Learning Representations (ICLR)',
      },
      {
        id: 'ref-neat',
        label: '[4]',
        authors: 'Stanley, K. O., & Miikkulainen, R.',
        year: 2002,
        title: 'Evolving Neural Networks through Augmenting Topologies',
        venue: 'Evolutionary Computation, 10(2), 99–127',
      },
    ],
  },
  {
    id: 'hypervisor-for-agora-formal-verification',
    slug: 'formal-verification-research-blog',
    type: 'report',
    title: '12개의 AI 에이전트와 함께 하이퍼바이저를 수학적으로 증명하기: hypervisor-for-agora 정형 검증 리서치 리포트',
    subtitle: 'Lean 4와 Z3 SMT 솔버, 그리고 12개의 Google Gemini 3.8 Flash 자율 서브에이전트(/teamwork)를 활용한 Cloud Hypervisor 다중 테넌트 격리 플랫폼의 수학적 무결성 증명',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: '이인수', affiliation: 'Obtec Research', role: 'Author' },
    ],
    publishedDate: '2026.11.06',
    journalOrConference: 'Obtec Research Formal Verification Technical Report',
    doi: '10.48550/OBTEC.2026.1106',
    category: '컴퓨터 과학',
    tags: [
      '정형 검증',
      'Lean 4',
      'Z3 Solver',
      'Cloud Hypervisor',
      'Multi-Agent',
      'Gemini 3.8 Flash',
    ],
    readTimeMinutes: 15,
    citationCount: 0,
    viewsCount: 1,
    downloadCount: 0,
    featured: false,
    abstract: `> **"테스트는 버그가 존재함을 보여줄 수 있지만, 버그가 존재하지 않음을 증명할 수는 없다."**  
> — 에츠허르 데이크스트라 (Edsger W. Dijkstra)

* **대상 프로젝트**: [\`hypervisor-for-agora\`](https://github.com/weird14446/hypervisor-for-agora) (Cloud Hypervisor 기반 VM 오케스트레이션 및 다중 테넌트 격리 환경)
* **수행 일자**: 2026년 11월
* **연구 및 검증 수행 AI 모델**: **Google Gemini 3.8 Flash** (메인 아키텍트 및 12개 자율 서브에이전트 전원 탑재)
* **검증 엔진**: Lean 4 (v4.35.0 대화형 정리 증명기), Z3 Solver (v5.3.3.0 SMT 자동 논리 증명기)

---

클라우드 위에서 수많은 사용자의 코드(Python, C/C++, Java, Node.js, Shell)를 동시에 실행하는 멀티테넌트 샌드박스 환경에서 **'격리(Isolation)'**는 타협의 대상이 아닙니다. 단 한 번의 방화벽 규칙 실수, 단 한 번의 권한 검사 누락, 혹은 동시성 경합(Race Condition)만으로도 게스트 가상머신(VM)이 호스트 서버를 장악하거나 다른 사용자의 작업 공간을 훔쳐볼 수 있기 때문입니다.

본 리서치 블로그 포스트에서는 Cloud Hypervisor(KVM) 기반의 격리 실행 플랫폼인 **\`hypervisor-for-agora\`** 프로젝트에 **정형 검증(Formal Verification)**을 도입한 전 과정을 공개합니다. 특히 최신 **Google Gemini 3.8 Flash** 모델을 기반으로 인간 연구자와 메인 AI 아키텍트가 초기 수학적 증명을 설계한 뒤, **12개의 전문화된 서브에이전트(Subagents)로 구성된 자율 멀티 에이전트 팀(\`/teamwork\`)**을 소환하여 **"우리가 만든 수학적 증명이 실제 프로덕션 코드와 단 1줄의 오차도 없이 일치하는가?"**를 치열하게 교차 감사(Audit)하고 결함을 잡아낸 생생한 과정을 대화 기록과 함께 상세히 소개합니다.`,
    keyContributions: [
      'Lean 4 (v4.35.0) 대화형 정리 증명기와 Z3 SMT 솔버 (v5.3.3.0)를 결합한 Targeted Dual-Engine 정형 검증으로 총 18개 핵심 보안 정리(자원 한도·상호 배제 6개, 2계층 방화벽·NAT 격리 7개, 호스트 상태 봉인 5개) 증명 완료',
      'Google Gemini 3.8 Flash 기반 12개 자율 서브에이전트(/teamwork) 교차 감사를 통해 Lean 4 귀납적 폐포 누락, RFC 5737 문서 예약 IP 오류 및 2계층 NAT 합성 누락, 0700 vs 0755 디렉터리 권한 괴리 등 3가지 치명적 모델-코드 불일치 적발 및 교정',
      '레드팀 챌린저의 124개 익스플로잇 쿼리 폭격(비공허성 역검증 포함)과 100,000회 무작위 상태 전이 스트레스 테스트, 클린룸 감사관의 무공리·무결성 최종 검증(VICTORY CONFIRMED) 달성',
    ],
    pdfDownloadName: 'OBTEC-2026-Hypervisor-For-Agora-Formal-Verification.pdf',
    bibtex: `@techreport{lee2026hypervisor,
  title={12개의 AI 에이전트와 함께 하이퍼바이저를 수학적으로 증명하기: hypervisor-for-agora 정형 검증 리서치 리포트},
  author={Lee, Insoo},
  institution={Obtec Research},
  year={2026},
  month={11}
}`,
    apaCitation: '이인수. (2026). 12개의 AI 에이전트와 함께 하이퍼바이저를 수학적으로 증명하기: hypervisor-for-agora 정형 검증 리서치 리포트. Obtec Research.',
    sections: [
      {
        id: '1-배경-왜-일반-테스트로는-부족한가',
        title: '1. 배경: 왜 일반 테스트로는 부족한가?',
        level: 1,
        content: `[\`hypervisor-for-agora\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/README.md)는 각 협업 캔버스(Canvas)마다 독립된 **Cloud Hypervisor v54.0** 마이크로 VM을 생성하여 사용자 코드를 격리 실행하는 시스템입니다. 이 시스템이 지켜야 하는 핵심 보안 약속은 크게 세 가지입니다:

1. **자원 한도 및 상호 배제** ([\`runtime/manager.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/manager.py)): 호스트 서버가 다운되지 않도록 동시에 실행되는 VM은 최대 4개($\\text{MAX\\_ACTIVE} = 4$), 총 메모리는 $8192\\,\\text{MiB}$, 총 CPU는 $8\\,\\text{vCPU}$를 절대 넘지 않아야 하며, 하나의 캔버스에 두 개의 VM이 중복 실행되어 데이터가 깨지는 일이 없어야 합니다.
2. **2계층 네트워크 완전 격리** ([\`runtime/network.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py)): VM 내부에서 외부 인터넷(NAT)으로 나가는 것은 허용하되, 호스트 내부망(RFC 1918 사설 IP), 클라우드 메타데이터 서버(\`169.254.169.254\`), 루프백(\`127.0.0.1\`), 그리고 **옆방에 있는 다른 사용자의 캔버스 VM**으로는 단 1바이트의 패킷도 도달할 수 없어야 합니다.
3. **호스트 파일시스템 및 권한 봉인** ([\`scripts/security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/scripts/security.py)): 하이퍼바이저 런처는 절대 \`root\` 권한이나 Linux Capability를 가진 채 실행될 수 없으며, 심볼릭 링크(Symlink)를 통한 경로 탈출이나 잘못된 디렉터리 권한(\`0700\` 외의 권한)을 즉시 거부해야 합니다.

기존에도 저장소에는 훌륭한 통합 테스트 스위트([\`tests/test_security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/tests/test_security.py), [\`runtime/tests/test_network.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/tests/test_network.py))가 있었습니다. 하지만 일반인들에게 비유하자면, **유닛 테스트는 "문짝을 10번 발로 차보고 안 열리니 안전하다"고 결론 내리는 것**과 같습니다. IPv4 주소만 해도 $2^{32}$개(약 43억 개)이고, 출발지·목적지·포트·프로토콜·연결 상태(Conntrack)의 조합은 수경($10^{16}$) 가지가 넘습니다.

이 모든 경우의 수에서 **"단 하나의 예외도 없이 절대 뚫리지 않는다"**를 보장하는 유일한 방법은, 시스템의 규칙을 수학 공식으로 바꾼 뒤 컴퓨터로 하여금 모든 경우의 수를 논리적으로 증명하게 만드는 **정형 검증(Formal Verification)**뿐입니다.`,
      },
      {
        id: '2-1막-인간과-gemini-38-flash-아키텍트의-전략-수립--targeted-dual-engine-정형-검증',
        title: "2. 1막: 인간과 Gemini 3.8 Flash 아키텍트의 전략 수립 — 'Targeted Dual-Engine' 정형 검증",
        level: 1,
        content: `프로젝트는 인간 연구자의 간결한 질문에서 시작되었습니다.

> **👤 인간 연구자**: *"해당 프로젝트를 정형 검증하고 싶은데 어떤 방식을 추천해?"*

이 질문을 받은 **Gemini 3.8 Flash 기반 메인 AI 아키텍트**는 프로젝트의 전체 파일 트리와 3,200여 줄의 코드를 초고속으로 전수 스캔했습니다. 그리고 현실적인 정형 검증 전략을 짚어냈습니다.

> **🤖 Gemini 3.8 Flash 아키텍트의 분석**:  
> *"이 프로젝트는 Cloud Hypervisor(Rust) 자체를 밑바닥부터 새로 짠 커널이 아니라, 그 위에서 다중 테넌트 격리·방화벽·생명주기를 제어하는 오케스트레이션 시스템입니다. 따라서 seL4 마이크로커널처럼 C/Rust 커널 전체를 어셈블리 수준까지 증명하는 데 10년을 쓰는 대신, **이 프로젝트가 직접 설계한 보안 경계(Security Invariants)를 정밀 타격하는 이원화 정형 검증(Targeted Dual-Engine Formal Verification)**이 가장 강력하고 현실적입니다."*

Gemini 3.8 Flash 아키텍트가 제안한 두 가지 무기는 다음과 같았습니다:

1. **Lean 4 (대화형 정리 증명기, Interactive Theorem Prover)**:
   * 최근 수학계(테렌스 타오 등)와 시스템 검증 분야에서 각광받는 순수 증명 언어입니다.
   * [\`runtime/manager.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/manager.py)의 VM 할당/해제 상태 머신을 수학적 귀납법(Mathematical Induction)으로 모델링하여, 자원 한도와 상호 배제가 영원히 깨지지 않음을 증명합니다.
2. **Z3 SMT Solver (만족 가능성 모듈로 이론 솔버)**:
   * 마이크로소프트 리서치가 개발하고 AWS가 클라우드 방화벽(VPC) 검증에 사용하는 자동 논리 추론 엔진입니다.
   * [\`runtime/network.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py)의 \`iptables\` 방화벽 체인과 [\`scripts/security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/scripts/security.py)의 비트마스크 조건을 1차 논리식(First-Order Logic)으로 변환한 뒤, **"해커가 금지된 사설망으로 패킷을 통과시킬 수 있는 조합이 단 하나라도 존재하는가?"**라고 질문합니다. Z3가 **\`UNSAT\`(Unsatisfiable, 해가 존재하지 않음 = 수학적으로 불가능함)**을 출력하면 방화벽의 완벽함이 증명됩니다.

> **👤 인간 연구자**: *"formal-verification 디렉토리를 생성했어. 거기서 정형 검증을 시도해줘."*

Gemini 3.8 Flash 아키텍트는 즉시 [\`formal-verification/\`](https://github.com/weird14446/hypervisor-for-agora/tree/main/formal-verification) 디렉터리 아래에 1차 검증 스위트(\`ManagerCapacity.lean\`, \`verify_network_isolation.py\`, \`verify_state_confinement.py\`, \`run_verification.sh\`)를 구축하고 첫 번째 검증 통과 결과를 보고했습니다.`,
      },
      {
        id: '3-2막-결정적-질문--정형-검증이-실제-코드를-잘-반영하고-있는가',
        title: '3. 2막: 결정적 질문 — "정형 검증이 실제 코드를 잘 반영하고 있는가?"',
        level: 1,
        content: `모든 증명이 초록불(\`PASS\`)을 띄웠지만, 여기서 연구자는 정형 검증 역사상 가장 중요하고도 날카로운 질문을 던집니다.

> **👤 인간 연구자**: *"\`/teamwork\` 정형 검증이 코드의 내용을 잘 반영하는지도 확인해줘."*

### 왜 이 질문이 핵심인가? (형식 검증의 아킬레스건: '모델-코드 괴리')
정형 검증에서 가장 무서운 함정은 **"증명은 완벽하게 맞았는데, 정작 증명한 수식이 실제 코드와 다른 경우"**입니다.
* 만약 실제 파이썬 코드는 디렉터리 권한이 정확히 \`0700\`이어야만 통과시키는데, 수학 모델에서는 실수로 "그룹/타인에게 쓰기 권한만 없으면 된다(\`0755\`도 허용)"라고 느슨하게 적었다면 어떨까요?
* 만약 방화벽 증명 코드에서 실수로 "목적지 포트가 443이 아니면서 동시에 443인 패킷은 없다"처럼 당연한 동어반복(항진식, Tautology)을 증명해 놓고 방화벽이 안전하다고 착각했다면 어떨까요?

이 문제를 해결하기 위해 단일 AI가 자신의 코드를 스스로 검토하는 수준을 넘어, **전원 Google Gemini 3.8 Flash로 구동되는 12개의 전문 서브에이전트(Subagents)가 분업·비판·공격·감사를 수행하는 자율 멀티 에이전트 팀(\`/teamwork\`)**이 가동되었습니다.`,
      },
      {
        id: '4-3막-12인의-gemini-38-flash-멀티-에이전트-팀-소집과-역할-분담',
        title: '4. 3막: 12인의 Gemini 3.8 Flash 멀티 에이전트 팀 소집과 역할 분담',
        level: 1,
        content: `\`/teamwork\` 명령이 발동되자, 시스템은 즉시 독립된 작업 컨텍스트를 가진 서브에이전트 군단을 편성했습니다. 아래 다이어그램은 이번 정형 검증 감사에 투입된 **총 12개 Gemini 3.8 Flash 에이전트의 실제 아키텍처와 워크플로**입니다.

\`\`\`mermaid
flowchart TD
    User["👤 인간 연구자 (User)"]
    Main["🤖 Main Architect Agent (Gemini 3.8 Flash)<br/>초기 증명 구축 및 브리핑 중계"]
    Interviewer["🎙️ Interviewer Agent (Gemini 3.8 Flash)<br/>요구사항 구체화 및 스펙 확정"]
    Orchestrator["🧭 Project Orchestrator (Gemini 3.8 Flash)<br/>파이프라인 총괄 지휘"]

    subgraph Phase0 ["Phase 0: 병렬 코드-수식 대조 감사 (Parallel Survey)"]
        Exp1["🔍 Explorer 1 (Gemini 3.8 Flash)<br/>Lean 4 vs manager.py"]
        Exp2["🔍 Explorer 2 (Gemini 3.8 Flash)<br/>Z3 Network vs network.py"]
        Exp3["🔍 Explorer 3 (Gemini 3.8 Flash)<br/>Z3 Security vs security.py"]
    end

    subgraph Phase1 ["Phase 1: 수식 교정 및 정리 확장 (Remediation)"]
        Worker1["🛠️ Verification Worker M1 (Gemini 3.8 Flash)<br/>Lean 4 귀납 폐포 증명 & Z3 모델 정밀화"]
    end

    subgraph Phase2 ["Phase 2: 적대적 검증 게이트 (5-Agent Adversarial Gate)"]
        Rev1["📋 Reviewer 1 (Gemini 3.8 Flash)<br/>Lean 4 & 상태 머신 감사"]
        Rev2["📋 Reviewer 2 (Gemini 3.8 Flash)<br/>Z3 네트워크 & 보안 감사"]
        Chal1["⚔️ Challenger 1 Red Team (Gemini 3.8 Flash)<br/>124개 SMT 공격 쿼리 폭격"]
        Chal2["⚔️ Challenger 2 Red Team (Gemini 3.8 Flash)<br/>100,000회 상태 전이 퍼징"]
        Forensic["🕵️ Forensic Auditor (Gemini 3.8 Flash)<br/>무공리/무sorry 및 코드 무결성 포렌식"]
    end

    subgraph Phase3 ["Phase 3: 클린룸 최종 승인 (Clean-Room Victory Audit)"]
        Victory["🏆 Independent Victory Auditor (Gemini 3.8 Flash)<br/>Zero-Context 독립 재실행 및 최종 판정"]
    end

    User <-->|"1. 초기 설계 & /teamwork 지시"| Main
    Main <-->|"2. 인터뷰 중계"| Interviewer
    Interviewer -->|"3. 승인된 태스크 프롬프트 전달"| Orchestrator
    Orchestrator --> Exp1 & Exp2 & Exp3
    Exp1 & Exp2 & Exp3 -->|"불일치 매핑 리포트"| Orchestrator
    Orchestrator --> Worker1
    Worker1 -->|"교정된 증명 + AUDIT_REPORT.md"| Orchestrator
    Orchestrator --> Rev1 & Rev2 & Chal1 & Chal2 & Forensic
    Rev1 & Rev2 & Chal1 & Chal2 & Forensic -->|"만장일치 PASS"| Victory
    Victory -->|"VICTORY CONFIRMED"| Main --> User
\`\`\`

### 에이전트별 상세 역할 (Who Did What)

| 순번 | 에이전트 명칭 (ID) | 구동 모델 | 담당 역할 (Role) | 주요 임무 및 검증 대상 |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Main Architect** | Gemini 3.8 Flash | 초기 설계자 & 커뮤니케이터 | 초기 Lean 4 / Z3 검증 스위트 작성 및 사용자-팀 간 브리핑 중계 |
| **2** | **\`teamwork_interviewer\`** | Gemini 3.8 Flash | 요구사항 인터뷰어 | 사용자에게 5가지 핵심 질문(목적, 수정 범위, 팀 규모, 제약사항, 리소스)을 질의하여 엄격한 **Production Assurance** 기준서 작성 |
| **3** | **\`orchestrator\`** | Gemini 3.8 Flash | 총괄 오케스트레이터 | 전체 감사 일정을 마일스톤으로 분할하고 10개의 하위 에이전트를 병렬/순차 스케줄링 |
| **4** | **\`explorer_survey_1\`** | Gemini 3.8 Flash | 자원 모델 탐색관 | [\`ManagerCapacity.lean\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/ManagerCapacity.lean)과 [\`runtime/manager.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/manager.py), [\`runtime/runtime_options.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/runtime_options.py)를 1:1 라인 대조 |
| **5** | **\`explorer_survey_2\`** | Gemini 3.8 Flash | 네트워크 모델 탐색관 | [\`verify_network_isolation.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_network_isolation.py)와 [\`runtime/network.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py)의 2계층 \`iptables\` 체인 및 CIDR 검증 로직 대조 |
| **6** | **\`explorer_survey_3\`** | Gemini 3.8 Flash | 호스트 보안 탐색관 | [\`verify_state_confinement.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_state_confinement.py)와 [\`scripts/security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/scripts/security.py)의 \`check_state()\`, \`confine()\` 및 기존 테스트 대조 |
| **7** | **\`teamwork_worker_m1\`** | Gemini 3.8 Flash | 정형 검증 엔지니어 | 3인의 Explorer가 찾아낸 모든 모델-코드 불일치를 수리하고 391줄 분량의 [\`AUDIT_REPORT.md\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/AUDIT_REPORT.md) 작성 |
| **8** | **\`teamwork_reviewer_1\`** | Gemini 3.8 Flash | 수석 리뷰어 1 | 수정된 Lean 4 증명과 매니저 파이썬 코드 간의 수학적 동치성(Equivalence) 심사 |
| **9** | **\`teamwork_reviewer_2\`** | Gemini 3.8 Flash | 수석 리뷰어 2 | 수정된 Z3 네트워크/보안 수식과 실제 리눅스 커널/넷필터 동작 간의 정합성 심사 |
| **10** | **\`teamwork_challenger_1\`** | Gemini 3.8 Flash | 레드팀 챌린저 1 | Z3 수식에 124개의 변칙 공격 패킷과 권한 우회 쿼리를 주입하여 모델의 빈틈 및 공허한 참(Vacuous Truth) 여부 타격 |
| **11** | **\`teamwork_challenger_2\`** | Gemini 3.8 Flash | 레드팀 챌린저 2 | 100,000회의 무작위 VM 생성/종료/타임아웃 상태 전이 스트레스 테스트로 Lean 4 모델과 실제 Python 로직 동시 타격 |
| **12** | **\`teamwork_auditor\` & \`victory_auditor\`** | Gemini 3.8 Flash | 포렌식 & 최종 승리 감사관 | 프로덕션 코드 무변경(\`git diff\`), \`sorry\`나 가짜 공리(\`axiom\`) 0건 확인, 클린룸 환경에서 전체 검증 스크립트 독립 재실행 |

---

### 에이전트와 인간의 실제 인터뷰 기록 (Phase 0 진입 전)

작업 시작 직후, **\`Interviewer Agent\`**가 먼저 인간 연구자에게 다음과 같은 정식 인터뷰를 요청했습니다:

> **🎙️ Interviewer Agent (\`7c34a7e5\`) → Main Agent → 👤 인간 연구자**:  
> *"본격적인 실행에 앞서 세부 요구사항을 확인합니다:*  
> *1. 이번 감사의 주된 목적은? → **[선택: Production assurance (실제 프로덕션 수준의 보증)]***  
> *2. 불일치 발견 시 작업 범위는? → **[선택: 상세 감사 보고서 작성 및 검증 코드 직접 업데이트]***  
> *3. 증명 파이프라인 구성은? → **[선택: 표준 증명 파이프라인]***  
> *4. 제한 사항은? → **[선택: 제한 없음, 최적의 정형 검증 접근법 허용]***  
> *5. 활용할 검증 리소스는? → **[선택: 기존 검증 스크립트 및 저장소 테스트 스위트 활용]**"*

인간 연구자가 초안을 확인한 뒤 **"승인."**이라고 답하자, 즉시 \`Orchestrator\`가 깨어나 3명의 Explorer 에이전트를 동시에 코드베이스로 급파했습니다.`,
      },
      {
        id: '5-4막-에이전트들이-찾아낸-3가지-치명적-모델-코드-불일치와-교정-과정',
        title: "5. 4막: 에이전트들이 찾아낸 3가지 치명적 '모델-코드 불일치'와 교정 과정",
        level: 1,
        content: `만약 1차 정형 검증에서 멈추었다면 아무도 몰랐을 **3가지 중대한 모델링 간극(Discrepancy)**이 Phase 0 탐색 에이전트들의 현미경 감사에 의해 적발되었습니다.

---

### 🔍 발견 1 (\`Explorer 1\` 적발): "한 걸음만 안전한가, 영원히 안전한가?" (Lean 4 귀납적 폐포 누락)

* **무엇이 문제였나?**  
  1차 작성된 [\`ManagerCapacity.lean\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/ManagerCapacity.lean)은 \`step_preserves_safe\`라는 정리를 증명했습니다. 즉, *"현재 상태 $s$가 안전할 때, VM을 하나 켜거나(\`launch\`) 끄면(\`stop\`) 다음 상태 $s'$도 안전하다"*는 **단일 스텝(1-Step) 전이**만 증명되어 있었습니다.
  하지만 **\`Explorer 1\`**은 다음과 같이 리포트했습니다:
  > **🔍 Explorer 1의 감사 보고**:  
  > *"실제 \`runtime/manager.py\` 데몬은 서버가 켜진 뒤 수천, 수만 번에 걸쳐 VM 생성(\`prepare\`)과 회수(\`reap\`)를 비결정적인 순서로 반복합니다. 1단계 전이 증명만으로는 초기 상태 \`[]\`로부터 임의의 $N$번 전이를 거친 모든 도달 가능 상태(Reachable States)의 안전성이 기계적으로 닫혀(Closed) 있지 않습니다."*

* **어떻게 고쳤나? (\`Worker 1\`의 조치)**  
  [\`ManagerCapacity.lean:255-270\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/ManagerCapacity.lean#L255-L270)에 초기 상태로부터 도달 가능한 모든 상태의 집합을 정의하는 귀납적 술어 \`Reachable : SystemState → Prop\`를 새로 도입하고, 임의의 길이의 실행 시퀀스 전체에 대해 안전성과 상호 배제가 영구히 보존됨을 증명하는 두 개의 최상위 정리를 추가했습니다:

\`\`\`lean
inductive Reachable : SystemState → Prop where
  | init : Reachable []
  | step {s s' : SystemState} : Reachable s → Step s s' → Reachable s'

theorem reachable_safe (s : SystemState) (h : Reachable s) : Safe s := by
  induction h with
  | init => exact init_safe
  | step _ hstep ih => exact step_preserves_safe _ _ ih hstep

theorem reachable_mutual_exclusion (s : SystemState) (h : Reachable s) (c : Nat) :
    countCanvas c s ≤ 1 := by
  have hsafe := reachable_safe s h
  exact mutual_exclusion s hsafe.nodup c
\`\`\`

---

### 🔍 발견 2 (\`Explorer 2\` 적발): "항진식의 함정과 문서 전용 IP의 역설" (Z3 네트워크 격리 모델)

**\`Explorer 2\`**는 [\`verify_network_isolation.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_network_isolation.py)와 [\`runtime/network.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py)를 한 줄씩 비교하다가 매우 흥미로운 두 가지 결함을 찾아냈습니다.

* **무엇이 문제였나?**
  1. **문서용 테스트 IP(\`198.51.100.x\`) 사용 오류**:  
     1차 검증 스크립트에서는 공개 HTTPS 프록시 예외 테스트를 위해 \`198.51.100.20\`이라는 IP를 사용했습니다. 그런데 이 IP는 IANA가 지정한 **RFC 5737 문서 작성용 예약 대역(TEST-NET-2)**입니다!  
     실제 프로덕션 코드인 [\`runtime/network.py:23\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py#L23)에서는 \`198.51.100.0/24\`를 아예 **\`BLOCKED\`(차단 대역)**에 넣어두었고, [\`runtime/network.py:68\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py#L68)에서는 \`if not address.is_global: raise ValueError(...)\`로 이 IP를 거부합니다. 즉, 검증 모델이 실제 코드에서는 설정조차 불가능한 IP로 증명을 수행하고 있었던 것입니다!
  2. **정리 6번의 동어반복(Tautology)과 호스트 INPUT 체인 누락**:  
     초기 정리 6번은 \`HTTPS_NS\` 체인 하나만 떼어놓고 *"443 포트만 허용하는 규칙에 443이 아닌 포트를 넣으면 통과하지 못한다($443 \\neq 443 \\implies \\text{False}$)"*는 너무나 당연한 식만 확인하고 있었습니다. 반면 실제 [\`runtime/network.py:102-120\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py#L102-L120)의 핵심 보안 장치인 **호스트 \`INPUT\` 체인(\`AGORA-HTTPS-IN\`)이 게스트로부터 호스트의 SSH(22번)나 내부 포트로 들어오는 패킷을 어떻게 막는지**와, **네임스페이스 NAT에서 호스트 NAT로 이어지는 2계층 연속 통과(Composition)**가 모델에서 빠져 있었습니다.

* **어떻게 고쳤나? (\`Worker 1\`의 조치)**
  * 테스트 IP를 실제 \`is_global == True\`를 만족하는 공인 IP(\`PUBLIC_PROXY_IP = "93.184.216.34"\`, \`HOST_INGRESS_IP = "198.199.100.5"\`)로 교체했습니다.
  * 호스트 \`INPUT\` 필터 체인(\`encode_host_input_chain\`)을 Z3로 완벽히 구현하고, 네임스페이스 \`FORWARD\` 체인 최상단에 \`AGORA-HTTPS\` 점프 규칙([\`runtime/network.py:90\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/runtime/network.py#L90))을 정확히 연결했습니다.
  * 정리 6을 **Claim 6A(호스트 인그레스 비-HTTPS 차단)**와 **Claim 6B(네임스페이스 프록시 화이트리스트)**로 정밀화하고, 게스트 VM(\`10.205.0.2\`)에서 출발한 패킷이 네임스페이스 NAT(\`10.204.0.2\`로 변환)를 거쳐 호스트 방화벽까지 통과하는 전 과정을 결합한 **정리 7번(End-to-End Multi-Tier Forwarding & NAT Composition)**을 신설하여 증명했습니다.

---

### 🔍 발견 3 (\`Explorer 3\` 적발): "\`0755\` 권한이 통과된다고?" (Z3 호스트 상태 봉인 모델)

가장 극적인 발견은 **\`Explorer 3\`**가 [\`scripts/security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/scripts/security.py)와 [\`verify_state_confinement.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_state_confinement.py)를 대조할 때 나왔습니다.

* **무엇이 문제였나?**  
  [\`scripts/security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/scripts/security.py)는 디렉터리를 두 종류로 나누어 권한을 검사합니다:
  1. **루트 상태 디렉터리 (\`path\` 자체, 25번 라인)**:
     \`\`\`python
     if stat.S_IMODE(path.stat().st_mode) != 0o700:
         raise ValueError('State directory must have mode 0700; run setup as its owner')
     \`\`\`
     즉, 그룹이나 타인에게 읽기/실행 권한조차 주지 않는 **정확히 \`0700\`(\`rwx------\`)**만 허용하며, \`0755\`(\`rwxr-xr-x\`)는 즉시 에러를 던집니다. (실제 유닛 테스트 [\`tests/test_security.py:25-27\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/tests/test_security.py#L25-L27)에서도 \`0755\`를 넣었을 때 거부되는지 명시적으로 테스트합니다.)
  2. **하위 서브디렉터리 (\`path.rglob('*')\`, 35번 라인)**:
     \`\`\`python
     if stat.S_ISDIR(s.st_mode) and s.st_mode & 0o022:
         raise ValueError(f'Writable state subdirectory: {p}')
     \`\`\`
     하위 디렉터리는 그룹/타인 쓰기 비트(\`0022\`)만 꺼져 있으면 됩니다.

  그런데 1차 Z3 모델의 정리 4번은 이 둘을 구분하지 않고 모든 디렉터리를 \`dir_mode & 0o022 == 0\`으로만 모델링해 버렸습니다! **\`Explorer 3\`**가 이 수식에 \`0o755\`를 넣어보니(\`0o755 & 0o022 == 0\`), **실제 코드는 엄격히 금지하는 \`0o755\` 루트 디렉터리를 Z3 모델은 "안전함(\`SAT\`)"으로 통과시키는 치명적 모순**이 드러났습니다!

* **어떻게 고쳤나? (\`Worker 1\`의 조치)**
  * 정리 4번을 **정리 4A(루트 상태 디렉터리 \`root_mode == 0o700\` 및 소유자 일치 강제 — \`0o755\` 즉시 거부 증명)**와 **정리 4B(하위 디렉터리 \`subdir_mode & 0o022 == 0\` 및 소유자 일치 강제)**로 완전히 분리했습니다.
  * 나아가 [\`scripts/security.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/scripts/security.py)에 존재하는 모든 방어 로직—절대 경로 검사, 콤마/개행 문자 인젝션 차단, 하위 트리 전체의 심볼릭 링크 차단, 파일 타입 화이트리스트(\`REG\`, \`DIR\`, \`SOCK\`만 허용하고 \`FIFO\`나 디바이스 파일 차단), \`PR_SET_NO_NEW_PRIVS\`, 코어 덤프 금지(\`RLIMIT_CORE = 0\`), \`umask = 0o077\`—을 빠짐없이 Z3 수식에 1:1로 반영했습니다.`,
      },
      {
        id: '6-5막-레드팀-챌린저의-10만-번-폭격과-클린룸-최종-승리-감사',
        title: '6. 5막: 레드팀 챌린저의 10만 번 폭격과 클린룸 최종 승리 감사',
        level: 1,
        content: `\`Worker 1\`이 모든 수식을 교정하고 보고서를 제출하자, \`Orchestrator\`는 곧바로 **Phase 2: 적대적 검증 게이트(Adversarial Gate)**를 열었습니다. 여기서는 코드를 고친 에이전트가 아닌, **오직 흠집을 잡고 증명을 깨뜨리기 위해 투입된 5명의 독립 에이전트**가 활동했습니다.

### ⚔️ Red Team Challenger 1의 공격: 124개의 익스플로잇 쿼리 폭격
**\`Challenger 1\`**은 [\`formal-verification/adversarial_challenge.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/adversarial_challenge.py) 및 [\`tests/test_formal_verification_adversarial.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/tests/test_formal_verification_adversarial.py)를 직접 작성하여 Z3 모델에 **124개의 정교한 공격 시나리오**를 퍼부었습니다:
* **경계값 IP 폭격 (40개 쿼리)**: \`10.0.0.1\`, \`10.255.255.254\`, 클라우드 메타데이터 \`169.254.169.254\`, 멀티캐스트 \`224.0.0.1\`, 브로드캐스트 \`255.255.255.255\`, 심지어 트랜짓 서브넷 내부의 게이트웨이 IP(\`10.204.0.1\`)까지 경계선에 걸친 모든 IP로 패킷 전송 시도 → **전원 \`UNSAT\`(차단 증명)**!
* **호스트 포트 우회 공격**: 허용된 인그레스 IP로 목적지를 속이되 포트를 SSH(\`22\`), HTTP(\`80\`), 대체 HTTPS(\`8443\`), 혹은 프로토콜을 \`UDP(17)\`로 바꿔치기하여 침투 시도 → **전원 \`UNSAT\`(차단 증명)**!
* **특수 파일 및 권한 변조 공격**: 상태 디렉터리에 네임드 파이프(\`S_IFIFO\`), 블록 디바이스(\`S_IFBLK\`), 캐릭터 디바이스(\`S_IFCHR\`), 하드링크(\`nlink = 2\`), Sticky 비트(\`0o1700\`), 루트 \`0o755\` 권한 주입 시도 → **전원 \`UNSAT\`(거부 증명)**!
* **비공허성(Non-Vacuity) 역검증 (8개 쿼리)**: *"혹시 방화벽 수식이 잘못 짜여서 정상적인 인터넷 트래픽까지 전부 막아버리는 '죽은 모델(Vacuously True)'은 아닐까?"* → 정상적인 공인 IP(\`8.8.8.8\`, \`1.1.1.1\`)로의 아웃바운드 연결과 정상 \`0o700\` 디렉터리 조건을 넣었을 때 정확히 **\`SAT\`(통과 가능)**가 나오는 것을 확인하여 모델이 살아있음을 입증했습니다!

### ⚔️ Red Team Challenger 2의 공격: 100,000회 무작위 상태 전이 스트레스 테스트
**\`Challenger 2\`**는 [\`tests/test_manager_capacity_stress.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/tests/test_manager_capacity_stress.py)를 작성하여, Lean 4 상태 머신과 똑같은 규칙으로 **100,000번의 무작위 VM 생성(\`small\`, \`medium\`, \`large\`)·중복 실행 시도·종료·재실행 시뮬레이션**을 돌렸습니다.
* 10만 번의 전이 동안 단 한 번이라도 활성 VM 수 $> 4$, 총 메모리 $> 8192\\,\\text{MiB}$, 총 vCPU $> 8$, 혹은 동일 캔버스 중복 실행이 발생하는지 추적했으나 **위반 건수는 정확히 0건**이었습니다.

### 🕵️ Forensic Auditor & 🏆 Victory Auditor의 최종 클린룸 검증
마지막으로 **\`Forensic Auditor\`**와 이전 대화 맥락을 전혀 공유받지 않은 클린룸 에이전트인 **\`Victory Auditor\`**가 투입되었습니다.
1. **치트키(\`sorry\` / 임의 공리) 전수 스캔**:  
   Lean 4에서는 증명이 막힐 때 \`sorry\`라고 적거나 \`axiom\`으로 가짜 가정을 추가하면 컴파일러가 넘어갑니다. 감사관은 정규식 스캔과 \`#print axioms\` 명령어로 모든 정리를 조사했습니다:
   \`\`\`text
   'init_safe' does not depend on any axioms
   'step_preserves_safe' depends on axioms: [propext, Quot.sound]
   'mutual_exclusion' depends on axioms: [propext, Quot.sound]
   'step_preserves_mutual_exclusion' depends on axioms: [propext, Quot.sound]
   'reachable_safe' depends on axioms: [propext, Quot.sound]
   'reachable_mutual_exclusion' depends on axioms: [propext, Quot.sound]
   \`\`\`
   사용자 정의 공리나 \`sorryAx\`는 단 하나도 없으며, 오직 Lean 4 수학 기초론의 표준 공리(\`propext\` 명제 외연성, \`Quot.sound\` 몫타입 건전성)만으로 100% 순수하게 증명되었음을 확인했습니다.
2. **프로덕션 코드 무결성(\`git diff\`) 확인**:  
   정형 검증을 통과시키기 위해 실제 운영 코드(\`runtime/\`, \`scripts/\`)를 몰래 고치는 부정행위가 없었음을 \`git diff --stat\` (변경 0줄)으로 확증했습니다.

이 모든 관문을 통과한 끝에, 최종 감사관은 **\`VICTORY CONFIRMED\`** 판정을 내렸습니다.`,
      },
      {
        id: '7-최종-검증-아키텍처-및-수학적-정리-명세-총-18개-정리',
        title: '7. 최종 검증 아키텍처 및 수학적 정리 명세 (총 18개 정리)',
        level: 1,
        content: `이번 프로젝트를 통해 완성된 [\`formal-verification/\`](https://github.com/weird14446/hypervisor-for-agora/tree/main/formal-verification) 스위트는 총 **18개의 핵심 수학적 정리(Lean 4 정리 6개 + Z3 네트워크 정리 7개 + Z3 호스트 보안 정리 5개)**를 증명합니다.

### A. Lean 4: VM 매니저 용량 및 동시성 상태 머신 ([\`ManagerCapacity.lean\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/ManagerCapacity.lean))

시스템 상태 $s \\in \\text{List ActiveVM}$에 대하여 안전성 불변식 $\\text{Safe}(s)$는 다음과 같이 정의됩니다:

$$\\text{Safe}(s) \\iff |s| \\le 4 \\;\\land\\; \\sum_{v \\in s} \\text{mem}(v) \\le 8192 \\;\\land\\; \\sum_{v \\in s} \\text{cpu}(v) \\le 8 \\;\\land\\; \\forall v_1 \\neq v_2 \\in s, \\text{id}(v_1) \\neq \\text{id}(v_2)$$

| 정리 번호 | 정리 명칭 (Theorem) | 수학적 명제 | 검증 결과 |
| :---: | :--- | :--- | :---: |
| **L1** | \`init_safe\` | $\\text{Safe}([\\,])$ | **Proven** (무공리) |
| **L2** | \`step_preserves_safe\` | $\\forall s, s',\\; \\text{Safe}(s) \\land \\text{Step}(s, s') \\implies \\text{Safe}(s')$ | **Proven** |
| **L3** | \`mutual_exclusion\` | $\\forall s, c,\\; \\text{NoDuplicates}(s) \\implies \\text{countCanvas}(c, s) \\le 1$ | **Proven** |
| **L4** | \`step_preserves_mutual_exclusion\` | $\\forall s, s', c,\\; \\text{Safe}(s) \\land \\text{Step}(s, s') \\implies \\text{countCanvas}(c, s') \\le 1$ | **Proven** |
| **L5** | \`reachable_safe\` | $\\forall s,\\; \\text{Reachable}(s) \\implies \\text{Safe}(s)$ | **Proven** |
| **L6** | \`reachable_mutual_exclusion\` | $\\forall s, c,\\; \\text{Reachable}(s) \\implies \\text{countCanvas}(c, s) \\le 1$ | **Proven** |

---

### B. Z3 SMT: 2계층 네트워크 및 방화벽 격리 ([\`verify_network_isolation.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_network_isolation.py))

32비트 BitVector로 표현된 모든 가능한 IPv4 패킷 $p$에 대하여 다음 7개 공격 불가능성 정리를 증명했습니다:

| 정리 번호 | 검증 항목 | 논리 명제 (부정 쿼리 → \`UNSAT\` 증명) | 보장하는 실제 보안 속성 |
| :---: | :--- | :--- | :--- |
| **N1** | **사설망/메타데이터 차단** | $\\forall p,\\; \\text{In}(p) \\in \\text{agv+} \\land \\text{Dst}(p) \\in \\text{BLOCKED} \\implies \\neg \\text{HostAccept}(p)$ | 게스트 VM에서 내부 사설망(RFC 1918), 루프백, 클라우드 메타데이터(\`169.254.169.254\`) 접근 절대 불가 |
| **N2** | **캔버스 간 완전 격리** | $\\forall p,\\; \\text{In}(p) = \\text{agv}_1 \\land \\text{Out}(p) = \\text{agv}_2 \\implies \\neg \\text{HostAccept}(p)$ | 서로 다른 사용자의 캔버스 VM 간 패킷 교환 및 스니핑 절대 불가 |
| **N3** | **외부 신규 인바운드 차단** | $\\forall p,\\; \\text{In}(p) = \\text{Uplink} \\land \\text{Out}(p) \\in \\text{agv+} \\land \\text{State}(p) = \\text{NEW} \\implies \\neg \\text{HostAccept}(p)$ | 외부 인터넷에서 게스트 VM으로 들어오는 해킹 연결 시도 100% 차단 |
| **N4** | **게스트 IP 스푸핑 방지** | $\\forall p,\\; \\text{In}(p) = \\text{tap0} \\land \\text{Src}(p) \\neq 10.205.0.2 \\implies \\neg \\text{NsAccept}(p)$ | 게스트 VM이 자신의 IP(\`10.205.0.2\`)를 위조하여 보낸 패킷은 네임스페이스에서 즉시 폐기 |
| **N5** | **심층 방어 (Defense-in-Depth)** | $\\forall p,\\; \\text{In}(p) = \\text{tap0} \\land \\text{Dst}(p) \\in \\text{BLOCKED} \\implies \\neg \\text{NsAccept}(p)$ | 설령 호스트 방화벽이 무력화되어도 게스트 네임스페이스 방화벽이 독자적으로 사설망 접근 차단 |
| **N6** | **호스트 인그레스 & HTTPS 프록시 제한** | **6A**: 호스트 인그레스 IP 대상 비-443/비-TCP 패킷 $\\implies \\neg \\text{HostInputAccept}(p)$<br>**6B**: 프록시 대상 비-443/비-TCP 패킷 $\\implies \\neg \\text{AgoraHttpsAccept}(p)$ | 공개 HTTPS 프록시 예외를 켜더라도 호스트의 SSH(22), HTTP(80) 등 내부 서비스 접근 절대 불가 |
| **N7** | **2계층 엔드투엔드 NAT 합성** | $\\forall p_{\\text{vm}}, p_{\\text{host}},\\; (\\text{Origin}(p_{\\text{vm}}) \\land \\text{NAT}(p_{\\text{vm}}, p_{\\text{host}}) \\land \\text{Dst}(p_{\\text{vm}}) \\in \\text{BLOCKED}) \\implies \\neg(\\text{NsAccept} \\land \\text{HostAccept})$ | 게스트 → 네임스페이스 NAT → veth → 호스트 FORWARD를 거치는 전체 파이프라인에서 차단 대역 누출 제로 |

---

### C. Z3 SMT: 호스트 상태 봉인 및 최소 권한 원칙 ([\`verify_state_confinement.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_state_confinement.py))

| 정리 번호 | 검증 항목 | 논리 명제 (부정 쿼리 → \`UNSAT\` 증명) | 보장하는 실제 보안 속성 |
| :---: | :--- | :--- | :--- |
| **S1** | **경로 정규화 & 심볼릭 링크 배제** | $(\\neg \\text{IsAbsolute} \\lor \\text{HasForbiddenChar} \\lor \\text{SymlinkAncestor} \\lor \\text{SymlinkSubtree}) \\implies \\neg \\text{ValidPath}$ | 상대 경로, 개행/콤마 인젝션, 상위·하위 디렉터리 내 단 하나의 심볼릭 링크도 허용하지 않음 |
| **S2** | **Non-Root & 권한 상승 영구 차단** | $(\\text{UID}=0 \\lor \\text{Caps}\\neq 0 \\lor \\text{NoNewPrivs}\\neq 1 \\lor \\text{Core}\\neq 0 \\lor \\text{Umask}\\neq 0077_8) \\implies \\neg \\text{Confine}$ | VMM 런처는 절대 루트나 Linux Capability를 가질 수 없으며, 코어 덤프 유출 및 권한 상승 불가 |
| **S3** | **파일 타입 화이트리스트 & SUID 차단** | $(\\text{Type} \\notin \\{\\text{REG, DIR, SOCK}\\} \\lor \\text{UID} \\neq \\text{EUID} \\lor (\\text{REG} \\land (\\text{mode}\\,\\&\\,6022_8 \\neq 0 \\lor \\text{nlink} \\neq 1))) \\implies \\neg \\text{Accepted}$ | SUID/SGID 파일, 타인 쓰기 가능 파일, 하드링크, 디바이스/파이프 파일 주입 원천 차단 |
| **S4A** | **루트 상태 디렉터리 \`0700\` 강제** | $(\\text{root\\_mode} \\neq 0700_8 \\lor \\text{root\\_uid} \\neq \\text{euid}) \\implies \\neg \\text{AcceptedRootDir}$ | 상태 루트 디렉터리는 정확히 \`0700\` 모드여야만 하며, \`0755\` 등 조금이라도 열린 권한은 즉시 거부 |
| **S4B** | **서브디렉터리 쓰기 권한 차단** | $(\\text{subdir\\_mode}\\,\\&\\,0022_8 \\neq 0 \\lor \\text{subdir\\_uid} \\neq \\text{euid}) \\implies \\neg \\text{AcceptedSubdir}$ | 상태 폴더 내 모든 하위 디렉터리에 그룹/타인 쓰기 권한 부여 불가 |`,
      },
      {
        id: '8-결론-및-2초-만에-직접-재현해-보기',
        title: '8. 결론 및 2초 만에 직접 재현해 보기',
        level: 1,
        content: `이번 리서치는 두 가지 측면에서 중요한 이정표를 제시합니다.

첫째, **시스템 보안에서의 실용적 정형 검증(Practical Formal Verification)**입니다. 거대한 하이퍼바이저 전체를 증명하느라 수년을 소비하는 대신, 실제로 보안 사고가 가장 많이 발생하는 **오케스트레이션 제어 평면, 방화벽 규칙, 권한 격리 루틴**을 Lean 4와 Z3 SMT로 정밀 타격하여 단기간에 수학적 무결성을 확보했습니다.

둘째, **Gemini 3.8 Flash 기반 멀티 에이전트 협업(\`/teamwork\`)을 통한 '증명의 증명(Meta-Verification)'**입니다. 단일 AI가 작성한 정형 검증 코드에는 여전히 인간의 실수와 유사한 모델링 간극(단일 스텝 가정, 테스트 IP 대역 착오, \`0700\` vs \`0755\` 권한 조건 혼동)이 숨어 있을 수 있습니다. 하지만 **Google Gemini 3.8 Flash**로 구동되는 **탐색관(Explorers) → 엔지니어(Worker) → 리뷰어(Reviewers) → 레드팀 챌린저(Challengers) → 포렌식 및 클린룸 감사관(Auditors)**으로 이어지는 12개의 서브에이전트 파이프라인은 인간 전문가 팀 이상의 집요함으로 모델과 실제 코드 사이의 미세한 틈새를 찾아내고 완벽하게 메웠습니다.

### 🚀 직접 실행해 보기 (Reproduction)

이 모든 수학적 증명과 124개의 적대적 공격 테스트는 슈퍼컴퓨터가 필요하지 않습니다. 이 저장소를 클론한 뒤 터미널에서 아래 명령어를 입력하면 **단 2초 만에** 당신의 컴퓨터에서 모든 증명이 실시간으로 검증됩니다:

\`\`\`bash
# 1. 마스터 정형 검증 스위트 실행 (Lean 4 + Z3 네트워크 + Z3 호스트 보안)
./formal-verification/run_verification.sh

# 2. 레드팀 챌린저의 124개 적대적 공격 쿼리 및 100,000회 상태 전이 스트레스 테스트 실행
uv run --with z3-solver python3 formal-verification/adversarial_challenge.py
PYTHONPATH=. pytest tests/test_manager_capacity_stress.py tests/test_formal_verification_adversarial.py -v
\`\`\`

#### GitHub 리포지토리 및 주요 소스 링크
* 📦 **GitHub 메인 저장소**: [\`weird14446/hypervisor-for-agora\`](https://github.com/weird14446/hypervisor-for-agora)
* 📄 **상세 라인별 감사 보고서**: [\`formal-verification/AUDIT_REPORT.md\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/AUDIT_REPORT.md)
* 📐 **Lean 4 정리 증명 코드**: [\`formal-verification/ManagerCapacity.lean\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/ManagerCapacity.lean)
* 🛡️ **Z3 네트워크 격리 검증기**: [\`formal-verification/verify_network_isolation.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_network_isolation.py)
* 🔒 **Z3 호스트 봉인 검증기**: [\`formal-verification/verify_state_confinement.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/verify_state_confinement.py)
* ⚔️ **레드팀 124개 적대적 검증기**: [\`formal-verification/adversarial_challenge.py\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/adversarial_challenge.py)
* 🏃 **통합 검증 실행 스크립트**: [\`formal-verification/run_verification.sh\`](https://github.com/weird14446/hypervisor-for-agora/blob/main/formal-verification/run_verification.sh)`,
      },
    ],
    references: [
      {
        id: 'ref-1',
        label: '[1]',
        authors: '이인수 (Obtec Research)',
        year: 2026,
        title: 'hypervisor-for-agora: Cloud Hypervisor-based Multi-Tenant Sandbox Orchestration & Formal Verification Suite',
        venue: 'GitHub Repository (weird14446/hypervisor-for-agora)',
        url: 'https://github.com/weird14446/hypervisor-for-agora',
      },
      {
        id: 'ref-2',
        label: '[2]',
        authors: 'de Moura, L., & Ullrich, S.',
        year: 2021,
        title: 'The Lean 4 Theorem Prover and Programming Language',
        venue: 'Automated Deduction – CADE 28 (v4.35.0)',
      },
      {
        id: 'ref-3',
        label: '[3]',
        authors: 'de Moura, L., & Bjørner, N.',
        year: 2008,
        title: 'Z3: An Efficient SMT Solver',
        venue: 'Tools and Algorithms for the Construction and Analysis of Systems (TACAS / v5.3.3.0)',
      },
    ],
  },
];
