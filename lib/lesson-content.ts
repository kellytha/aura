export const lessonLanguages = [
  { code: "en", name: "English" },
  { code: "af", name: "Afrikaans" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" },
  { code: "nso", name: "Sepedi" },
  { code: "st", name: "Sesotho" },
  { code: "tn", name: "Setswana" },
  { code: "ss", name: "siSwati" },
  { code: "ve", name: "Tshivenda" },
  { code: "ts", name: "itsonga" },
  { code: "nr", name: "isiNdebele" },
] as const;

export type LessonLanguageCode = (typeof lessonLanguages)[number]["code"];
export type LessonId =
  | "budget"
  | "emergency-savings"
  | "bank-fees"
  | "stokvel-habits"
  | "borrowing"
  | "money-scams";

export const lessonDetailCopy: Record<
  LessonLanguageCode,
  { tryTitle: string; tryText: string; disclaimer: string }
> = {
  en: {
    tryTitle: "A small step to try",
    tryText: "Choose one idea from this lesson and see how it fits your own circumstances. There is no need to share personal financial details.",
    disclaimer: "For general learning only—not personal financial advice.",
  },
  af: {
    tryTitle: "’n Klein stap om te probeer",
    tryText: "Kies een idee uit hierdie les en kyk hoe dit by jou omstandighede pas. Jy hoef nie persoonlike finansiële besonderhede te deel nie.",
    disclaimer: "Slegs vir algemene leerdoeleindes—nie persoonlike finansiële advies nie.",
  },
  zu: {
    tryTitle: "Isinyathelo esincane ongazama",
    tryText: "Khetha umqondo owodwa kulesi sifundo ubone ukuthi uhambisana kanjani nezimo zakho. Akudingeki wabelane ngemininingwane yakho yezimali.",
    disclaimer: "Okokufunda nje kuphela—akusona iseluleko sezimali esiqondene nawe.",
  },
  xh: {
    tryTitle: "Inyathelo elincinci onokulizama",
    tryText: "Khetha ingcamango enye kwesi sifundo uze ubone ukuba ihambelana njani neemeko zakho. Akuyomfuneko ukwabelana ngenkcukacha zakho zemali.",
    disclaimer: "Yeyokufunda ngokubanzi kuphela—ayilongcebiso yemali yobuqu.",
  },
  nso: {
    tryTitle: "Kgato ye nnyane ye o ka e lekago",
    tryText: "Kgetha kgopolo e tee go tšwa thutong ye gomme o bone gore e swanela maemo a gago bjang. Ga go nyakege gore o abelane ka dintlha tša gago tša ditšhelete.",
    disclaimer: "Ke ya go ithuta ka kakaretšo feela—ga se keletšo ya ditšhelete ya gago.",
  },
  st: {
    tryTitle: "Mohato o monyenyane oo u ka o lekang",
    tryText: "Khetha mohopolo o le mong thutong ena ’me u bone hore na o lumellana joang le maemo a hao. Ha ho hlokahale hore u arolelane lintlha tsa hao tsa lichelete.",
    disclaimer: "Ke bakeng sa thuto e akaretsang feela—ha se keletso ea hao ea lichelete.",
  },
  tn: {
    tryTitle: "Kgato e nnye e o ka e lekang",
    tryText: "Tlhopha kakanyo e le nngwe mo thutong eno mme o bone gore e tsamaisana jang le maemo a gago. Ga go tlhokege gore o abelane ka dintlha tsa gago tsa madi.",
    disclaimer: "Ke ya go ithuta ka kakaretso fela—ga se kgakololo ya gago ya madi.",
  },
  ss: {
    tryTitle: "Sinyatselo lesincane longasizama",
    tryText: "Khetsa umcondvo munye kulesifundvo ubone kutsi uhambisana njani netimo takho. Akudzingeki wabelane ngemininingwane yakho yetimali.",
    disclaimer: "Kufundza nje kuphela—akusiso seluleko sakho setimali.",
  },
  ve: {
    tryTitle: "Vhukando vhuṱuku vhune na nga lingedza",
    tryText: "Khethani muhumbulo muthihi kha heyi ngudo ni vhone uri u tendelana hani na vhuimo haṋu. A zwi ṱoḓei uri ni kovhekane nga ha mafhungo aṋu a zwa tshelede.",
    disclaimer: "Ndi zwa u guda nga u angaredza fhedzi—a si nyeletshedzo yaṋu ya zwa tshelede.",
  },
  ts: {
    tryTitle: "Ku ringeta magoza lamatsongo",
    tryText: "Hlawula mianakanyo yin’we eka dyondzo leyi u vona leswaku yi fambisana ku yini ni xiyimo xa wena. A swi bohi ku avelana vuxokoxoko bya wena bya timali.",
    disclaimer: "I ku dyondza hi ku angarhela ntsena—a hi xitsundzuxo xa wena xa timali.",
  },
  nr: {
    tryTitle: "Isinyathelo esincani ongasizama",
    tryText: "Khetha umqondo owodwa esifundweni lesi ubone ukuthi uhambisana njani nobujamo bakho. Akutlhogeki wabelane ngemininingwana yakho yemali.",
    disclaimer: "Kufundisa ngokujayelekileko kwaphela—akusiso iseluleko sakho sezimali.",
  },
};

type Lesson = {
  id: LessonId;
  minutes: number;
  title: Record<LessonLanguageCode, string>;
  body: Record<LessonLanguageCode, string>;
};

export const lessons: Lesson[] = [
  {
    id: "budget",
    minutes: 4,
    title: {
      en: "Make a budget in Rand",
      af: "Maak ’n begroting in rand",
      zu: "Yenza isabelomali ngamarandi",
      xh: "Yenza uhlahlo lwabiwo-mali ngeerandi",
      nso: "Dira tekanyetšo ka diranta",
      st: "Etsa tekanyetso ka diranta",
      tn: "Dira tekanyetsokabo ka diranta",
      ss: "Yakha ibhajethi ngemaRandi",
      ve: "Itani bajeti nga dziRandi",
      ts: "Endla bajete hi tirhandi",
      nr: "Yenza isabelomali ngamaRandi",
    },
    body: {
      en: "Start with the money you expect to receive this month. List essentials such as food, transport, rent and electricity, then include saving and any debt payments. Subtract your planned spending from your income. If the amount is below zero, adjust flexible costs before the month begins. Review your plan each week; a budget is a guide, not a punishment.",
      af: "Begin met die geld wat jy hierdie maand verwag. Lys noodsaaklikhede soos kos, vervoer, huur en elektrisiteit, en sluit dan spaargeld en skuldpaaiemente in. Trek jou beplande uitgawes van jou inkomste af. As die bedrag negatief is, pas buigsame uitgawes aan voordat die maand begin. Gaan jou plan elke week na; ’n begroting is ’n riglyn, nie ’n straf nie.",
      zu: "Qala ngemali olindele ukuyithola kule nyanga. Bhala izidingo ezifana nokudla, izinto zokuhamba, irenti nogesi, bese ufaka ukonga nezinkokhelo zezikweletu. Susa izindleko ozihlelile emalini oyitholayo. Uma imali isiba ngaphansi kukaziro, lungisa izindleko ongazishintsha ngaphambi kokuqala kwenyanga. Buyekeza uhlelo lwakho masonto onke; isabelomali siyisiqondiso, hhayi isijeziso.",
      xh: "Qala ngemali olindele ukuyifumana kule nyanga. Dwelisa izinto ezibalulekileyo ezifana nokutya, uhambo, irente nombane, uze ufake ukonga neentlawulo zamatyala. Thabatha iindleko ozicwangcisileyo kumvuzo wakho. Ukuba imali iba ngaphantsi kweqanda, lungisa iindleko onokuzitshintsha ngaphambi kokuqala kwenyanga. Hlola isicwangciso sakho qho ngeveki; uhlahlo lwabiwo-mali sisikhokelo, ayisosohlwayo.",
      nso: "Thoma ka tšhelete yeo o letetšego go e amogela kgweding ye. Ngwala dinyakwa tša bohlokwa tše bjalo ka dijo, dinamelwa, rente le mohlagase, gomme o akaretše go boloka le ditefelo tša dikoloto. Ntšha ditshenyegelo tšeo o di rulagantšego letseno la gago. Ge palo e le ka tlase ga lefela, fokotša ditshenyegelo tšeo o ka di fetolago pele kgwedi e thoma. Hlahloba moralo wa gago beke le beke; tekanyetšo ke tlhahlo, ga se kotlo.",
      st: "Qala ka chelete eo u lebeletseng ho e fumana khoeling ena. Ngola lintho tsa bohlokoa tse kang lijo, lipalangoang, rente le motlakase, ebe u kenyelletsa chelete ea poloko le litefo tsa likoloto. Ntša litšenyehelo tseo u li rerileng moputsong oa hao. Ha chelete e le ka tlaase ho lefela, fokotsa litšenyehelo tseo u ka li fetolang pele khoeli e qala. Hlahloba moralo oa hao beke le beke; tekanyetso ke tataiso, ha se kotlo.",
      tn: "Simolola ka madi a o solofetseng go a amogela mo kgweding eno. Kwala ditlhoko tsa botlhokwa jaaka dijo, dipalangwa, rente le motlakase, mme o akaretse go boloka le dituelo tsa dikoloto. Ntsha ditshenyegelo tse o di rulagantseng mo lotsenong lwa gago. Fa madi a nna ka fa tlase ga lefela, fokotsa ditshenyegelo tse o ka di fetolang pele kgwedi e simolola. Sekaseka leano la gago beke le beke; tekanyetsokabo ke kaelo, ga se kotlhao.",
      ss: "Cala ngemali lolindzele kuyitfola kulenyanga. Bhala tidzingo letibalulekile njengakudla, kuhamba, irenti kanye nemagetsi, bese ufaka imali yekonga netinkhokhelo tetikweleti. Susa tindleko lozihlelile emalini yakho. Nangabe imali iba ngaphansi kwa-zero, lungisa tindleko longatishintja ngaphambi kwekutsi inyanga icale. Hlola lisu lakho njalo ngeliviki; ibhajethi iyinkhombandlela, ayisiso sijeziso.",
      ve: "Thomani nga tshelede ine na lavhelela u i wana kha uno ṅwedzi. Ṅwalani zwine zwa ṱoḓea u fana na zwiliṅwa, vhuendi, rente na muḓagasi, ni katelese u vhulunga na u badela zwikolodo. Bvisani zwine na pulana u zwi shumisa kha tshelede ine na i wana. Arali masalela a vha nga fhasi ha zero, shandukisani izwo zwine na nga zwi shandukisa musi ṅwedzi u sa athu thoma. Sedzani pulane yaṋu vhege iṅwe na iṅwe; bajeti ndi nḓila ya u ni thusa, a si ṱhamu.",
      ts: "Sungula hi mali leyi u languteleke ku yi kuma eka n’hweti leyi. Tsala swilaveko swo fana ni swakudya, swo famba, rhente na gezi, kutani u katsa ku hlayisa mali ni ku hakela swikweleti. Susa leswi u kunguhateke ku swi tirhisa eka mali leyi u yi kumaka. Loko ntsengo wu va ehansi ka ziro, cinca leswi u nga kotaka ku swi cinca n’hweti yi nga si sungula. Languta pulani ya wena vhiki rin’wana ni rin’wana; bajete i nkongomiso, a hi nxupulo.",
      nr: "Thoma ngemali olindele ukuyithola enyangeni le. Tlola izinto eziqakathekileko ezifana nokudla, ukukhamba, irente namkha igezi, ufake imali yokonga neembhadelo zeenkolodo. Susa iindleko ozihlelileko emalini oyitholako. Nangabe imali iba ngaphasi kweqanda, lungisa iindleko ongazitjhugululako ngaphambi kokuthoma kwenyanga. Buyekeza ihlelo lakho qobe veke; isabelomali sisinqophiso, akusisijeziso.",
    },
  },
  {
    id: "emergency-savings",
    minutes: 4,
    title: {
      en: "Save for the unexpected",
      af: "Spaar vir onverwagte uitgawes",
      zu: "Londolozela izimo ezingalindelekile",
      xh: "Yongela iimeko ezingalindelekanga",
      nso: "Bolokela tše di sa letelwago",
      st: "Boloka bakeng sa tse sa lebelloang",
      tn: "Bolokela tse o sa di solofelang",
      ss: "Beka imali yetimo letingakalindzeleki",
      ve: "Vhulungelani zwine na sa zwi lavheleli",
      ts: "Hlayisela leswi u nga swi langutelang",
      nr: "Yongela ubujamo obungalindelekiko",
    },
    body: {
      en: "An emergency fund can help with an unexpected trip to a clinic, a repair or a short gap in income. Choose a small amount that fits your budget, even R20 a week, and put it somewhere separate from everyday spending. Add to it when you can. If you need to use it, that is what it is for; make a new plan to build it again.",
      af: "’n Noodfonds kan help met ’n onverwagte kliniekbesoek, ’n herstelwerk of ’n kort tyd sonder inkomste. Kies ’n klein bedrag wat by jou begroting pas, selfs R20 per week, en hou dit apart van jou daaglikse geld. Voeg by wanneer jy kan. As jy dit moet gebruik, is dit waarvoor dit bedoel is; maak daarna ’n nuwe plan om dit weer op te bou.",
      zu: "Isikhwama sezimo eziphuthumayo singasiza ngohambo olungalindelekile oluya emtholampilo, ukulungisa into ephukile noma isikhathi esifushane ungenayo imali engenayo. Khetha imali encane ehambisana nesabelomali sakho, ngisho uR20 ngesonto, uyibeke eceleni kwemali oyisebenzisa nsuku zonke. Yengeze uma ukwazi. Uma uyisebenzisa, yilokho eyenzelwe kona; hlela ukuyakha kabusha.",
      xh: "Ingxowa yemali engxamisekileyo inokunceda ngohambo olungalindelekanga oluya ekliniki, ukulungisa into eyonakeleyo okanye ixesha elifutshane ungenamvuzo. Khetha imali encinci ehambelana nohlahlo lwabiwo-mali lwakho, nokuba yiR20 ngeveki, uyibeke yodwa kwimali oyisebenzisa mihla le. Yongeza xa unako. Ukuba kufuneka uyisebenzise, yenzelwe loo nto; cwangcisa ukuyakha kwakhona.",
      nso: "Sekhwama sa tšhoganetšo se ka thuša ge o swanetše go ya kliniking o sa letela, go lokiša selo goba go phela nakonyana o se nago letseno. Kgetha tšhelete ye nnyane yeo e lekanago le tekanyetšo ya gago, le ge e ka ba R20 ka beke, gomme o e boloke ka thoko ga tšhelete ya tšatši le tšatši. E oketše ge o kgona. Ge o e diriša, ke ka lebaka leo e lego gona; rulaganya go e aga gape.",
      st: "Letlole la maemo a tšohanyetso le ka thusa ka leeto le sa lebelloang la tleliniking, tokiso kapa nako e khutšoanyane u se na chelete. Khetha chelete e nyenyane e lumellanang le tekanyetso ea hao, leha e ka ba R20 ka beke, ’me u e boloke ka thōko ho chelete ea letsatsi le letsatsi. E eketse ha u khona. Ha u e sebelisa, ke sona seo e etselitsoeng sona; rera ho e haha hape.",
      tn: "Letlole la tshoganyetso le ka thusa fa go nna le loeto lo o sa lo solofelang kwa tleliniking, go baakanya sengwe kgotsa paka e khutshwane o se na lotseno. Tlhopha madi a mannye a a lekanang le tekanyetsokabo ya gago, le fa e ka nna R20 ka beke, mme o a beye kgakala le a letsatsi le letsatsi. O a oketse fa o kgona. Fa o tshwanetse go a dirisa, ke ka moo a leng teng; rulaganya go a aga gape.",
      ss: "Imali yetimo letiphutfumako ingasita ngeluhambo lolungakalindzeleki lokuya emtholampilo, kulungisa lokonakele noma sikhatsi lesifisha ungayitfoli imali. Khetsa linani lelincane lelingena kubhajethi yakho, ngisho kungu-R20 ngeliviki, ulibeke eceleni kwemali yemalanga onkhe. Yengeze nawukwati. Nangabe kudzingeka uyisebentise, yentelwe loko; hlela kuyakha kabusha.",
      ve: "Tshelede ya u vhulungela zwiimo zwa tshihaḓu i nga thusa kha lwendo lu songo lavhelelwaho u ya kiliniki, u lugisa tshithu kana tshifhinga tshiṱuku ni si na mbuelo. Khethani tshelede ṱhukhu ine ya tendelana na bajeti yaṋu, naho i nga vha R20 nga vhege, ni i vhulunge kule na ine na shumisa ḓuvha ḽiṅwe na ḽiṅwe. I engedzeni musi ni tshi kona. Arali na i shumisa, ndi zwenezwo zwe ya itelwa zwone; pulanani u i fhaṱa hafhu.",
      ts: "Ndhawu yo hlayisela mali ya swiyimo swa xihatla yi nga pfuna loko u fanele ku ya ekhilikini handle ko swi langutela, ku lunghisa lexi onhakeke kumbe ku heta nkarhi wo koma u nga ri na muholo. Hlawula mali leyitsongo leyi fambisanaka ni bajete ya wena, hambi ku ri R20 hi vhiki, u yi veka ekule ni mali ya siku ni siku. Yi engetele loko u swi kota. Loko u fanele ku yi tirhisa, hi swona leswi yi endleriweke swona; kunguhata ku tlhela u yi aka.",
      nr: "Isikhwama semali yesikhathi esiphuthumako singakusiza ngohambo olungalindelekiko lokuya ekliniki, ukulungisa into ephukileko namkha isikhathi esifitjhani unganamali engenako. Khetha imali encani evumelana nesabelomali sakho, ngitjho noR20 ngeveke, uyibeke kude nemali oyisebenzisa qobe langa. Yengeze nawukghonako. Nawutlhoga ukuyisebenzisa, ngilokho eyenzelwe khona; hlela ukuyakha godu.",
    },
  },
  {
    id: "bank-fees",
    minutes: 3,
    title: {
      en: "Understand banking fees",
      af: "Verstaan bankfooie",
      zu: "Qonda izindleko zasebhange",
      xh: "Qonda imirhumo yebhanki",
      nso: "Kwešiša ditefo tša panka",
      st: "Utloisisa litefiso tsa banka",
      tn: "Tlhaloganya dituelo tsa banka",
      ss: "Yati imali yasebhange",
      ve: "Pfesesani mitengo ya bannga",
      ts: "Twisisa tihakelo ta bangi",
      nr: "Zwisisisa iindleko zebhanga",
    },
    body: {
      en: "Check your account's fee list for monthly charges, cash withdrawals, transfers and card purchases. A R10 fee paid five times is R50, so small charges add up. Compare the fee with the service you use and ask your provider about lower-cost options. Never share your PIN or one-time password with anyone offering to remove a fee.",
      af: "Gaan jou rekening se fooilys na vir maandelikse koste, kontantonttrekkings, oorplasings en kaartbetalings. ’n Fooi van R10 wat vyf keer betaal word, is R50; klein fooie tel dus op. Vergelyk die koste met die diens wat jy gebruik en vra jou verskaffer oor goedkoper keuses. Moet nooit jou PIN of eenmalige wagwoord deel met iemand wat aanbied om ’n fooi te verwyder nie.",
      zu: "Hlola uhlu lwezindleko ze-akhawunti yakho ukuze ubone izindleko zenyanga, ukukhipha imali, ukudlulisa imali nokusebenzisa ikhadi. Imali enguR10 ekhokhwa izikhathi ezinhlanu iba uR50, ngakho izindleko ezincane ziyahlangana. Qhathanisa izindleko nensizakalo oyisebenzisayo, ubuze umhlinzeki ngezindlela ezishibhile. Ungalokothi wabelane nge-PIN noma ngephasiwedi yesikhathi esisodwa.",
      xh: "Jonga uluhlu lweendleko zeakhawunti yakho ukuze ubone iintlawulo zenyanga, ukutsala imali, ukuthumela imali nokusebenzisa ikhadi. Umrhumo weR10 ohlawulwe izihlandlo ezihlanu uba yiR50, ngoko ke imirhumo emincinci iyadibana. Thelekisa umrhumo nenkonzo oyisebenzisayo uze ubuze umboneleli ngeendlela ezingabizi kakhulu. Ungaze wabelane ngePIN okanye ngephasiwedi yexesha elinye.",
      nso: "Lekola lenaneo la ditefo tša akhaonte ya gago go bona ditefo tša kgwedi, go ntšha tšhelete, go romela tšhelete le go reka ka karata. Tefelo ya R10 ge e lefišwa ga hlano ke R50, ka fao ditefo tše dinyenyane di a oketšega. Bapetša tefelo le tirelo yeo o e dirišago gomme o botšiše mofani ka dikgetho tša go se bitše kudu. O se ke wa abelana PIN goba khoutu ya sephiri le motho.",
      st: "Sheba lethathamo la litefiso tsa akhaonto ea hao ho bona litefiso tsa khoeli, ho ntša chelete, ho romela chelete le ho lefa ka karete. Tefiso ea R10 e lefuoang ka makhetlo a mahlano ke R50, kahoo litefiso tse nyenyane lia eketseha. Bapisa tefiso le tšebeletso eo u e sebelisang ’me u botse mofani ka likhetho tse theko e tlaase. U se ke ua arolelana PIN kapa khoutu ea lekunutu.",
      tn: "Leba lenaane la dituelo tsa akhaonto ya gago go bona dituelo tsa kgwedi, go ntsha madi, go romela madi le go reka ka karata. Tuelo ya R10 e e duelelwang makgetlo a le matlhano ke R50; ka jalo dituelo tse dinnye di a kokoana. Bapisa tuelo le tirelo e o e dirisang mme o botse mofani ka dikgetho tse di sa tureng. O se ka wa abelana PIN kgotsa khoutu ya sephiri.",
      ss: "Hlola luhlu lwemali ye-akhawunti yakho kute ubone tinkhokhelo tenyanga, kukhipha imali, kutfumela imali nekutsenga ngekhadi. Imali lengu-R10 lekhokhwa kahlanu iba ngu-R50, ngako-ke tindleko letincane tiyahlangana. Catsanisa imali nensitafo loyisebentisako bese ubuta umniketi ngetindlela letishibhile. Ungacali wabelane nge-PIN noma ngekhodi yemfihlo.",
      ve: "Sedzani mutevhe wa mitengo ya akhaunthu yaṋu u vhone mitengo ya ṅwedzi, u bvisa tshelede, u rumela tshelede na u badela nga garaṱa. Mutengo wa R10 u badelwaho luṱanu ndi R50, zwenezwo mitengo miṱuku i a kuvhangana. Vhambedzani mutengo na tshumelo ine na i shumisa ni vhudzise muṋetshedzi nga ha dziṅwe nḓila dzi sa duri. Ni songo kovhekana PIN kana khoudu ya tshiphiri.",
      ts: "Languta nxaxamelo wa tihakelo ta akhawunti ya wena ku vona tihakelo ta n’hweti, ku humesa mali, ku rhumela mali na ku hakela hi khadi. Hakelo ya R10 leyi hakeriwaka ka ntlhanu i R50, kutani tihakelo letitsongo ta hlengeletana. Ringanisa hakelo ni vukorhokeri byo byi tirhisa u tlhela u vutisa muphakeri hi tindlela leti nga duriki. U nga tshuki u avelana PIN kumbe khodi ya xihundla.",
      nr: "Qala irhelo leendleko ze-akhawunti yakho ukuze ubone iindleko zenyanga, ukukhupha imali, ukuthumela imali nokuthenga ngekhadi. Umrhumo weR10 obhadalwa iinkhathi ezihlanu uba yiR50, ngalokho iindleko ezincani ziyahlangana. Madanisa umrhuwo nenkonzo oyisebenzisako ubuze umnikezeli ngeendlela ezingabizi khulu. Ungabelani nge-PIN namkha ikhowudi eyifihlo.",
    },
  },
  {
    id: "stokvel-habits",
    minutes: 4,
    title: {
      en: "Build safe stokvel habits",
      af: "Bou veilige stokvelgewoontes",
      zu: "Yakha imikhuba ephephile ye-stokvel",
      xh: "Yakha imikhwa ekhuselekileyo ye-stokvel",
      nso: "Tlwaetša mekgwa ye bolokegilego ya stokvel",
      st: "Haha mekhoa e sireletsehileng ea stokvel",
      tn: "Tlwaela mekgwa e e babalesegileng ya stokvel",
      ss: "Yakha imikhuba lephephile ye-stokvel",
      ve: "Dzulani ni na maitele a stokvel o tsireledzeaho",
      ts: "Aka mikhuva yo hlayiseka ya stokvel",
      nr: "Yakha imikhuba evikelekileko ye-stokvel",
    },
    body: {
      en: "Before joining a stokvel, understand its written rules: how much each member contributes, when payments are due, who keeps records and how decisions are made. Keep your own proof of every payment and check that the group record matches. Discuss missed contributions respectfully and agree on a fair process together. Never contribute money you need for essentials.",
      af: "Verstaan die skriftelike reëls voordat jy by ’n stokvel aansluit: hoeveel elke lid bydra, wanneer betalings verskuldig is, wie rekords hou en hoe besluite geneem word. Hou jou eie bewys van elke betaling en kyk dat dit met die groep se rekord ooreenstem. Bespreek laat bydraes met respek en stem saam oor ’n billike proses. Moet nooit geld bydra wat jy vir noodsaaklikhede nodig het nie.",
      zu: "Ngaphambi kokujoyina i-stokvel, qonda imithetho ebhaliwe: ilungu ngalinye lifaka malini, izinkokhelo zidingeka nini, ubani ogcina amarekhodi nokuthi izinqumo zenziwa kanjani. Gcina obakho ubufakazi benkokhelo ngayinye bese uqinisekisa ukuthi amarekhodi eqembu ayahambisana. Xoxani ngokungakhokhi ngesikhathi ngenhlonipho nivumelane ngenqubo efanele. Ungalokothi ufake imali oyidingela izidingo ezibalulekile.",
      xh: "Ngaphambi kokujoyina i-stokvel, qonda imithetho ebhaliweyo: ilungu ngalinye lifaka malini, iintlawulo kufuneka nini, ngubani ogcina iirekhodi nendlela ekwenziwa ngayo izigqibo. Gcina obakho ubungqina bentlawulo nganye uze ujonge ukuba iirekhodi zeqela ziyangqinelana. Thethani ngeentlawulo eziphosiweyo ngentlonipho nivumelane ngenkqubo enobulungisa. Musa ukufaka imali oyidinga kwizinto ezibalulekileyo.",
      nso: "Pele o tsenela stokvel, kwešiša melao yeo e ngwadilwego: setho se sengwe le se sengwe se ntšha bokae, ditefo di swanetše go dirwa neng, ke mang yo a bolokago direkhoto le gore diphetho di dirwa bjang. Boloka bohlatse bja gago bja tefelo e nngwe le e nngwe gomme o lekole gore rekoto ya sehlopha e a swana. Boledišanang ka go se lefe ka nako ka tlhompho gomme le dumelelaneng ka mokgwa wa toka. O se ke wa ntšha tšhelete yeo o e hlokago bakeng sa dinyakwa.",
      st: "Pele u kenela stokvel, utloisisa melao e ngotsoeng: setho ka seng se kenya bokae, litefo li lokela ho etsoa neng, ke mang ea bolokang lirekoto le hore na liqeto li etsoa joang. Boloka bopaki ba hao ba tefo ka ’ngoe ’me u hlahlobe hore rekoto ea sehlopha ea tšoana. Buisanang ka litefo tse fositseng ka tlhompho ’me le lumellane ka mokhoa o lokileng. U se ke ua kenya chelete eo u e hlokang bakeng sa lintho tsa bohlokoa.",
      tn: "Pele o tsena mo stokvel, tlhaloganya melao e e kwadilweng: leloko lengwe le lengwe le ntsha bokae, dituelo di tshwanetse go dirwa leng, ke mang yo o bolokang direkoto le gore ditshwetso di dirwa jang. Boloka bosupi jwa gago jwa tuelo nngwe le nngwe mme o tlhomamise gore rekoto ya setlhopha e a dumalana. Buisanang ka dituelo tse di fositsweng ka tlotlo mme lo dumalane ka tsamaiso e e siameng. O se ka wa ntsha madi a o a tlhokang mo ditlhokegong tsa botlhokwa.",
      ss: "Ngaphambi kwekutsi ujoyine i-stokvel, condza imitsetfo lebhaliwe: lilunga ngalinye lifaka malini, tinkhokhelo kufanele tenteke nini, ngubani logcina emarekhodi nekutsi tincumo tentiwa kanjani. Gcina bufakazi bakho benkhokhelo ngayinye uhlole kutsi lirekhodi lelicembu liyafanana. Khulumisanani ngetinkhokhelo letingakentiwa ngenhlonipho nivumelane ngenqubo lelungile. Ungafaki imali loyidzingela tidzingo letibalulekile.",
      ve: "Musi ni sa athu u dzhenela stokvel, pfesesani milayo yo ṅwaliwaho: muraḓo muṅwe na muṅwe u shela vhugai, zwipiḓa zwa u badela ndi lini, ndi nnyi ane a vhulunga rekhodo na uri phetho dzi dzhiiwa hani. Vhulungani vhuṱanzi ha u badela huṅwe na huṅwe nahone ni sedze uri rekhodo ya tshigwada i a tendelana. Ambani nga ha u lenga u shela nga ṱhonifho ni tendelane nga maitele a teaho. Ni songo shela tshelede ine na i ṱoḓa kha zwine zwa ṱoḓea.",
      ts: "Loko u nga si joyina stokvel, twisisa milawu leyi tsariweke: xirho xin’wana ni xin’wana xi hoxa mali muni, tihakelo ti fanele ku endliwa rini, i mani loyi a hlayisaka rhekhodo ni leswaku swiboho swi endliwa hi ndlela yihi. Hlayisa vumbhoni bya wena bya hakelo yin’wana ni yin’wana u tlhela u tiyisisa leswaku rhekhodo ya ntlawa ya yelana. Vulavulani hi tihakelo leti hundzeke hi xichavo mi pfumelelana hi endlelo leri lulameke. U nga hoxi mali leyi u yi lavaka eka swilaveko swa nkoka.",
      nr: "Ngaphambi kokujoyina i-stokvel, zwisisa imithetho etloliweko: ilunga ngalinye lifaka malini, iimbhadelo kufanele zenziwe nini, ngubani ogcina amarekhodi nokuthi iinqunto zithathwa njani. Gcina obakho ubufakazi bekubhadala ngakunye uqinisekise ukuthi amarekhodi weqembu ayafana. Khulumisanani ngeembhadelo ezingakenziwa ngehlonipho nivumelane ngenqubo efaneleko. Ungafaki imali oyitlhoga ezintweni eziqakathekileko.",
    },
  },
  {
    id: "borrowing",
    minutes: 5,
    title: {
      en: "Borrowing and interest",
      af: "Leen en rente",
      zu: "Ukuboleka nenzalo",
      xh: "Ukuboleka nenzala",
      nso: "Go adima le tswalo",
      st: "Ho alima le tsoala",
      tn: "Go adima le morokotso",
      ss: "Kuboleka nemalimboleko",
      ve: "U adima na dzimbuyelo",
      ts: "Ku lomba ni ntswalo",
      nr: "Ukuboleka nenzalo",
    },
    body: {
      en: "Before accepting a loan, ask for the total amount you will repay, including interest, fees and insurance, not only the monthly instalment. Check the due dates and what happens if a payment is late. Compare offers from registered providers and borrow only what your budget can repay after essentials. Do not sign a blank form or let anyone rush you.",
      af: "Vra voor jy ’n lening aanvaar wat die totale terugbetalingsbedrag is, insluitend rente, fooie en versekering, nie net die maandelikse paaiement nie. Kyk na die betaaldatums en wat gebeur as ’n betaling laat is. Vergelyk aanbiedinge van geregistreerde verskaffers en leen net wat jou begroting ná noodsaaklikhede kan terugbetaal. Moenie ’n leë vorm teken of toelaat dat iemand jou jaag nie.",
      zu: "Ngaphambi kokwamukela imali ebolekiwe, buza ukuthi uzobuyisa malini isiyonke kuhlanganise nenzalo, izimali nomshwalense, hhayi isitolimende senyanga kuphela. Hlola izinsuku zokukhokha nokuthi kwenzekani uma ukhokha sekwephuzile. Qhathanisa izipesheli zabahlinzeki ababhalisiwe, uboleke kuphela lokho isabelomali sakho esingakukhokha ngemva kwezidingo. Ungasayini ifomu elingenalutho futhi ungavumeli ukuphoqwa.",
      xh: "Ngaphambi kokwamkela imali-mboleko, buza isixa sisonke oza kusibuyisa, kuquka inzala, imirhumo ne-inshorensi, hayi intlawulo yenyanga kuphela. Jonga imihla yokuhlawula nento eyenzekayo xa intlawulo ilibaziseka. Thelekisa izibonelelo zababoneleli ababhalisiweyo, uboleke kuphela oko uhlahlo lwabiwo-mali lwakho lunokukubuyisa emva kweemfuno ezibalulekileyo. Musa ukutyikitya ifomu engenanto okanye ukuvumela ukungxanyiswa.",
      nso: "Pele o amogela kadimo, botšiša palomoka ye tšhelete yeo o tlago go e bušetša, go akaretšwa tswalo, ditefo le inšorense, e sego tefelo ya kgwedi feela. Lekola matšatši a tefelo le gore go direga eng ge o lefa ka morago ga nako. Bapetša ditšhišinyo tša baabi bao ba ngwadišitšwego gomme o adime fela seo tekanyetšo ya gago e ka se lefang ka morago ga dinyakwa. O se ke wa saena foromo ye e se nago selo goba wa dumelela motho a go kitimiša.",
      st: "Pele u amohela kalimo, botsa chelete eohle eo u tla e khutlisang, ho kenyeletsa tsoala, litefiso le inshorense, eseng tefo ea khoeli feela. Sheba matsatsi a tefo le se etsahalang ha u lefa ka morao ho nako. Bapisa litlhahiso tsa bafani ba ngolisitsoeng ’me u alime feela seo tekanyetso ea hao e ka se khutlisang ka mor’a litlhoko tsa bohlokoa. U se ke ua saena foromo e se nang letho kapa ua lumella motho ho u potlakisa.",
      tn: "Pele o amogela kadimo, botsa palogotlhe ya madi a o tla a busetsang, go akaretsa morokotso, dituelo le inshorense, e seng tuelo ya kgwedi fela. Lebelela malatsi a tuelo le gore go diragala eng fa o duela morago ga nako. Bapisa ditsholofetso tsa bafani ba ba kwadisitsweng mme o adime fela se tekanyetsokabo ya gago e ka se busetsang morago ga ditlhoko tsa botlhokwa. O se ka wa saena foromo e e lolea kgotsa wa letla ope go go potlakisa.",
      ss: "Ngaphambi kwekutsi wemukele imali lebolekiwe, buta linani lonkhe lotolibuyisela, kufaka ekhatsi imalimboleko, timali nemshwalense, hhayi imbadalo yenyanga kuphela. Hlola tinsuku tekukhokha nekutsi kwentekani nawukhokha sewuphutselwe sikhatsi. Catsanisa tinkhulumo tebahlinzeki lababhalisiwe bese uboleka kuphela loko ibhajethi yakho lengakukhokha ngemuva kwetidzingo letibalulekile. Ungasayini lifomu lelingenalutfo noma uvumele umuntfu akusheshise.",
      ve: "Musi ni sa athu u ṱanganedza tshikolodo, vhudzisani tshelede yoṱhe ine na ḓo i humisela, hu tshi katelwa dzimbuyelo, mitengo na inshuwarentsi, hu si muthelo wa ṅwedzi fhedzi. Sedzani maḓuvha a u badela na zwine zwa itea arali na lenga. Vhambedzani zwifhiwa zwa vhaṋetshedzi vho ṅwaliswaho nahone ni adime fhedzi zwine bajeti yaṋu ya nga kona u zwi humisela nga murahu ha ṱhoḓea. Ni songo saina fomo i si na tshithu kana u tendela muthu a tshi ni ṱavhanyisa.",
      ts: "Loko u nga si amukela xikweleti, vutisa ntsengo hinkwawu lowu u nga ta wu tlherisa, ku katsa ntswalo, tihakelo ni ndzindzakhombo, ku nga ri hakelo ya n’hweti ntsena. Languta masiku yo hakela ni leswi nga ta humelela loko u hakela endzhaku ka nkarhi. Ringanisa swiringanyeto swa vaphakeri lava tsarisiweke naswona lomba ntsena leswi bajete ya wena yi nga ta swi hakela endzhaku ka swilaveko swa nkoka. U nga sayini fomo leyi nga tsaleriwangiki kumbe u pfumela ku hatliseriwa.",
      nr: "Ngaphambi kokwamukela imali oyibolekileko, buza imali yoke oyoyibuyisela, kufaka hlangana inzalo, iindleko ne-inshorensi, ingasi isitolimende senyanga kwaphela. Hlola amalanga wokubhadala nokuthi kwenzekani nawubhadala sele uyephuzile. Madanisa iinikeleli zababolekisi ababhalisiweko, uboleke kwaphela lokho isabelomali sakho esingakubuyisa ngemva kweemfuno eziqakathekileko. Ungasayini iforomo elinganalitho namkha uvumele umuntu akurhabe.",
    },
  },
  {
    id: "money-scams",
    minutes: 3,
    title: {
      en: "Spot a money scam",
      af: "Herken ’n geldbedrogspul",
      zu: "Qaphela ubuqili bemali",
      xh: "Qaphela ubuqhophololo bemali",
      nso: "Lemoga bofora bja tšhelete",
      st: "Lemoha bomenemene ba chelete",
      tn: "Lemoga tsietso ya madi",
      ss: "Caphela bukhwabanisi bemali",
      ve: "Ṱhogomelani vhufhura ha tshelede",
      ts: "Xiya vuxisi bya mali",
      nr: "Tjheja ubuqili bemali",
    },
    body: {
      en: "A message that pressures you to act now, promises a guaranteed prize or asks for your PIN or one-time password is a warning sign. Stop and verify the request using the official number on your bank card or provider's website, not a number in the message. Do not open unexpected links or move money to a 'safe account'. Report suspicious contact to your provider.",
      af: "’n Boodskap wat jou druk om dadelik op te tree, ’n gewaarborgde prys belowe of jou PIN of eenmalige wagwoord vra, is ’n waarskuwingsteken. Stop en bevestig die versoek met die amptelike nommer op jou bankkaart of verskaffer se webwerf, nie ’n nommer in die boodskap nie. Moenie onverwagte skakels oopmaak of geld na ’n “veilige rekening” skuif nie. Rapporteer verdagte kontak.",
      zu: "Umlayezo okuphoqa ukuba wenze ngokushesha, othembisa umklomelo oqinisekisiwe noma ocela i-PIN noma iphasiwedi yesikhathi esisodwa uyisixwayiso. Yima uqinisekise isicelo ngenombolo esemthethweni esekhadini lakho lasebhange noma kuwebhusayithi yomhlinzeki, hhayi inombolo esemlayezweni. Ungavuli izixhumanisi obungazilindele futhi ungathumeli imali ku-akhawunti ethi iphephile. Bika umhlinzeki wakho.",
      xh: "Umyalezo okungxamisayo ukuba wenze ngoku nangoku, othembisa ibhaso eliqinisekileyo okanye ocela iPIN okanye iphaswedi yexesha elinye luphawu lwesilumkiso. Yima uze uqinisekise ngesicelo usebenzisa inombolo esemthethweni ekwikhadi lakho lebhanki okanye kwiwebhusayithi yomboneleli, hayi inombolo ekumyalezo. Musa ukuvula amakhonkco obungawalindelanga okanye ukuthumela imali kwiakhawunti “ekhuselekileyo”. Xela umboneleli wakho.",
      nso: "Molaetša wo o go gapeletšago go dira selo ka pela, o tshepišago moputso wo o kgonthišitšwego goba o kgopelago PIN goba khoutu ya gago ya sephiri ke temošo. Ema gomme o netefatše kgopelo ka nomoro ya semmušo yeo e lego kareteng ya gago ya panka goba weposaeteng ya mofani, e sego nomoro yeo e lego molaetšeng. O se ke wa bula dikgokagano tše o sa di letelago goba wa romela tšhelete go “akhaonte ya tšhireletšo”. Begela mofani wa gago.",
      st: "Molaetsa o u potlakisang hore u nke khato hona joale, o tšepisang moputso o tiisitsoeng kapa o kopang PIN kapa khoutu ea hao ea lekunutu ke temoso. Ema ’me u netefatse kopo ka nomoro ea semmuso e kareteng ea hao ea banka kapa webosaeteng ea mofani, eseng nomoro e molaetseng. U se ke ua bula lihokelo tseo u sa li lebellang kapa ua romela chelete akhaonteng ea “polokeho”. Tlalehela mofani oa hao.",
      tn: "Molaetsa o o pateletsang go tsaya kgato gone jaanong, o o solofetsang sekgele se se tlhomamisitsweng kgotsa o o kopang PIN kgotsa khoutu ya gago ya sephiri ke tlhagiso. Ema mme o tlhomamise kopo ka nomoro ya semmuso e e mo karateng ya gago ya banka kgotsa mo webosaeteng ya mofani, e seng nomoro ya molaetsa. O se ka wa bula dikgokagano tse o sa di solofelang kgotsa wa romela madi kwa “akhaonteng e e babalesegileng”. Bega mogala o o belaetsang.",
      ss: "Umlayeto lokucindzetelako kutsi utsatse sinyatselo nyalo, lowetsembisa umklomelo locinisekisiwe noma locela i-PIN noma ikhodi yakho yemfihlo uluphawu lwesexwayiso. Yima bese uhlola sicelo ngenombolo lesemtsetfweni ekhadini lakho lasebhange noma kusayithi lemniketi, hhayi inombolo lelomyalezo. Ungavuli ema-link longakawalindzeli noma utfumele imali ku-akhawunti 'levikelekile'. Tjela umniketi wakho ngalokungatfolakali.",
      ve: "Mulaedza une wa ni kombetshedzaho u dzhia vhukando zwino, une wa fulufhedzisa malamba a khwaṱhisedzwaho kana wa humbela PIN kana khoudu ya tshiphiri ndi tsevho. Imani ni khwaṱhisedze khumbelo nga nomboro ya tshiofisi i re kha garaṱa ya bannga yaṋu kana webusaithi ya muṋetshedzi, hu si nomboro ya mulaedza. Ni songo vula dzilinki dzi songo lavhelelwaho kana u rumela tshelede kha “akhaunthu yo tsireledzeaho”. Vhigani vhukwamani vhu sa fulufhedzei.",
      ts: "Rungula leri ku sindzisaka ku teka goza sweswi, leri ku tiyisisaka hakelo leyi tiyisisiweke kumbe ku kombela PIN kumbe khodi ya xihundla i xilemukiso. Yima u tiyisisa xikombelo hi nomboro ya ximfumo leyi nga eka khadi ra wena ra bangi kumbe eka webusayiti ya muphakeri, ku nga ri nomboro leyi nga erungulweni. U nga pfuli swihlanganisi leswi a wu nga swi langutelanga kumbe ku rhumela mali eka 'akhawunti leyi hlayisekeke'. Tivisa muphakeri wa wena hi vuxaka byo kanakanisa.",
      nr: "Umlayezo okukurhabezelako bona wenze msinyana, othembisa umklomelo oqinisekisiweko namkha ocela i-PIN namkha ikhowudi yakho eyifihlo uluphawu lwesexwayiso. Yima uqinisekise isibawo ngenomboro esemthethweni esekhadini lakho lebhanga namkha kuwebhusayithi yomnikezeli, ingasi inomboro esemyalezweni. Ungavuli iinkhumo ongazilindeleko namkha uthumele imali ku-akhawunti 'evikelekileko'. Bika umnikezeli wakho.",
    },
  },
];

export function getLesson(id: string | undefined) {
  return lessons.find((lesson) => lesson.id === id);
}
