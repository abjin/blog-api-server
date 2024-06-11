import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AppCommand {
  constructor(private readonly prismaService: PrismaService) {}

  @Command({ command: 'add:seed' })
  async addSeedData() {
    try {
      await this._addSeedData();
      console.log('add seed data success');
    } catch (e) {
      console.log(e);
      console.log('add seed data fail');
    }
  }

  private async _addSeedData() {
    await this.prismaService.category.createMany({ data: categories });
    await this.prismaService.post.createMany({
      data: [...introPosts, ...servicePosts, ...examplePosts, ...noticePosts],
    });
  }
}

const categories = [
  {
    id: 'INTRO',
    title: '회사소개',
  },
  {
    id: 'SERVICE',
    title: '서비스',
  },
  {
    id: 'EXAMPLE',
    title: '구축사례',
  },
  {
    id: 'NOTICE',
    title: '공지사항',
  },
];

const introPosts = [
  {
    title: '회사소개',
    image:
      'https://t3.ftcdn.net/jpg/03/22/77/08/360_F_322770818_s4h1v5sg2qI8OSSNOc3wCK82Zfqx5TBn.jpg',
    content: `### [회사명] 소개

[회사명]은 최첨단 기술과 탁월한 고객 서비스를 통해 업계를 선도하는 글로벌 통신 회사입니다. 저희 회사는 고객의 다양한 통신 요구를 충족시키기 위해 혁신적인 솔루션과 광범위한 서비스를 제공하고 있습니다. 5G 네트워크, 초고속 인터넷, 안정적인 음성 통화 및 데이터 서비스를 포함하여 고객이 필요로 하는 모든 통신 서비스를 하나의 플랫폼에서 제공합니다.

#### 회사 역사

[회사명]은 [설립 연도]에 설립된 이래, 꾸준한 성장과 혁신을 통해 통신 업계에서 확고한 위치를 차지해 왔습니다. 설립 초기부터 저희는 최고의 기술과 서비스 품질을 목표로 삼아, 지속적인 연구개발과 투자를 아끼지 않았습니다. 그 결과, 현재 [회사명]은 글로벌 통신 시장에서 신뢰받는 리더로 자리매김하고 있습니다.

#### 핵심 서비스

1. **5G 네트워크**: [회사명]은 가장 빠르고 안정적인 5G 네트워크를 구축하여 고객에게 초고속 데이터 전송 속도와 최소한의 지연을 제공합니다. 이를 통해 다양한 IoT 기기와 스마트폰 사용자가 원활한 연결을 즐길 수 있습니다.

2. **초고속 인터넷**: 저희의 초고속 인터넷 서비스는 가정과 기업 모두에게 안정적이고 빠른 인터넷 연결을 제공합니다. 다양한 요금제와 맞춤형 솔루션을 통해 고객의 필요에 맞춘 최적의 서비스를 제공합니다.

3. **음성 통화 및 메시징**: [회사명]은 전통적인 음성 통화와 메시징 서비스에서도 최고의 품질을 자랑합니다. 끊김 없는 통화 품질과 다양한 부가 서비스를 통해 고객의 커뮤니케이션을 지원합니다.

4. **클라우드 및 데이터 서비스**: 클라우드 기반의 데이터 저장 및 관리 서비스를 통해 기업 고객이 효율적으로 데이터를 관리하고, 언제 어디서나 안전하게 접근할 수 있도록 돕습니다.

#### 고객 서비스

고객 만족은 [회사명]의 최우선 과제입니다. 24시간 고객 지원 센터를 운영하여 고객의 문의와 문제를 신속하게 해결하고 있습니다. 또한, 고객의 피드백을 적극 반영하여 서비스 개선에 최선을 다하고 있습니다. 저희는 고객과의 신뢰를 바탕으로 한 장기적인 관계를 구축하고자 노력합니다.

#### 사회적 책임

[회사명]은 기업의 사회적 책임을 다하기 위해 다양한 사회 공헌 활동을 진행하고 있습니다. 친환경 기술 개발, 디지털 격차 해소를 위한 교육 프로그램 지원, 지역 사회와의 협력 등을 통해 지속 가능한 미래를 위한 노력을 아끼지 않습니다.

#### 미래 비전

[회사명]은 미래의 통신 환경을 선도하기 위해 끊임없는 혁신과 도전을 계속할 것입니다. 차세대 네트워크 기술, 인공지능(AI), 사물인터넷(IoT) 등의 신기술을 활용하여 고객에게 더 나은 통신 경험을 제공할 것입니다. 또한, 글로벌 시장에서의 확장을 통해 전 세계 고객에게 최상의 서비스를 제공하고자 합니다.

[회사명]은 언제나 고객과 함께 성장하며, 신뢰받는 통신 파트너로서의 역할을 다할 것입니다. 앞으로도 최고의 기술과 서비스를 통해 고객의 기대를 뛰어넘는 가치를 제공하기 위해 최선을 다하겠습니다.`,
    categoryId: 'INTRO',
  },
];

const servicePosts = [
  {
    title: '5G 네트워크',
    image:
      'https://img.freepik.com/free-vector/modern-5g-concept-background_23-2148262311.jpg',
    content:
      '5G 네트워크: [회사명]은 가장 빠르고 안정적인 5G 네트워크를 구축하여 고객에게 초고속 데이터 전송 속도와 최소한의 지연을 제공합니다. 이를 통해 다양한 IoT 기기와 스마트폰 사용자가 원활한 연결을 즐길 수 있습니다.',
    categoryId: 'SERVICE',
  },
  {
    title: '초고속 인터넷',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTQ2VaF8Sc2DJW88xB4o7_jyYqhVPEI1CNQ&s',
    content:
      '**초고속 인터넷**: 저희의 초고속 인터넷 서비스는 가정과 기업 모두에게 안정적이고 빠른 인터넷 연결을 제공합니다. 다양한 요금제와 맞춤형 솔루션을 통해 고객의 필요에 맞춘 최적의 서비스를 제공합니다.',
    categoryId: 'SERVICE',
  },
  {
    title: '음성 통화 및 메시징',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUHDNgkPpY49JouCy4kWg7FKW9ohWIsdrmA&s',
    content:
      '**음성 통화 및 메시징**: [회사명]은 전통적인 음성 통화와 메시징 서비스에서도 최고의 품질을 자랑합니다. 끊김 없는 통화 품질과 다양한 부가 서비스를 통해 고객의 커뮤니케이션을 지원합니다.',
    categoryId: 'SERVICE',
  },
  {
    title: '클라우드 및 데이터 서비스',
    image:
      'https://www.lgcns.com/wp-content/uploads/2021/11/995A7F3B5EC23D4832.png',
    content:
      '**클라우드 및 데이터 서비스**: 클라우드 기반의 데이터 저장 및 관리 서비스를 통해 기업 고객이 효율적으로 데이터를 관리하고, 언제 어디서나 안전하게 접근할 수 있도록 돕습니다.',
    categoryId: 'SERVICE',
  },
];

const examplePosts = [
  {
    categoryId: 'EXAMPLE',
    title: '도시 중심가 5G 네트워크 구축 프로젝트',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbTAwpLw8NXZUJfjkoK4t5J-tTdCumQf5kA&s',
    content:
      '[회사명]은 최근 도시 중심가의 5G 네트워크 구축을 완료했습니다. 이 프로젝트는 지역 경제 활성화와 스마트 시티 구현을 위한 중요한 단계로, 5G 네트워크를 통해 시민들이 초고속 인터넷과 다양한 스마트 서비스를 이용할 수 있게 되었습니다. 설치 과정에서 기존 인프라와의 호환성을 고려하여 최소한의 중단으로 공사를 진행했으며, 지역 주민들과의 소통을 통해 불편을 최소화했습니다. 이 프로젝트를 통해 도시의 디지털 전환이 가속화될 것으로 기대됩니다.',
  },
  {
    categoryId: 'EXAMPLE',
    title: '산업 단지 5G 네트워크 확장',
    image: 'https://cdn.hkbs.co.kr/news/photo/201907/521743_280289_722.jpg',
    content:
      '[회사명]은 주요 산업 단지에 5G 네트워크를 확장하는 프로젝트를 성공적으로 완료했습니다. 이 프로젝트는 첨단 제조업과 물류 산업의 생산성을 높이기 위해 추진되었습니다. 5G 네트워크는 자율주행 차량, 로봇 공학, 실시간 데이터 분석 등 다양한 스마트 기술을 지원합니다. 이번 확장을 통해 산업 단지 내 기업들은 더욱 효율적이고 안전한 작업 환경을 구축할 수 있게 되었으며, 이를 통해 전체 생산성이 크게 향상될 것으로 기대됩니다.',
  },
  {
    categoryId: 'EXAMPLE',
    title: '농촌 지역 5G 네트워크 도입',
    image: 'https://www.nbnnews.co.kr/news/photo/202212/723416_725481_0009.jpg',
    content:
      '[회사명]은 농촌 지역에 5G 네트워크를 도입하는 프로젝트를 성공적으로 완료했습니다. 이 프로젝트는 디지털 격차를 해소하고 농업 혁신을 지원하기 위해 추진되었습니다. 5G 네트워크는 정밀 농업, 원격 진료, 온라인 교육 등 다양한 서비스를 가능하게 하여 농촌 주민들의 생활 수준을 향상시키고 있습니다. 또한, 농업 생산성 증대와 스마트 농업 기술의 적용을 통해 지역 경제 발전에도 기여하고 있습니다.',
  },
  {
    categoryId: 'EXAMPLE',
    title: '대규모 스포츠 경기장 5G 네트워크 구축',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkHHaD9Q8OREwTboGRYwhsdUXZE4s3TUi6aQ&s',
    content:
      '[회사명]은 대규모 스포츠 경기장에 5G 네트워크를 구축하는 프로젝트를 완료했습니다. 이 프로젝트는 경기장을 찾는 관객들에게 초고속 인터넷과 실시간 스트리밍 서비스를 제공하기 위해 추진되었습니다. 5G 네트워크는 경기 중 실시간 데이터를 활용한 다양한 서비스를 가능하게 하여 관객들에게 더욱 풍부한 경험을 제공합니다. 또한, 경기장 내부의 안전 및 관리 시스템에도 5G 기술을 적용하여 더욱 효율적인 운영이 가능해졌습니다.',
  },
  {
    categoryId: 'EXAMPLE',
    title: '항만 지역 5G 네트워크 설치',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCy7-PfAVIar4ghnFpfau0YLehtrhbmdGTmA&s',
    content:
      '[회사명]은 주요 항만 지역에 5G 네트워크를 설치하는 프로젝트를 성공적으로 완료했습니다. 이 프로젝트는 항만 물류의 효율성을 극대화하고 스마트 항만 구현을 위해 추진되었습니다. 5G 네트워크는 자율 주행 차량, 드론, 실시간 물류 추적 시스템 등을 지원하여 항만 운영의 자동화와 최적화를 가능하게 합니다. 이를 통해 항만의 처리 능력이 크게 향상되고, 글로벌 물류 네트워크의 중심지로서의 경쟁력이 강화되었습니다.',
  },
];

const noticePosts = [
  {
    categoryId: 'NOTICE',
    title: '여름 맞이 5G 서비스 대폭 할인 이벤트!',
    image:
      'https://t3.ftcdn.net/jpg/02/66/10/90/360_F_266109081_22a0UNlYqLGh3vin77zsPlpINnHC6Bgy.jpg',
    content:
      '<p>뜨거운 여름, [회사명]과 함께 시원하게 즐기세요! 여름을 맞이하여 5G 서비스 신규 가입 고객을 대상으로 특별 할인 이벤트를 진행합니다. 초고속 5G 네트워크를 저렴한 가격에 이용할 수 있는 절호의 기회, 놓치지 마세요!</p><p><strong>이벤트 기간</strong>: 2024년 7월 1일 ~ 2024년 8월 31일</p><p><strong>이벤트 내용</strong>:</p><ul><li>5G 서비스 신규 가입 시, 첫 3개월 요금 50% 할인</li><li>기존 고객 추천 시, 추천인과 신규 가입자 모두에게 추가 1개월 무료 서비스 제공</li><li>데이터 무제한 요금제 가입 시, 무료 모바일 액세서리 증정</li></ul><p><strong>참여 방법</strong>:</p><ol><li>[회사명] 공식 홈페이지 또는 가까운 매장에서 5G 서비스 신규 가입</li><li>기존 고객의 추천을 받은 경우, 추천인의 ID를 입력</li><li>가입 완료 후, 혜택 자동 적용</li></ol><p>올 여름, [회사명]의 초고속 5G 네트워크로 더 즐겁고 편리한 모바일 라이프를 경험하세요!</p>',
  },
  {
    categoryId: 'NOTICE',
    title: '5G 네트워크 확대 기념! 특별 할인 이벤트',
    image:
      'https://img.freepik.com/free-vector/gradient-summer-illustration_23-2148946644.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717977600&semt=sph',
    content:
      '<p>[회사명]은 여러분의 성원에 힘입어 5G 네트워크를 전국으로 확장했습니다. 이를 기념하여, 신규 및 기존 고객 모두에게 특별 할인 혜택을 드리는 이벤트를 마련했습니다. 더욱 빠르고 안정적인 5G 서비스를 더욱 저렴하게 이용하세요!</p><p><strong>이벤트 기간</strong>: 2024년 6월 15일 ~ 2024년 7월 31일</p><p><strong>이벤트 내용</strong>:</p><ul><li>신규 가입 고객: 5G 요금제 첫 2개월 30% 할인</li><li>기존 고객: 5G 요금제 업그레이드 시, 업그레이드 요금 20% 할인</li><li>모든 고객: 이벤트 기간 중 5G 서비스 사용 시, 매주 추첨을 통해 최신 스마트폰 증정</li></ul><p><strong>참여 방법</strong>:</p><ol><li>[회사명] 공식 홈페이지 또는 모바일 앱에서 이벤트 참여 신청</li><li>신규 가입 시, 할인 혜택 자동 적용</li><li>기존 고객은 요금제 업그레이드 시 할인 코드 입력</li></ol><p>5G 네트워크 확대 기념으로 더욱 강력해진 [회사명]의 서비스와 함께 하세요! 지금 바로 신청하고 다양한 혜택을 누리세요!</p>',
  },
];
