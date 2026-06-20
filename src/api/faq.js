import { strapiGet } from './client'
import { blocksToHtml } from '../utils/blocksToHtml'

const FALLBACK = [
  {
    question: '후원금은 투명하게 쓰이나요?',
    answer: `사단법인 꽃재의 재무운영은 4단계의 감사시스템을 거칩니다.<br><br>
1. 법인이사회 감사<br>
2. 외부추천감사의 내부감사<br>
3. 외부회계법인의 감사<br>
4. 정부 감사(보건복지부, 국세청, 관할지자체 등)<br><br>
또한 연 1회 연간보고서를 발간해 진행된 사업결과를 보고합니다.`,
  },
  {
    question: '기부금은 세액공제 받을 수 있나요?',
    answer: `꽃재는 법인세법 시행령 제 36조에 근거한 사회복지법인으로 지정기부금단체이며, 다음과 같이 세액공제 혜택을 받으실 수 있습니다.<br><br>
- 본인 근로소득 금액의 30% 한도 내에서 기부금의 15% 세액공제 (1,000만원 초과분은 30%)<br>
- 법인의 경우 기부금의 10% 세액공제`,
  },
  {
    question: '기부금영수증은 어떻게 받을 수 있나요?',
    answer: `<p class="font-bold text-on-surface mb-2">1. 국세청 홈텍스 홈페이지에서 확인</p>
<p class="mb-4">- 주민번호가 등록되어있는 개인후원자의 기부내역을 국세청으로 신고해드립니다. 연초 연말정산 간소화 서비스를 통해 확인 가능합니다.</p>
<p class="font-bold text-on-surface mb-2">2. 꽃재 홈페이지에서 발급</p>
<p class="mb-4">- [마이페이지] &gt; [나의후원] &gt; [기부금영수증출력] 메뉴에서 1월 10일부터 5월 31일 사이 출력이 가능합니다.</p>
<p class="font-bold text-on-surface mb-2">3. 전화신청</p>
<p>- 기업 및 법인 후원자의 경우 종합소득세 신고 기간에 직접 연락주시면 발급해드립니다.</p>`,
  },
  {
    question: '후원자 명의를 변경하여 기부금영수증을 발급받을 수 있나요?',
    answer: `아니요. 기부금영수증은 등록된 후원자님의 명의로만 발급됩니다. 허위 발급 시 소득세법 81조에 근거하여 법적처벌을 받게 되며, 타인명의 변경은 불가능합니다.<br><br>
단, 기본공제대상자(직계존속, 형제자매 포함)의 경우 명의변경 없이도 세액공제를 받을 수 있으며, 자녀 이름으로 후원한 경우 자녀 명의로 발급된 영수증을 부모님이 공제 받을 수 있습니다.`,
  },
  {
    question: '정보를 변경하고 싶어요.',
    answer: `전화번호, 주소, 계좌번호 등 개인정보 변경을 원하실 경우 홈페이지 또는 대표전화(1577-9044)를 통해 언제든지 요청하실 수 있습니다.`,
  },
  {
    question: '현물후원이 가능한가요?',
    answer: `네, 가능합니다. 쌀, 생필품 등 후원해주신 물품은 어려운 이웃들에게 소중히 전달됩니다. 현물후원 신청 및 상세 안내는 대표번호 1577-9044로 문의 주시기 바랍니다.`,
  },
]

export async function fetchFaqs() {
  try {
    const { data } = await strapiGet('/faqs?sort=order:asc')
    // Strapi v5: no .attributes wrapper
    return data.map(item => ({
      question: item.question,
      answer: blocksToHtml(item.answer),
    }))
  } catch {
    return import.meta.env.DEV ? FALLBACK : []
  }
}
