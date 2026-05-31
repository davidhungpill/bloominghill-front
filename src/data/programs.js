// 나중에 실제 DB API로 교체 예정인 더미 데이터

const heroImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy4jQDyGTj-vFsPK8wZawxOhiitQcrfVrEvOfkfhIOZgkRQZqLeOVm-7-0_qYXHnye6jpujGI1eUZRRmqPm1AqzBkcpP6PIcpl3Li37z7qHl5bbKg6-A8MZW_e8BzFhT0fzaBJbyy70be2OVFNvYWieJJ4dCdEaCdxFmA4D0sr1VL6rSU-n3ymoUx76fWFlhCu7w8KLTBQMmyYcnqP1PYeLfJ7fIgyFjxIGG9xgGVAEiuUewaJZ3GvU2K5XGU0YB-odatFDAvnapgq'

const detailImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCo-EsX4slUJIKCbLMuu3qJRAUP3-Ehb67GLNVZO_-S-1a5esVp4N_1yVUVZ-txU0Llv2UbbyHqA1e_-0EqPbpPKnseRTk8cwq4DlnCCfnmbrOPx-ChN6C5uV7peq6kPxWIf1QllFzof4OBeBx75r_676eEReaRKfNCGZq8yz94xLU0YcCHVS3RjK9JtaBduQQJTi_vR9I5OxKJ0_1mSdqqUlEEdZkQKinp-G_nMsH0721DZgZ8tqDfOFp8j6vq7iZ3yIUENSAUIEi1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBJSYlTHU6dvGGnIy_QufoHqJv6VmNEWzIkwQMtiqKu-lKVTaRsEObC1RAs9OD9QzT8V4mBdSxupLKWzhrWObnXHW9xK_oLzi4NKmOLFV_Y7jaDXslAtq7hILXoUUwnq8EpkVt0WhG6dE8Vn2MZ9Z6L5rmEtyfuQzcxhG8THEn5nwrNc4CFicZHjybO3RLwkUQcY1xtv4BEG2F_VZJmARC22QUn7YcPOrjvh2OF63n9l1f_g0Uj1jV-7LNGprSO8G6A3Q6eyN3eWJyI',
]

export const programs = [
  {
    id: 1,
    badge: '수강신청',
    badgeColor: 'bg-leaf-green',
    category: '교육소식',
    title: '2026년 봄학기 수강생 모집',
    detailTitle: '[안내] 2026년 봄학기 평생교육원 수강생 모집 및 커리큘럼 안내',
    desc: '필라테스, 라인댄스, 성인 탁구 등 다양한 강좌가 준비되어 있습니다. 활기찬 봄을 꽃재와 함께하세요.',
    date: '2024.05.20',
    views: '1,284',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-BN-Ta176xCNCJ9rk8mwToSIsYIWm-RjERWS0AvrxfuPqWo3xL-SxYidNSIRsXyiwcZSkmryfAqu8CpVt_dDwVexzf3AhfV5Ux0KAHdsfCwXLuEV9IOpDnrIZXCScm1xFq5BvQaowKnryBhGY4BPCw8dCi3QHuzBxYo88Vc0EzegWquqr8MBcKPVAfZH8fRaejh4m4aDYYSF2l-o6fMNh5CSaL3DDgyMX_t5qozn-NhlZQ2rLGCu7rEeML0bKJtceOn2fZJ3-N4N',
    heroImg,
    contentImages: detailImages,
  },
  {
    id: 2,
    badge: '스포츠',
    badgeColor: 'bg-deep-ocean',
    category: '건강강좌',
    title: '성인 탁구 교실',
    detailTitle: '[강좌 안내] 성인 탁구 교실 – 기초반 · 실전반 모집',
    desc: '기초부터 실전 경기까지 전문 강사진과 함께하는 활기찬 탁구 수업입니다.',
    date: '2024.04.10',
    views: '876',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCGoflE23a3di_eFmo4mEfdkHtf68Bt7FW3moyELygqTUkIzn2lVnk3c7KNFuuIfCAju9_-l2-jyM_9Zmp3u_7-VhYIxvIXKQZnOOZt4QyqLlBAnx_j8oLyNyI0TwKZjSUBq1HKIRYW6IcY77bSls5qZsr5K0pc-iYveE-Yz3DgjZkv7NpFusEryQyd9dxyxhy4TGKYU_bppnAL_gw0sfuYVTvFXyrJbjFRYz2yqwv4MX5Dq96qWy0ON5-3RyjMWaIkPjYPOxlXyM7',
    heroImg,
    contentImages: detailImages,
  },
  {
    id: 3,
    badge: '예술/댄스',
    badgeColor: 'bg-tertiary',
    category: '문화예술',
    title: 'K-POP 방송댄스',
    detailTitle: '[강좌 안내] K-POP 방송댄스 – 봄학기 수강생 모집',
    desc: '최신 유행하는 K-POP 안무를 쉽고 재미있게 배워보는 시간입니다. 체력 증진과 스트레스 해소를 동시에!',
    date: '2024.03.25',
    views: '1,102',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkbAn30Bb6FikM7z3rnvNuuiRm7MIX916lNsG-EtB4vUq8y6fpe-kNCwZIoFQMwIUBTboWfFnrLlmE5KDi2eB2Ws-VPtlXwkcBe-DODY7ZFT9xLk2-x73x83wLzmIpn30wj4U3Zn_rfzKG_IDKX1pqprI30PhsmHYBRiJ99ciYLk9m0_-zz-AG2W_xnoFnSc_384VC7k5Jq2rZMEDDOsz_GzswsNWJ4I1ShgWdmZo3GwjNSqLjZlEJzDmb30U7WurSks9Wn9L7VlNB',
    heroImg,
    contentImages: detailImages,
  },
  {
    id: 4,
    badge: '스포츠',
    badgeColor: 'bg-deep-ocean',
    category: '건강강좌',
    title: '코어매트 필라테스',
    detailTitle: '[강좌 안내] 40–60대 맞춤 코어매트 필라테스 모집',
    desc: '무너진 코어 근육을 키워주고 바른 자세를 잡아주는 40-60대 맞춤형 필라테스 강좌입니다.',
    date: '2024.03.12',
    views: '743',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqPMt8qFKcX9A1nmNvdLaIr0zdcXqdMSbqTdAjXqz4KiBXaSISM-EL52mf9y5UCxY3PA3ufbjKssestmo6MuLgXy0sHsv1pigcLme5yUlwUFVW35mmKfKXpqb7TPe19VDx7mInthQjLaJF9dmfR8-c-UbZxSJGmq_0rmLc2mQ8KDfEc8dCliqBGXYCVEKePgMve4Yaw2L2moorD2yPGXNQupPoxRCz_sIPkbhOFwEpDdG4pReOKSwFOA1cHVq4APp1FgG6MLpXtyx8',
    heroImg,
    contentImages: detailImages,
  },
  {
    id: 5,
    badge: '아동/청소년',
    badgeColor: 'bg-warm-accent',
    category: '어린이강좌',
    title: '음악 줄넘기 (7세-초등)',
    detailTitle: '[강좌 안내] 신나는 음악 줄넘기 – 7세~초등학생 모집',
    desc: '신나는 음악과 함께 기초 체력을 다지는 아이들의 성장에 도움을 주는 프로그램입니다.',
    date: '2024.02.28',
    views: '612',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4CodVJrsW2m8zcmn81UFV-BKo9z-c2glqKmGCbfUY0o6sX3lI5KvlSNE6w2hmdCKZr1EKNku5WQj7ndti2pLYEe6n-CyG-7mWfsIuiRAkVBHhrdmLMDKufZwC3PLYLdyUSKCUn4sQImbajsXVL-G7e0edEi8bbda6hekdTQ8D_HfV_rv1vzMnNOK27m-9dhaSoa23h6IA2n0-LraSFB_rloPbubVqR7Ufwg-cN-ds6F0_RjENHWUItgd52tCWwEQR_6HYxXASZD3',
    heroImg,
    contentImages: detailImages,
  },
]

export function getProgramById(id) {
  return programs.find(p => p.id === Number(id)) || null
}
