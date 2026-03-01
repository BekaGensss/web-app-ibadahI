export type Doa = {
    title: string;
    arabic: string;
    latin: string;
    translation: string;
};

export const doaSalat: Doa[] = [
    {
        title: "Doa Iftitah",
        arabic: "اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا",
        latin: "Allahu akbar kabiira, walhamdu lillaahi katsiira, wa subhaanallaahi bukratan wa asyiilaa.",
        translation: "Allah Maha Besar lagi Sempurna Kebesaran-Nya, segala puji bagi-Nya dan Maha Suci Allah sepanjang pagi dan sore."
    },
    {
        title: "Doa Ruku",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
        latin: "Subhaana rabbiyal 'azhiimi wa bihamdih.",
        translation: "Maha Suci Tuhanku Yang Maha Agung dan pujian untuk-Nya."
    },
    {
        title: "Doa I'tidal",
        arabic: "رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
        latin: "Rabbanaa lakal hamdu mil'us samaawaati wa mil'ul ardhi wa mil'u maa syi'ta min syai'in ba'du.",
        translation: "Ya Tuhan kami, bagi-Mu segala puji, sepenuh langit dan bumi, dan sepenuh apa yang Engkau kehendaki sesudah itu."
    },
    {
        title: "Doa Sujud",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
        latin: "Subhaana rabbiyal a'laa wa bihamdih.",
        translation: "Maha Suci Tuhanku Yang Maha Tinggi dan pujian untuk-Nya."
    },
    {
        title: "Doa Duduk Di Antara Dua Sujud",
        arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
        latin: "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa'aafinii wa'fu 'annii.",
        translation: "Ya Tuhanku, ampunilah aku, rahmatilah aku, perbaikilah keadaanku, tinggikanlah derajatku, berilah rezeki kepadaku, berikanlah petunjuk kepadaku, sehatkanlah aku dan maafkanlah aku."
    },
    {
        title: "Tasyahud (Tahiyat) Akhir",
        arabic: "التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ",
        latin: "At-tahiyyaatul mubaarakaatush shalawaatuth thayyibaatu lillaah. As-salaamu 'alaika ayyuhan nabiyyu wa rahmatullaahi wa barakaatuh. As-salaamu 'alainaa wa 'alaa 'ibaadillaahish shaalihiin.",
        translation: "Segala penghormatan, keberkahan, shalawat dan kebaikan hanya bagi Allah. Semoga kesejahteraan dilimpahkan kepadamu, wahai Nabi, beserta rahmat Allah dan keberkahan-Nya. Semoga kesejahteraan dilimpahkan kepada kami dan kepada hamba-hamba Allah yang saleh."
    },
    {
        title: "Salat Jenazah: Takbir Ke-1 (Al-Fatihah)",
        arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        latin: "Bismillaahir-rahmaanir-rahiim. Al-hamdu lillaahi rabbil-'aalamiin. Ar-rahmaanir-rahiim. Maaliki yaumid-diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinas-shiraathal-mustaqiim. Shiraathal-ladziina an'amta 'alaihim ghairil-maghdhuubi 'alaihim wa lad-dhaalliin.",
        translation: "Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Maha Pemurah lagi Maha Penyayang. Yang menguasai di Hari Pembalasan. Hanya Engkaulah yang kami sembah, dan hanya kepada Engkaulah kami meminta pertolongan. Tunjukilah kami jalan yang lurus. (yaitu) Jalan orang-orang yang telah Engkau beri ni'mat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat."
    },
    {
        title: "Salat Jenazah: Takbir Ke-2 (Shalawat)",
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        latin: "Allaahumma shalli 'alaa Muhammad wa 'alaa aali Muhammad, kamaa shallaita 'alaa Ibraahiima wa 'alaa aali Ibraahiim, innaka hamiidum majiid.",
        translation: "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan kepada keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia."
    },
    {
        title: "Salat Jenazah: Takbir Ke-3 (Doa U/ Jenazah)",
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
        latin: "Allaahummaghfir lahu warhamhu wa 'aafihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bil-maai wats-tsalji wal-barad. (Ganti 'lahu' dengan 'laha' untuk perempuan).",
        translation: "Ya Allah, ampunilah dia, rahmatilah dia, selamatkanlah dia dan maafkanlah dia. Muliakanlah tempat tinggalnya, luaskanlah kuburnya, dan mandikanlah dia dengan air, es, dan embun."
    },
    {
        title: "Salat Jenazah: Takbir Ke-4 (Doa Penutup)",
        arabic: "اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تَفْتِنَّا بَعْدَهُ وَاغْفِرْ لَنَا وَلَهُ",
        latin: "Allaahumma laa tahrimnaa ajrahu wa laa taftinnaa ba'dahu waghfir lanaa wa lahu. (Ganti '-hu' dengan '-ha' untuk perempuan).",
        translation: "Ya Allah, janganlah Engkau haramkan pahalanya bagi kami, janganlah Engkau beri fitnah kepada kami sesudahnya, dan ampunilah kami dan dia."
    },
    {
        title: "Doa Setelah Salat Dhuha",
        arabic: "اللَّهُمَّ إِنَّ الضُّحَاءَ ضُحَاؤُكَ وَالْبَهَاءَ بَهَاؤُكَ وَالْجَمَالَ جَمَالُكَ وَالْقُوَّةَ قُوَّتُكَ وَالْقُدْرَةَ قُدْرَتُكَ وَالْعِصْمَةَ عِصْمَتُكَ اللَّهُمَّ إِنْ كَانَ رِزْقِي فِي السَّمَاءِ فَأَنْزِلْهُ وَإِنْ كَانَ فِي الْأَرْضِ فَأَخْرِجْهُ وَإِنْ كَانَ مُعْسِرًا فَيَسِّرْهُ وَإِنْ كَانَ حَرَامًا فَطَهِّرْهُ وَإِنْ كَانَ بَعِيدًا فَقَرِّبْهُ بِحَقِّ ضُحَائِكَ وَبَهَائِكَ وَجَمَالِكَ وَقُوَّتِكَ وَقُدْرَتِكَ آتِنِي مَا آتَيْتَ عِبَادَكَ الصَّالِحِينَ",
        latin: "Allaahumma innadh dhuhaa-a dhuhaa-uka, wal-bahaa-a bahaa-uka, wal-jamaala jamaaluka, wal-quwwata quwwatuka, wal-qudrata qudratuka, wal-'ishmata 'ishmatuk. Allaahumma in kaana rizqii fis samaa-i fa-anzilhu, wa in kaana fil ardhi fa-akhrijhu, wa in kaana mu'siran fayassirhu, wa in kaana haraaman fathahhirhu, wa in kaana ba'iidan faqarribhu, bihaqqi dhuhaa-ika wa bahaa-ika wa jamaalika wa quwwatika wa qudratika, aatinii maa aataita 'ibaadakash-shaalihiin.",
        translation: "Ya Allah, sesungguhnya waktu Dhuha adalah waktu Dhuha-Mu, keagungan adalah keagungan-Mu, keindahan adalah keindahan-Mu, kekuatan adalah kekuatan-Mu, kekuasaan adalah kekuasaan-Mu, dan penjagaan adalah penjagaan-Mu. Ya Allah, jika rezekiku ada di langit, turunkanlah. Jika ada di bumi, keluarkanlah. Jika sulit, mudahkanlah. Jika haram, sucikanlah. Jika jauh, dekatkanlah. Berkat waktu Dhuha-Mu, keagungan-Mu, keindahan-Mu, kekuatan-Mu, dan kekuasaan-Mu, berikanlah kepadaku apa yang Engkau berikan kepada hamba-hamba-Mu yang saleh."
    },
    {
        title: "Doa Setelah Salat Tahajjud",
        arabic: "اللَّهُمَّ رَبَّنَا لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ وَلَكَ الْحَمْدُ لَكَ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ وَلَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَلَكَ الْحَمْدُ أَنْتَ الْحَقُّ وَوَعْدُكَ الْحَقُّ وَلِقَاؤُكَ حَقٌّ وَقَوْلُكَ حَقٌّ وَالْجَنَّةُ حَقٌّ وَالنَّارُ حَقٌّ وَالنَّبِيُّونَ حَقٌّ وَمُحَمَّدٌ حَقٌّ وَالسَّاعَةُ حَقٌّ",
        latin: "Allaahumma rabbanaa lakal hamd. Anta qayyimus-samaawaati wal-ardhi wa man fiihinn. Wa lakal hamd, laka mulkus-samaawaati wal-ardhi wa man fiihinn. Wa lakal hamd, anta nuurus-samaawaati wal-ardh. Wa lakal hamd, antal-haq, wa wa'dukal-haq, wa liqaa-uka haq, wa qauluka haq, wal-jannatu haq, wan-naaru haq, wan-nabiyyuuna haq, wa Muhammadun haq, was-saa'atu haq.",
        translation: "Ya Allah, Tuhan kami, bagi-Mu segala puji. Engkau adalah penegak langit, bumi, dan apa yang ada di dalamnya. Bagi-Mu segala puji, milik-Mu kerajaan langit, bumi, dan apa yang ada di dalamnya. Bagi-Mu segala puji, Engkau adalah cahaya langit dan bumi. Bagi-Mu segala puji, Engkau adalah Hak (Benar), janji-Mu benar, pertemuan dengan-Mu benar, firman-Mu benar, surga itu benar, neraka itu benar, para nabi itu benar, Nabi Muhammad itu benar, dan hari Kiamat itu benar."
    },
    {
        title: "Doa Salat Istikharah",
        arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ",
        latin: "Allaahumma innii astakhiiruka bi'ilmika, wa astaqdiruka bi qudratika, wa as-aluka min fadhlikal 'azhiim. Fa-innaka taqdiru wa laa aqdiru, wa ta'lamu wa laa a'lamu, wa anta 'allaamul ghuyuub.",
        translation: "Ya Allah, aku memohon petunjuk kebaikan kepada-Mu dengan ilmu-Mu, dan aku memohon kekuatan dengan kekuatan-Mu. Aku memohon kepada-Mu dari karunia-Mu yang agung, karena sesungguhnya Engkau Maha Kuasa sedang aku tidak, Engkau Maha Mengetahui sedang aku tidak, dan Engkau Maha Mengetahui hal-hal yang gaib."
    }
];

export const doaSetelahSalat: Doa[] = [
    {
        title: "Istighfar",
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
        latin: "Astaghfirullaahal 'azhiim alladzii laa ilaaha illaa huwal hayyul qayyuumu wa atuubu ilaih.",
        translation: "Aku memohon ampun kepada Allah Yang Maha Agung, yang tidak ada Tuhan yang berhak disembah selain Dia, Yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertobat kepada-Nya."
    },
    {
        title: "Pujian kepada Allah",
        arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        latin: "Allaahumma antas salaamu wa minkas salaamu tabaarakta yaa dzal jalaali wal ikraam.",
        translation: "Ya Allah, Engkaulah As-Salam (Yang Maha Sejahtera), dan dari-Mu kesejahteraan. Maha Suci Engkau, wahai Tuhan Yang Memiliki Kebesaran dan Kemuliaan."
    },
    {
        title: "Membaca Ayat Kursi",
        arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        latin: "Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta'khudzuhuu sinatuw walaa naum. Lahuu maa fis samaawaati wa maa fil ardh. Man dzal ladzii yasyfa'u 'indahuu illaa bi idznih. Ya'lamu maa baina aidiihim wa maa khalfahum. Wa laa yuhiithuuna bi syai'im min 'ilmihii illaa bimaa syaa'a. Wasi'a kursiyyuhus samaawaati wal ardha wa laa ya'uuduhuu hifzhuhumaa wahuwal 'aliyyul 'azhiim.",
        translation: "Allah, tidak ada Tuhan yang berhak disembah melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya). Tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa'at di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka. Dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi, dan Allah tidak merasa berat memelihara keduanya. Dan Allah Maha Tinggi lagi Maha Besar."
    },
    {
        title: "Doa Keselamatan Dunia Akhirat",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin: "Rabbanaa aatinaa fid dunyaa hasanataw wa fil aakhirati hasanataw wa qinaa 'adzaaban naar.",
        translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari siksa neraka."
    }
];
