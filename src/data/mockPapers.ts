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
    id: 'designing-failover-openai-providers',
    slug: 'designing-failover-across-model-providers',
    type: 'report',
    title: 'Designing failover across OpenAI model providers',
    subtitle: 'Why direct OpenAI access matters for previews and critical workloads.',
    // Warm peach/coral abstract gradient artwork matching Screenshot 2026-10-17 at 2.14.49 AM.png
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: 'Oliver Steffmann', affiliation: 'OpenAI Infrastructure Team', role: 'Author' },
      { name: 'Vik Bomma', affiliation: 'OpenAI Solutions Engineering', role: 'Author' },
      { name: '이인수', affiliation: 'Obtec Systems Lab', role: 'Co-Author' },
    ],
    publishedDate: 'Oct 14, 2026',
    journalOrConference: 'OpenAI Engineering & Obtec Systems Joint Technical Report',
    doi: '10.48550/OBTEC.2026.1014',
    category: 'API',
    tags: ['API', 'Failover', 'Codex', 'High Availability', 'Architecture'],
    readTimeMinutes: 8,
    citationCount: 52,
    viewsCount: 6800,
    downloadCount: 1420,
    featured: true,
    abstract: `When a business depends on an AI workflow, even a short provider outage can delay decisions or interrupt services. We've been working with financial services customers building agentic applications and cybersecurity workflows with OpenAI models. This post explains how we approach production routing and recovery for critical workloads, using a read-only fraud assessment in a payments workflow as a running example.

Here, first-party (1P) means the direct OpenAI API; third-party (3P) means OpenAI models accessed through a cloud provider, regardless of where the application runs. We'll cover the value of direct access for preview models and features, how workload needs and private connectivity shape route choice, and which operations can safely fail over. We'll then provide a Codex prompt for implementing the policy in an existing gateway and explain what to validate before enabling failover.`,
    keyContributions: [
      'Active-active failover architecture between direct OpenAI API (1P) and cloud-hosted model endpoints (3P)',
      'Sub-350ms automatic failover recovery time objective (RTO) with zero side-effect degradation',
      'Declarative gateway routing policies for agentic financial transactions and security auditing',
    ],
    pdfDownloadName: 'OBTEC-OpenAI-Failover-Routing.pdf',
    bibtex: `@article{steffmann2026failover,
  title={Designing failover across OpenAI model providers},
  author={Steffmann, Oliver and Bomma, Vik and Lee, Insoo},
  journal={OpenAI Engineering & Obtec Systems},
  year={2026}
}`,
    apaCitation: 'Steffmann, O., Bomma, V., & Lee, I. (2026). Designing failover across OpenAI model providers. OpenAI Engineering.',
    sections: [
      {
        id: 'why-use-both-routes',
        title: 'Why use both routes?',
        level: 1,
        content: `Direct first-party (1P) OpenAI API access enables organizations to immediately leverage preview frontier models, structured outputs, real-time audio/speech streaming, and experimental tool-use capabilities the day they are announced. At the same time, third-party (3P) managed cloud providers allow enterprises with existing sovereign data requirements, enterprise discount commitments, or isolated compliance envelopes to run workloads inside their cloud tenants.

By establishing an active-active dual route, critical agentic services avoid single points of failure. Rather than treating 3P as a passive standby that incurs cold-start latencies, requests are routed proportionally based on workload characteristics and operational health telemetry.`
      },
      {
        id: 'planned-routing-and-failover',
        title: 'Planned routing and failover',
        level: 1,
        content: `Planned routing uses deterministic routing rules based on model capability tiers and tenant sensitivity. For instance, sensitive payment transaction data can be designated for regional private endpoints, while fast reasoning extraction routes through the lowest-latency edge endpoint.

When anomalies occur—such as upstream connection resets, surging P99 response latencies ($>1,500\\text{ms}$), or consecutive HTTP 503 Service Unavailable responses—the routing layer dynamically trips its circuit breaker and sheds non-essential traffic to the alternate provider.`
      },
      {
        id: 'where-the-router-fits',
        title: 'Where the router fits',
        level: 1,
        content: `The failover router operates at the ingress gateway layer (such as Envoy, Kong, or an internal reverse proxy) rather than within individual client application code. This architecture offers three primary advantages:

1. **Zero Client Changes**: Internal microservices simply send standard OpenAI SDK requests to a unified corporate endpoint (e.g. \`https://ai-gateway.internal/v1\`).
2. **Centralized Token & Rate Limiting**: Token consumption quotas and budget caps are enforced across all model providers uniformly.
3. **Telemetry & Audit Logging**: Request payloads, latency breakdowns, and routing decisions are systematically logged for PCI-DSS and SOC2 compliance.`
      },
      {
        id: 'private-connectivity-and-route-choice',
        title: 'Private connectivity and route choice',
        level: 1,
        content: `Many regulated institutions mandate that outbound internet traffic cannot carry unmasked customer account numbers or PII. For these workloads, private connectivity such as AWS PrivateLink or Azure ExpressRoute guarantees that network packets never traverse the public internet.

Conversely, for low-latency batch processing or public data summaries, direct 1P connectivity over optimized Anycast edges minimizes routing hops and yields up to 40% lower time-to-first-token (TTFT).`
      },
      {
        id: 'which-operations-can-fail-over',
        title: 'Which operations can fail over?',
        level: 1,
        content: `Not every AI request is safe for instant automated failover. We classify operations into two distinct tiers:

- **Idempotent (Safe to Fail Over)**: Read-only summarization, classification, fraud score evaluation, vector embeddings, and zero-shot entity extraction. If a timeout occurs on 1P, the gateway can replay the identical request to 3P without corrupting downstream state.
- **Stateful (Requires Coordination)**: Long multi-turn agent sessions maintaining ephemeral server-side context, prompt caching keys, or streaming file uploads. These require session migration protocols or localized checkpoint recovery before rerouting.`
      },
      {
        id: 'when-and-how-to-fail-over',
        title: 'When and how to fail over',
        level: 1,
        content: `A critical mistake in failover architecture is failing over on transient HTTP 429 rate limit errors. A 429 indicates model concurrency saturation rather than an outage; failing over simultaneously can cause a thundering herd that knocks down the secondary provider as well.

Instead, failover should trigger strictly on:
1. Consecutive network connection timeouts (e.g., 3 consecutive 2,000ms TCP connect timeouts).
2. Unhealthy synthetic canary health checks executed every 5 seconds.
3. Sustained HTTP 5xx responses exceeding a 2% sliding error window.`
      },
      {
        id: 'implement-the-failover-policy-with-codex',
        title: 'Implement the failover policy with Codex',
        level: 1,
        content: `Engineering teams can rapidly generate and test gateway failover rules using Codex or agentic coding assistants. By providing the API gateway configuration schema and specifying target retry envelopes, circuit breaker decay rates, and fallback priority lists, teams can deploy validated routing filters in minutes with automated unit tests for timeout edge cases.`
      },
      {
        id: 'validate-routes-and-recovery',
        title: 'Validate routes and recovery',
        level: 1,
        content: `Failover mechanisms that are never exercised in production inevitably fail during genuine crises. We recommend implementing scheduled chaos experiments:

- Injecting artificial 5,000ms latency on the primary provider route to confirm seamless background hedged requests.
- Simulating DNS resolution failure to verify fallback resolution.
- Validating that client SDKs receive seamless streaming responses even as backend provider switching takes place.`
      },
      {
        id: 'who-owns-recovery',
        title: 'Who owns recovery',
        level: 1,
        content: `Clear operational ownership ensures that incident response proceeds without ambiguity. Platform SRE owns gateway availability, circuit breaker thresholds, and health telemetry, while Application teams own prompt degradation strategies and fallback response definitions when both providers experience degraded capacity.`
      },
      {
        id: 'conclusion',
        title: 'Conclusion',
        level: 1,
        content: `Designing multi-provider failover for mission-critical AI workflows is an essential milestone in the evolution of enterprise production intelligence. By coupling first-party innovation velocity with cloud provider enterprise guarantees, businesses can build dependable, resilient AI systems that withstand disruptions without compromising performance.`
      }
    ],
    references: [
      { id: 'ref-1', label: '[1]', authors: 'OpenAI Infrastructure Team', year: 2026, title: 'High Availability Production Routing for Generative AI Workflows', venue: 'OpenAI Engineering Blog', url: 'https://openai.com/index/engineering' },
      { id: 'ref-2', label: '[2]', authors: 'Obtec Distributed Systems Lab', year: 2026, title: 'Active-Active Gateway Circuit Breaker Patterns in Latency-Critical Microservices', venue: 'Obtec Research Technical Reports', url: 'https://obtec.org/research' }
    ]
  },
  {
    id: 'mambaformer-v3',
    slug: 'mambaformer-v3-linear-state-space',
    type: 'paper',
    title: 'MambaFormer-V3: 선형 상태 공간 모델과 쿼터니언 셀프 어텐션의 융합을 통한 O(N) 초대규모 시퀀스 학습',
    subtitle: 'O(N) Complexity Attention via State-Space Duality and Quaternion Tensor Decomposition',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: '이인수', affiliation: 'Obtec Research AI Lab', role: 'Lead Author' },
      { name: 'Obtec Systems Team', affiliation: 'Obtec Research', role: 'Co-Author' },
    ],
    publishedDate: '2026.03.28',
    journalOrConference: 'Obtec Research Proceedings / Nature Machine Intelligence 2026',
    doi: '10.48550/OBTEC.2026.0328',
    category: '컴퓨터 과학',
    tags: ['인공신경망', 'MambaFormer', '선형 어텐션', '초대규모 시퀀스', 'O(N)'],
    readTimeMinutes: 12,
    citationCount: 48,
    viewsCount: 3420,
    downloadCount: 890,
    featured: false,
    abstract: '기존 트랜스포머의 $O(N^2)$ 계산 복잡도는 수백만 토큰 규모의 긴 컨텍스트 추론에서 치명적인 메모리 병목을 유발합니다. 본 연구에서는 선택적 상태 공간 모델(Selective State Space Model)의 순환적 압축 능력과 쿼터니언 대수 공간에서의 회전 셀프 어텐션을 결합한 MambaFormer-V3 아키텍처를 제안합니다. 실험 결과, 100만 토큰 시퀀스에서 기존 트랜스포머 대비 메모리 사용량을 87% 감축하면서도 바늘 찾기(Needle-in-a-Haystack) 벤치마크 99.8% 정확도를 달성했습니다.',
    keyContributions: [
      '상태 공간 이중성(SSD)과 4차원 쿼터니언 텐서 분해를 융합한 선형 복잡도 $O(N)$ 주의 집중 레이어 설계',
      '하드웨어 친화적 커널 퓨전(Kernel Fusion) 기법을 통한 SRAM 캐시 미스 72% 감축',
      '1M 토큰 롱 컨텍스트 추론에서 트랜스포머 대비 4.2배 빠른 처리량 달성',
    ],
    pdfDownloadName: 'OBTEC-2026-MambaFormer-V3.pdf',
    bibtex: `@article{obtec2026mambaformer,
  title={MambaFormer-V3: Linear State-Space Attention},
  author={Lee, Insoo and Obtec Systems Team},
  journal={Obtec Research Publications},
  year={2026}
}`,
    apaCitation: '이인수, Obtec Systems Team. (2026). MambaFormer-V3: 선형 상태 공간 모델과 쿼터니언 셀프 어텐션의 융합. Obtec Research Proceedings.',
    sections: [
      {
        id: 'sec-mamba-intro',
        title: '서론 및 연구 배경 (Introduction)',
        level: 1,
        content: '인공지능 모델의 컨텍스트 윈도우 확장은 차세대 과학 추론과 복합 소프트웨어 합성의 핵심 전제조건입니다. 그러나 표준 어텐션 매트릭스 $A = \\mathrm{softmax}(QK^T / \\sqrt{d_k})$는 시퀀스 길이 $N$에 대해 $O(N^2)$의 메모리를 점유하므로 한계에 직면해 있습니다.'
      },
      {
        id: 'sec-quaternion-ssm',
        title: '선형 상태 공간 모델과 쿼터니언 대수',
        level: 1,
        content: '본 논문에서는 연속 시간 상태 방정식 $\\dot{h}(t) = Ah(t) + Bx(t)$를 쿼터니언 군 $\\mathbb{H}$ 상에서 이산화(Discretization)하여 다차원 피처 상관관계를 단일 스캔으로 연산하는 방식을 확립했습니다.'
      },
      {
        id: 'sec-hybrid-kernel',
        title: '하드웨어 친화적 커널 퓨전과 계산 복잡도',
        level: 1,
        content: 'SRAM 캐시 미스를 최소화하기 위해 FlashAttention의 타일링 기법을 쿼터니언 실수/허수부 행렬 곱셈에 맞춤 설계했습니다. GPU HBM과의 데이터 교환 횟수를 대폭 줄여 전력 대비 연산 효율을 극대화했습니다.'
      },
      {
        id: 'sec-empirical-eval',
        title: '실험 결과 및 벤치마크 분석',
        level: 1,
        content: '100만 토큰 길이의 Needle-in-a-Haystack 테스트에서 MambaFormer-V3는 검색 정확도 99.8%를 유지하며, 표준 LLaMA 구조 대비 메모리 소비량을 87% 절감하는 쾌거를 달성했습니다.'
      },
      {
        id: 'sec-mamba-conclusion',
        title: '결론 및 향후 연구 과제',
        level: 1,
        content: '선형 상태 공간 모델과 대수적 어텐션 메커니즘의 결합은 초대규모 추론 비용을 획기적으로 낮추는 차세대 파운데이션 아키텍처의 강력한 초석이 될 것입니다.'
      }
    ],
    references: []
  },
  {
    id: 'hbm4-hybrid-bonding',
    slug: 'hbm4-16hi-hybrid-bonding-thermodynamics',
    type: 'report',
    title: '16단 적층 HBM4 인터포저 하이브리드 본딩 및 2,048-bit 마이크로범프 열역학적 신뢰성 평가',
    subtitle: 'Copper-to-Copper Direct Hybrid Bonding Reliability for Next-Gen AI Accelerators',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: '이인수', affiliation: 'Obtec Semiconductor Research Center', role: 'Lead Researcher' },
      { name: '고급 패키징 연구팀', affiliation: 'Obtec Research', role: 'Co-Author' },
    ],
    publishedDate: '2026.03.14',
    journalOrConference: 'Obtec Advanced Semiconductor Technical Report Vol. 8',
    doi: '10.48550/OBTEC.2026.0314',
    category: '반도체',
    tags: ['반도체', 'HBM4', '하이브리드 본딩', '인터포저', '열역학'],
    readTimeMinutes: 10,
    citationCount: 31,
    viewsCount: 2890,
    downloadCount: 740,
    abstract: '차세대 거대언어모델 학습 가속기를 위한 16-Hi 적층 HBM4의 2,048-bit 와이드 버스 인터페이스 환경에서, Cu-Cu 다이렉트 하이브리드 본딩(Direct Hybrid Bonding)과 초박막 실리콘 인터포저의 열-기계적 변형(Warpage) 및 신뢰성을 시뮬레이션하고 실측 검증한 기술 보고서입니다.',
    keyContributions: [
      '16단 적층 고대역폭 메모리의 3.2TB/s 대역폭 달성을 위한 2,048-bit 버스 배선 모델 수립',
      'Cu-Cu 다이렉트 본딩 접합부의 250°C 열 사이클링 피로 저항성 수치해석 완료',
      '기존 마이크로범프 대비 접합 피치를 10μm 이하로 축소하여 기생 인덕턴스 65% 저감',
    ],
    pdfDownloadName: 'OBTEC-2026-HBM4-Report.pdf',
    bibtex: `@techreport{obtec2026hbm4,
  title={HBM4 16-Hi Hybrid Bonding Reliability},
  author={Lee, Insoo and Packaging Lab},
  institution={Obtec Semiconductor Research Center},
  year={2026}
}`,
    apaCitation: '이인수, 고급 패키징 연구팀. (2026). 16단 적층 HBM4 인터포저 하이브리드 본딩 열역학적 신뢰성 평가. Obtec Advanced Semiconductor Technical Report.',
    sections: [
      {
        id: 'sec-hbm4-overview',
        title: 'HBM4 차세대 패키징 개요',
        level: 1,
        content: '인공지능 가속기의 연산 처리량이 지수적으로 급증함에 따라 메모리 벽(Memory Wall) 현상을 타개하기 위한 2,048-bit 베이스 다이 직결 HBM4 구조가 필수적으로 요구되고 있습니다.'
      },
      {
        id: 'sec-hybrid-thermodynamics',
        title: 'Cu-Cu 다이렉트 하이브리드 본딩 수치해석',
        level: 1,
        content: '마이크로범프를 배제하고 산화막과 구리 패드를 직접 결합하는 하이브리드 본딩 공정에서 열팽창 계수(CTE) 불일치로 인한 전단 응력을 유한요소해석(FEA)을 통해 정밀 모델링했습니다.'
      },
      {
        id: 'sec-warpage-reliability',
        title: '열 사이클링 피로 저항성 및 휨(Warpage) 측정',
        level: 1,
        content: '-40°C에서 +125°C에 이르는 1,500회 열충격 사이클 시험 후에도 접합 계면의 균열이나 보이드 형성 없이 안정적인 옴(Ohmic) 접촉 저항을 유지했습니다.'
      },
      {
        id: 'sec-hbm4-conclusion',
        title: '양산성 평가 및 결론',
        level: 1,
        content: '초박형 CMP 연마 공정 최적화를 통해 수율 94% 이상을 달성할 수 있는 공정 마진을 확보했으며, 향후 차세대 가속기 상용화에 결정적 토대를 마련했습니다.'
      }
    ],
    references: []
  },
  {
    id: 'symplectic-nbody-dynamics',
    slug: 'symplectic-integrator-nbody-chaos-dynamics',
    type: 'paper',
    title: '고차 심플렉틱 적분기를 활용한 외계 행성계 다체(N-Body) 중력 공명과 카오스 궤도 안정성 해석',
    subtitle: 'Symplectic Geometric Integrations for Millennial Orbital Resonance in Multi-Planet Systems',
    coverImage: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: '이인수', affiliation: 'Obtec Theoretical Physics Group', role: 'Author' },
    ],
    publishedDate: '2026.02.21',
    journalOrConference: 'Obtec Physical Review Letters 2026',
    doi: '10.48550/OBTEC.2026.0221',
    category: '물리학',
    tags: ['물리학', '천체역학', '심플렉틱 적분', 'N체 시뮬레이션', '카오스'],
    readTimeMinutes: 14,
    citationCount: 64,
    viewsCount: 4120,
    downloadCount: 1120,
    abstract: '태양계 및 외계 행성계의 백만 년 단위 장기 궤도 안정성을 보존하기 위해 해밀토니안 보존 법칙을 오차 없이 준수하는 6차 심플렉틱 룽게-쿠타 적분기(Symplectic Runge-Kutta)를 개발했습니다. 라그랑주 삼체 문제의 궤도 공명 붕괴 임계점을 해석학적으로 도출했습니다.',
    keyContributions: [
      '심플렉틱 기하학(Symplectic Geometry)에 기반한 위상 공간 체적 보존 적분 알고리즘 구현',
      '행성 간 3:2 및 2:1 평균 운동 공명(MMR) 영역에서의 카오스 확산 시간 계산',
      '에너지 오차 누적을 $10^{-12}$ 수준으로 억제하며 수억 년 단위 궤도 적분 가속',
    ],
    pdfDownloadName: 'OBTEC-2026-Symplectic-Nbody.pdf',
    bibtex: `@article{obtec2026symplectic,
  title={Symplectic Integrators for Exoplanetary Chaos},
  author={Lee, Insoo},
  journal={Obtec Physical Review},
  year={2026}
}`,
    apaCitation: '이인수. (2026). 고차 심플렉틱 적분기를 활용한 외계 행성계 다체 중력 공명과 카오스 궤도 안정성 해석. Obtec Physical Review.',
    sections: [
      {
        id: 'sec-hamiltonian',
        title: '해밀토니안 역학 및 위상 공간 보존',
        level: 1,
        content: '천체 다체계의 운동은 정준 변수 $(q, p)$에 대해 해밀토니안 $H(q, p) = T(p) + V(q)$로 기술되며, 수치 적분 시 심플렉틱 2차 형식 $\\omega = \\sum dq_i \\wedge dp_i$가 반드시 보존되어야 합니다.'
      },
      {
        id: 'sec-orbital-resonance',
        title: '외계 행성계 궤도 공명과 리아푸노프 시간',
        level: 1,
        content: '인접한 거대 가스 행성 간의 3:2 공명대 진입 시 섭동 항에 의해 궤도 이심률이 급격히 증가하며, 카오스적 궤도 이탈을 예측하는 리아푸노프(Lyapunov) 시간 척도를 계산했습니다.'
      },
      {
        id: 'sec-chaos-simulation',
        title: '1억 년 단위 고속 수치 시뮬레이션',
        level: 1,
        content: '표준 룽게-쿠타 방식과 달리 심플렉틱 6차 적분기는 1억 년 장기 시뮬레이션에서도 에너지 오차가 주기적으로 진동할 뿐 영구적인 수치 감쇠를 유발하지 않음을 확인했습니다.'
      }
    ],
    references: []
  },
  {
    id: 'school-of-athens-column',
    slug: 'raphael-school-of-athens-ai-frontier',
    type: 'column',
    title: '라파엘로 <아테네 학당>이 21세기 AI 연구소에 던지는 질문: 다학제적 융합과 지식의 지평',
    subtitle: 'From Platonism to Empiricism: Synthesizing First-Principles Physics with Deep Learning',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=85',
    authors: [
      { name: '이인수', affiliation: 'Obtec Research', role: 'Columnist / Researcher' },
    ],
    publishedDate: '2026.02.04',
    journalOrConference: 'Obtec Research Horizon Column Essay #03',
    doi: '10.48550/OBTEC.2026.0204',
    category: 'etc.',
    tags: ['연구원 칼럼', '아테네 학당', '과학철학', '지식의 지평', '다학제'],
    readTimeMinutes: 7,
    citationCount: 19,
    viewsCount: 5600,
    downloadCount: 420,
    abstract: '하늘을 가리키는 플라톤의 연역적 이상주의와 땅을 향해 손을 뻗는 아리스토텔레스의 귀납적 실증주의는 오늘날 과학 기반 인공지능(AI for Science) 연구소에서 어떻게 화해하고 있는가? 물리학 제1원리와 대규모 데이터 주도형 학습이 만나는 지점에서 진정한 혁신이 태동한다는 연구원의 철학적 에세이입니다.',
    keyContributions: [
      '르네상스 인문학적 성찰을 21세기 거대 인공지능 연구 패러다임에 투영',
      '순수 물리학 법칙(제1원리)과 데이터 기반 통계적 학습의 상호보완적 융합 논증',
      '전문성 분절화를 극복하기 위한 다학제 연구소 문화의 본질 고찰',
    ],
    pdfDownloadName: 'OBTEC-2026-Athens-Column.pdf',
    bibtex: `@article{obtec2026athens,
  title={Raphael's School of Athens and 21st Century AI},
  author={Lee, Insoo},
  journal={Obtec Research Column},
  year={2026}
}`,
    apaCitation: '이인수. (2026). 라파엘로 <아테네 학당>이 21세기 AI 연구소에 던지는 질문. Obtec Research Horizon Column.',
    sections: [
      {
        id: 'sec-prologue',
        title: '바티칸 궁전 서명의 방에 서서',
        level: 1,
        content: '라파엘로 산치오가 1511년에 완성한 프레스코화 <아테네 학당> 중앙에는 두 거인이 나란히 서 있습니다. 한 손에 『티마이오스』를 든 플라톤은 하늘을 가리키고, 『니코마코스 윤리학』을 든 아리스토텔레스는 대지를 향해 손바닥을 펴고 있습니다.'
      },
      {
        id: 'sec-platonic-deduction',
        title: '연역적 제1원리와 귀납적 데이터의 충돌',
        level: 1,
        content: '수학적 대칭성과 물리 보존 법칙을 절대적 진리로 여기는 플라톤적 관점과, 관측 데이터의 통계적 패턴만을 신뢰하는 아리스토텔레스적 경험주의는 현대 인공신경망 연구실에서도 매일같이 치열하게 맞부딪히고 있습니다.'
      },
      {
        id: 'sec-synthesis-horizon',
        title: '새로운 르네상스를 향한 다학제적 종합',
        level: 1,
        content: '진정한 학문의 도약은 두 시선이 교차하는 지점에서 발생합니다. 물리학적 불변량(Invariance)을 신경망 귀납 편향(Inductive Bias)으로 내재화할 때, 우리는 비로소 환각 없는 과학 파운데이션 모델을 목도하게 될 것입니다.'
      }
    ],
    references: []
  }
];
