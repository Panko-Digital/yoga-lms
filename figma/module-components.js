/* Progress Bar - Multi-Module JavaScript */
/* Auto-initializes on page load based on which container exists */

(function () {
    'use strict';

    // Sanskrit Glossary config — full A–Z with IAST diacritics
    // Content paraphrased from public sources. Diacritics from yesvedanta.com (public domain).
    var sanskritGlossary = [
        { word: 'Abhyasa', iast: 'abhyāsa', meaning: 'Consistent, dedicated spiritual practice over time' },
        { word: 'Adho', iast: 'adho', meaning: 'Downward — as in Adho Mukha Svanasana (Downward Facing Dog)' },
        { word: 'Ahamkara', iast: 'ahaṃkāra', meaning: 'The ego or "I-maker" that clouds higher awareness' },
        { word: 'Ahimsa', iast: 'ahiṃsā', meaning: 'Non-violence and non-harming towards all living beings' },
        { word: 'Ajna', iast: 'ājñā', meaning: 'Third-eye chakra — the centre of intuition and inner wisdom' },
        { word: 'Ananda', iast: 'ānanda', meaning: 'A state of pure bliss and unconditional joy' },
        { word: 'Anahata', iast: 'anāhata', meaning: 'Heart chakra — the energy centre of love and compassion' },
        { word: 'Anjaneyasana', iast: 'āñjaneyāsana', meaning: 'Foundational asana that deeply stretches the hip flexors, quads, and groin' },
        { word: 'Antar Mouna', iast: 'antar mauna', meaning: 'Inner silence — a meditation practice of stilling mental chatter' },
        { word: 'Apana', iast: 'apāna', meaning: 'The downward-moving vital energy governing elimination' },
        { word: 'Aparigraha', iast: 'aparigraha', meaning: 'Non-possessiveness — freedom from greed and attachment' },
        { word: 'Ardha', iast: 'ardha', meaning: 'Half — as in Ardha Chandrasana (Half Moon Pose)' },
        { word: 'Ardha Hanumanasana', iast: 'ardha hanumānāsana', meaning: 'Half split pose named after lord Hanuman' },
        { word: 'Ardha Matsyendrasana', iast: 'ardha matsyendrāsana', meaning: 'Seated spinal twist named after the sage Matsyendra' },
        { word: 'Asana', iast: 'āsana', meaning: 'A physical posture practised in yoga' },
        { word: 'Ashram', iast: 'āśrama', meaning: 'A spiritual hermitage or school dedicated to yoga study' },
        { word: 'Ashtanga', iast: 'aṣṭāṅga', meaning: 'The eight-limbed path of yoga described by Patanjali' },
        { word: 'Atman', iast: 'ātman', meaning: 'The eternal, transcendental Self or indwelling spirit' },
        { word: 'Avidya', iast: 'avidyā', meaning: 'Ignorance — the root cause of suffering in yogic philosophy' },
        { word: 'Balasana', iast: 'bālāsana', meaning: 'Child\'s Pose — a resting posture of surrender and comfort' },
        { word: 'Bandha', iast: 'bandha', meaning: 'An internal energy lock created by muscular contraction' },
        { word: 'Bhagavad Gita', iast: 'bhagavad gītā', meaning: 'Ancient Sanskrit scripture on yoga, duty and devotion' },
        { word: 'Bhakti', iast: 'bhakti', meaning: 'The path of devotion and love directed toward the Divine' },
        { word: 'Bhastrika', iast: 'bhastrīkā', meaning: 'Bellows breath — a vigorous pranayama that energises the system' },
        { word: 'Bhramari', iast: 'bhrāmarī', meaning: 'Humming bee breath — creates vibrations that quiet the mind' },
        { word: 'Bhujangasana', iast: 'bhujaṅgāsana', meaning: 'Cobra Pose — a backbend that opens the heart and chest' },
        { word: 'Brahmacharya', iast: 'brahmacarya', meaning: 'Wise use of energy and moderation in all things' },
        { word: 'Buddhi', iast: 'buddhi', meaning: 'The higher mind — the seat of wisdom and discernment' },
        { word: 'Chakra', iast: 'cakra', meaning: 'A spinning wheel of energy in the subtle body' },
        { word: 'Chakrasana', iast: 'cakrāsana', meaning: 'Full Wheel Pose — a deep backbend opening the entire front body' },
        { word: 'Chandra', iast: 'candra', meaning: 'The moon — as in Ardha Chandrasana (Half Moon Pose)' },
        { word: 'Chandra Bhedana', iast: 'candra bhedana', meaning: 'Left-nostril breathing that cools the body and calms emotions' },
        { word: 'Chaturanga', iast: 'caturaṅga', meaning: 'Four-limbed staff pose — the yogi\'s push-up' },
        { word: 'Dharana', iast: 'dhāraṇā', meaning: 'Single-pointed concentration — the sixth limb of yoga' },
        { word: 'Dharma', iast: 'dharma', meaning: 'One\'s purpose, duty and path toward truth' },
        { word: 'Dhanurasana', iast: 'dhanurāsana', meaning: 'Bow Pose — builds strength and flexibility through the spine' },
        { word: 'Dhyana', iast: 'dhyāna', meaning: 'Meditation — sustained, unbroken mental focus' },
        { word: 'Drishti', iast: 'dṛṣṭi', meaning: 'A focused gaze point used to anchor attention during practice' },
        { word: 'Duhkha', iast: 'duḥkha', meaning: 'Suffering or dissatisfaction — a state yoga seeks to resolve' },
        { word: 'Dwi', iast: 'dvi', meaning: 'Two — used in pose names involving two limbs' },
        { word: 'Eka', iast: 'eka', meaning: 'One — used in pose names focusing on a single limb' },
        { word: 'Gayatri Mantra', iast: 'gāyatrī mantra', meaning: 'An ancient solar chant for awakening wisdom and clarity' },
        { word: 'Gomukhasana', iast: 'gomukhāsana', meaning: 'Cow Face Pose — a deep stretch for the hips and shoulders' },
        { word: 'Granthi', iast: 'granthi', meaning: 'An energetic knot or blockage in the central energy channel' },
        { word: 'Guna', iast: 'guṇa', meaning: 'One of three qualities of nature: tamas, rajas, or sattva' },
        { word: 'Guru', iast: 'guru', meaning: 'A spiritual teacher who guides one toward awakening' },
        { word: 'Hanumanasana', iast: 'hanumānāsana', meaning: 'Full split pose named after lord Hanuman' },
        { word: 'Hasta', iast: 'hasta', meaning: 'The hand or arm — used in many pose names' },
        { word: 'Hatha', iast: 'haṭha', meaning: 'The "forceful path" — balancing sun (ha) and moon (tha) energy' },
        { word: 'Ida Nadi', iast: 'iḍā nāḍī', meaning: 'The left energy channel carrying cooling, lunar energy' },
        { word: 'Ishvara Pranidhana', iast: 'īśvara praṇidhāna', meaning: 'Surrender to the Divine — the fifth Niyama' },
        { word: 'Iyengar', iast: 'iyeṅgār', meaning: 'A style of yoga emphasising precision, alignment and use of props' },
        { word: 'Jalandhara Bandha', iast: 'jālandhara bandha', meaning: 'Throat lock — prevents energy from escaping upward' },
        { word: 'Janu Sirsasana', iast: 'jānu śīrṣāsana', meaning: 'Head-to-knee forward fold for deep introspection' },
        { word: 'Japa', iast: 'japa', meaning: 'Repetitive recitation of mantras or sacred sounds' },
        { word: 'Jnana', iast: 'jñāna', meaning: 'The yogic path of knowledge and intellectual inquiry' },
        { word: 'Kapalabhati', iast: 'kapālabhāti', meaning: 'Skull-shining breath — rapid exhalations that cleanse and energise' },
        { word: 'Karma', iast: 'karma', meaning: 'The law of cause and effect — action and its consequences' },
        { word: 'Kirtan', iast: 'kīrtana', meaning: 'Devotional call-and-response chanting in community' },
        { word: 'Kosha', iast: 'kośa', meaning: 'One of five sheaths or layers surrounding the true Self' },
        { word: 'Kumbhaka', iast: 'kumbhaka', meaning: 'Breath retention — holding the breath to build energy and focus' },
        { word: 'Kundalini', iast: 'kuṇḍalinī', meaning: 'Dormant serpent energy at the base of the spine' },
        { word: 'Maha Bandha', iast: 'mahā bandha', meaning: 'The great lock — all three bandhas engaged simultaneously' },
        { word: 'Manas', iast: 'manas', meaning: 'The rational, sensory aspect of the mind' },
        { word: 'Mandala', iast: 'maṇḍala', meaning: 'A circular geometric design used as a focus for meditation' },
        { word: 'Manipura', iast: 'maṇipūra', meaning: 'Solar plexus chakra — the centre of personal power and confidence' },
        { word: 'Mantra', iast: 'mantra', meaning: 'A sacred sound or phrase with transformative power in meditation' },
        { word: 'Marichyasana', iast: 'marīcyāsana', meaning: 'A binding twist that cultivates patience and inward focus' },
        { word: 'Maya', iast: 'māyā', meaning: 'Illusion — the mind\'s projection that veils true reality' },
        { word: 'Moksha', iast: 'mokṣa', meaning: 'Liberation — freedom from the cycle of suffering and rebirth' },
        { word: 'Mudra', iast: 'mudrā', meaning: 'A symbolic hand or body gesture that channels energy' },
        { word: 'Mula Bandha', iast: 'mūla bandha', meaning: 'Root lock at the pelvic floor — builds core stability and focus' },
        { word: 'Muladhara', iast: 'mūlādhāra', meaning: 'Root chakra at the base of the spine — grounding and stability' },
        { word: 'Nadi', iast: 'nāḍī', meaning: 'A subtle energy channel through which prana flows' },
        { word: 'Nadi Shodhana', iast: 'nāḍī śodhana', meaning: 'Alternate-nostril breathing to balance the nervous system' },
        { word: 'Namaste', iast: 'namaste', meaning: '"I bow to you" — a greeting honouring the light in another' },
        { word: 'Natarajasana', iast: 'naṭarājāsana', meaning: 'Lord of the Dance pose or Dancer\'s pose' },
        { word: 'Navasana', iast: 'navāsana', meaning: 'Boat Pose — strengthens the core and improves balance' },
        { word: 'Nidra', iast: 'nidrā', meaning: 'Yogic sleep — the body rests while awareness remains' },
        { word: 'Niyama', iast: 'niyama', meaning: 'The five internal observances — the second limb of yoga' },
        { word: 'Om', iast: 'oṃ', meaning: 'The primordial sound representing the vibration of the universe' },
        { word: 'Pada', iast: 'pāda', meaning: 'Foot or leg — used in many asana names' },
        { word: 'Parivrtta Trikonasana', iast: 'parivṛtta trikoṇāsana', meaning: 'Revolved Triangle — a deep twist that challenges balance' },
        { word: 'Paschimottanasana', iast: 'paścimottānāsana', meaning: 'Seated forward fold — calms the mind and stretches the back body' },
        { word: 'Patanjali', iast: 'patañjali', meaning: 'Ancient sage who compiled the Yoga Sutras' },
        { word: 'Pincha Mayurasana', iast: 'piñcha mayūrāsana', meaning: 'Forearm balance — builds patience and upper-body strength' },
        { word: 'Pingala Nadi', iast: 'piṅgalā nāḍī', meaning: 'The right energy channel carrying heating, solar energy' },
        { word: 'Prakriti', iast: 'prakṛti', meaning: 'Nature — the material world including body and mind' },
        { word: 'Prana', iast: 'prāṇa', meaning: 'Life-force energy that sustains and animates the body' },
        { word: 'Pranamaya Kosha', iast: 'prāṇamaya kośa', meaning: 'The energy sheath — one of the five layers of the self' },
        { word: 'Pranayama', iast: 'prāṇāyāma', meaning: 'Breath control — techniques for regulating the flow of prana' },
        { word: 'Pratyahara', iast: 'pratyāhāra', meaning: 'Sense withdrawal — turning attention inward away from distractions' },
        { word: 'Puraka', iast: 'pūraka', meaning: 'Controlled inhalation in pranayama practice' },
        { word: 'Purusha', iast: 'puruṣa', meaning: 'Pure, unchanging consciousness or awareness' },
        { word: 'Raja Yoga', iast: 'rāja yoga', meaning: 'The "royal path" — using meditation to master the mind' },
        { word: 'Rechaka', iast: 'recaka', meaning: 'Controlled exhalation in pranayama practice' },
        { word: 'Sadhana', iast: 'sādhanā', meaning: 'A dedicated daily spiritual practice' },
        { word: 'Sahasrara', iast: 'sahasrāra', meaning: 'Crown chakra — connection to divine consciousness' },
        { word: 'Sama Vritti', iast: 'sama vṛtti', meaning: 'Equal-ratio breathing that brings balance to the mind' },
        { word: 'Samadhi', iast: 'samādhi', meaning: 'The highest state — complete absorption in universal consciousness' },
        { word: 'Samsara', iast: 'saṃsāra', meaning: 'The cycle of birth, death and rebirth' },
        { word: 'Samskara', iast: 'saṃskāra', meaning: 'Subconscious impressions or patterns that shape behaviour' },
        { word: 'Santosha', iast: 'saṃtoṣa', meaning: 'Contentment — finding peace with what is' },
        { word: 'Sarvangasana', iast: 'sarvāṅgāsana', meaning: 'Shoulder Stand — calms the nervous system and restores balance' },
        { word: 'Satchitananda', iast: 'saccidānanda', meaning: 'Truth, consciousness and bliss — the nature of ultimate reality' },
        { word: 'Satya', iast: 'satya', meaning: 'Truthfulness — living and speaking with honesty' },
        { word: 'Saucha', iast: 'śauca', meaning: 'Purity and cleanliness of body, mind and environment' },
        { word: 'Savasana', iast: 'śavāsana', meaning: 'Corpse Pose — final relaxation of complete stillness and surrender' },
        { word: 'Setu Bandhasana', iast: 'setu bandhāsana', meaning: 'Bridge Pose — connects lower and upper body with strength' },
        { word: 'Shakti', iast: 'śakti', meaning: 'The feminine aspect of dynamic, creative divine energy' },
        { word: 'Shala', iast: 'śālā', meaning: 'A dedicated space for yoga practice and study' },
        { word: 'Shanti', iast: 'śānti', meaning: 'Peace — often chanted three times at the close of practice' },
        { word: 'Sheetali', iast: 'śītalī', meaning: 'Cooling breath through a curled tongue — reduces body heat' },
        { word: 'Sirsasana', iast: 'śīrṣāsana', meaning: 'Headstand — builds mental clarity and shifts perspective' },
        { word: 'Sitkari', iast: 'sītkārī', meaning: 'Hissing breath through the teeth — cools and calms the system' },
        { word: 'So Hum', iast: 'so\'ham', meaning: '"I am That" — a mantra connecting self to universal consciousness' },
        { word: 'Sthira Sukham Asanam', iast: 'Sthira-sukham āsanam', meaning: 'A balance of effort and ease in the body' },
        { word: 'Supta Baddha Konasana', iast: 'supta baddha koṇāsana', meaning: 'Reclined Butterfly — opens the hips in deep relaxation' },
        { word: 'Surya Bhedana', iast: 'sūrya bhedana', meaning: 'Right-nostril breathing that heats the body and sharpens focus' },
        { word: 'Surya Namaskar', iast: 'sūrya namaskāra', meaning: 'Sun Salutation — a flowing sequence linking breath and movement' },
        { word: 'Sushumna Nadi', iast: 'suṣumṇā nāḍī', meaning: 'The central energy channel where kundalini rises' },
        { word: 'Sutra', iast: 'sūtra', meaning: 'A concise thread of teaching — as in the Yoga Sutras' },
        { word: 'Svadhyaya', iast: 'svādhyāya', meaning: 'Self-study — reflection through sacred texts and introspection' },
        { word: 'Svadhisthana', iast: 'svādhiṣṭhāna', meaning: 'Sacral chakra — the centre of creativity and emotional flow' },
        { word: 'Tadasana', iast: 'tāḍāsana', meaning: 'Mountain Pose — a foundational standing posture of stillness and alignment' },
        { word: 'Tantra', iast: 'tantra', meanifng: 'A path using internal energy, chakras and ritual for spiritual growth' },
        { word: 'Tapas', iast: 'tapas', meaning: 'Inner fire — the heat of discipline and self-effort' },
        { word: 'Trikonasana', iast: 'trikoṇāsana', meaning: 'Triangle Pose — stretches the side body and improves balance' },
        { word: 'Turiya', iast: 'turīya', meaning: 'The fourth state of consciousness beyond waking, dreaming and sleep' },
        { word: 'Uddiyana Bandha', iast: 'uḍḍīyāna bandha', meaning: 'Abdominal lock — lifts the diaphragm and stokes inner fire' },
        { word: 'Ujjayi', iast: 'ujjāyī', meaning: 'Ocean-sounding victorious breath that calms and warms the body' },
        { word: 'Upavistha Konasana', iast: 'upaviṣṭha koṇāsana', meaning: 'Wide-angle seated forward fold — opens hips and quiets the mind' },
        { word: 'Urdhva Dhanurasana', iast: 'ūrdhva dhanurāsana', meaning: 'Upward bow or wheel pose - opens the chest and shoulders' },
        { word: 'Ustrasana', iast: 'uṣṭrāsana', meaning: 'Camel Pose — a kneeling backbend that opens the throat and heart' },
        { word: 'Utkatasana', iast: 'utkaṭāsana', meaning: 'Chair Pose — builds leg strength, focus and determination' },
        { word: 'Uttanasana', iast: 'uttānāsana', meaning: 'Standing Forward Fold — calms the mind and lengthens the spine' },
        { word: 'Utthita', iast: 'utthita', meaning: 'Extended — used in poses where the body stretches beyond its usual range' },
        { word: 'Utthita Hasta Padangusthasana', iast: 'utthita hasta pādaṅguṣṭhāsana', meaning: 'Extended Hand-to-Big-Toe Pose — improves balance and stretches the legs' },
        { word: 'Vairagya', iast: 'vairāgya', meaning: 'Detachment — inner renunciation of worldly attachment' },
        { word: 'Vedas', iast: 'vedāḥ', meaning: 'The oldest yogic scriptures — foundational texts of Indian philosophy' },
        { word: 'Vinyasa', iast: 'vinyāsa', meaning: 'Flow — linking breath with movement in a continuous sequence' },
        { word: 'Viparita Karani', iast: 'viparīta karaṇī', meaning: 'Legs Up the Wall — a restorative inversion that calms anxiety' },
        { word: 'Virabhadrasana', iast: 'vīrabhadrāsana', meaning: 'Warrior Pose — builds courage, strength and determination' },
        { word: 'Virasana', iast: 'vīrāsana', meaning: 'A deep stretching of the thighs, knees, and ankles' },
        { word: 'Vishuddha', iast: 'viśuddha', meaning: 'Throat chakra — the centre of truthful expression and clarity' },
        { word: 'Yama', iast: 'yama', meaning: 'The five ethical restraints — the first limb of yoga' },
        { word: 'Yoga', iast: 'yoga', meaning: 'Union — the practice of joining mind, body and spirit' },
        { word: 'Yoga Sutras', iast: 'yoga sūtrāṇi', meaning: 'Patanjali\'s foundational text outlining the philosophy and practice of yoga' }
    ];

    // Module lesson data registry
    var moduleLessons = {
        module0: [
            // { short: "Welcome", full: "Welcome to the Course" },
            { short: "Essentials", full: "Course Essentials" },
            { short: "Timeline", full: "Course Timeline" },
            { short: "Asanas", full: "Asana Library" },
            { short: "Introduction", full: "Introduction to Yoga" }
        ],
        module1: [
            { short: "Why Anatomy", full: "Why Anatomy?" },
            { short: "Terminology", full: "Directional Terminology" },
            { short: "Bone Tissue", full: "Structure of Bone Tissue" },
            { short: "Skeleton", full: "The Axial and Appendicular Skeletons" },
            { short: "Variable Anatomy", full: "Variable Anatomy" },
            { short: "Tissue Types", full: "Types of Tissue" },
            { short: "Stretching", banner: 'halfway', full: "Physiology of Stretching" },
            { short: "Anatomy - Pelvis", full: "Anatomy of the Trunk" },
            { short: "Anatomy - Shoulder", full: "Anatomy of the Shoulder Girdle" },
            { short: "Anatomy - Trunk", full: "Anatomy of the Trunk" },
            { short: "Anatomy - Spine", full: "Anatomy of the Spine" },
            { short: "Tadasana", full: "Tadasana Alignment" },
            { short: "Energy", full: "Muscular and Organic Energy" },
            { short: "Principles - Bending", full: "Principles of Forward Folding, Back-Bending, Lateral Bending and Twisting" }
        ],
        module2: [
            { short: "History", full: "History of Yoga" },
            { short: "Breath", full: "Anatomy of the Breath" },
            { short: "Breathing Dynamics", full: "Breathing Dynamics" },
            { short: "Movement", full: "Movement of the body with Breath" }
        ],
        module3: [
            { short: "Sequencing", full: "How to Sequence" },
            { short: "Meditation", full: "How to Teach Meditation" },
            { short: "Assisting", full: "Intro to Assisting" },
            { short: "Pre-Post Natal", full: "Pre-Post Natal Yoga" }
        ],
        module4: [
            { short: "Sequencing", full: "How to Sequence (Beginners/Gentle)" },
            { short: "Standard", full: "Standard Online Class" },
            { short: "Beginners", full: "Beginners Online Class" },
            { short: "Mellow Class", full: "Mellow Online Class" },
            { short: "Yin Intro", full: "Intro to Yin - Yin Principals" },
            { short: "Yin Class", full: "Yin Class" },
            { short: "Wrap Up", full: "Wrap Up" }
        ]
    };

    // Base path for the course — change this single value when the course ID changes
    var courseBasePath = '/courses/549';
    // /users/1838/files/21834/preview

    // Module header content registry
    // animVariant: 'from-left' | 'from-right' | 'from-bottom' | 'zoom'
    // Shared header assets (logo is the same across all modules)
    var headerDefaults = {
        logoImage: 'data:image/png;base64,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',
        logoImageAlt: 'White SOM logo circular',
        altLogoImageAlt: 'YOGA TEACHER TRAINING logo'
    };

    var imageBaseLocal = 'https://coreplus.instructure.com';

    var moduleHeaders = {
        '0-1': {
            title: 'Course Orientation',
            subtitle: '',
            animVariant: 'welcome'
        },
        '0-2': {
            title: 'Course Orientation',
            subtitle: 'Course Essentials',
            animVariant: 'fade'
        },
        '0-3': {
            title: 'Course Orientation',
            subtitle: 'Course Timeline',
            animVariant: 'fade'
        },
        '0-4': {
            title: 'Course Orientation',
            subtitle: 'Asana Library',
            animVariant: 'fade'
        },
        '0-5-removed': {
            title: 'Course Orientation',
            subtitle: 'Additional Resources',
            animVariant: 'fade'
        },
        '0-5': {
            title: 'Course Orientation',
            subtitle: 'Introduction to Yoga',
            animVariant: 'fade'
        },
        '1': {
            title: 'Module 1',
            subtitle: 'Anatomy, Alignment & Intention',
            animVariant: 'from-left'
        },
        '2': {
            title: 'Module 2',
            subtitle: 'Language of Movement & Power of Sequencing',
            animVariant: 'from-right'
        },
        '3': {
            title: 'Module 3',
            subtitle: 'Assists, Meditation & Teaching Skills',
            animVariant: 'fade'
        },
        '4': {
            title: 'Module 4',
            subtitle: 'From Teaching Skills to Transformation',
            animVariant: 'zoom'
        },
        'final-1': {
            title: 'Final Requirements',
            subtitle: 'Instructions For Assessment',
            animVariant: 'fade'
        },
        'final-2': {
            title: 'Final Requirements',
            subtitle: 'Essay',
            animVariant: 'fade'
        },
        'final-3': {
            title: 'Final Requirements',
            subtitle: 'Journal',
            animVariant: 'fade'
        }, 'final-4': {
            title: 'Final Requirements',
            subtitle: 'Studio Bookings',
            animVariant: 'fade'
        }, 'final-5': {
            title: 'Final Requirements',
            subtitle: 'Certification',
            animVariant: 'fade'
        },
    };

    var currentState = {
        step: 1,
        substep: 1,
        moduleId: null,
        lessons: null
    };

    function isMobileDevice() {
        // Check for mobile viewport width
        if (window.innerWidth <= 768) return true;

        // Check for touch-only devices
        if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return true;

        // Check user agent for mobile indicators
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    }

    function createSubstepDots(count, activeSubstep, isActiveStep, isCompleted) {
        if (count <= 1) return '';
        var dots = [];
        for (var i = 1; i <= count; i++) {
            var dotClass = 'ylms-pb_substep';
            if (isCompleted) {
                dotClass += ' ylms-pb_substep-completed';
            } else if (isActiveStep && i <= activeSubstep) {
                dotClass += ' ylms-pb_substep-completed';
            }
            dots.push('<span class="' + dotClass + '"></span>');
        }
        return '<div class="ylms-pb_substeps">' + dots.join('') + '</div>';
    }

    function showBannerOverlay(wrapper, bannerType) {
        var messages = {
            halfway: 'Halfway through this module!'
        };
        var message = messages[bannerType];
        if (!message) return;

        var prayIcon = '<svg class="ylms-pb_banner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">' +
            '<path d="M11.43 9.67C11.47 9.78 11.5 9.88 11.5 10V15.22C11.5 15.72 11.31 16.2 10.97 16.57L8.18 19.62L4.78 16.22L6 15L8.8 2.86C8.92 2.36 9.37 2 9.89 2C10.5 2 11 2.5 11 3.11V8.07C10.84 8.03 10.67 8 10.5 8C9.4 8 8.5 8.9 8.5 10V13C8.5 13.28 8.72 13.5 9 13.5S9.5 13.28 9.5 13V10C9.5 9.45 9.95 9 10.5 9C10.69 9 10.85 9.07 11 9.16C11.12 9.23 11.21 9.32 11.3 9.42C11.33 9.46 11.36 9.5 11.38 9.55C11.4 9.59 11.42 9.63 11.43 9.67M2 19L6 22L7.17 20.73L3.72 17.28L2 19M18 15L15.2 2.86C15.08 2.36 14.63 2 14.11 2C13.5 2 13 2.5 13 3.11V8.07C13.16 8.03 13.33 8 13.5 8C14.6 8 15.5 8.9 15.5 10V13C15.5 13.28 15.28 13.5 15 13.5S14.5 13.28 14.5 13V10C14.5 9.45 14.05 9 13.5 9C13.31 9 13.15 9.07 13 9.16C12.88 9.23 12.79 9.32 12.71 9.42C12.68 9.46 12.64 9.5 12.62 9.55C12.6 9.59 12.58 9.63 12.57 9.67C12.53 9.78 12.5 9.88 12.5 10V15.22C12.5 15.72 12.69 16.2 13.03 16.57L15.82 19.62L19.22 16.22L18 15M20.28 17.28L16.83 20.73L18 22L22 19L20.28 17.28Z"/>' +
            '</svg>';

        var overlay = document.createElement('div');
        overlay.className = 'ylms-pb_banner-overlay';
        overlay.innerHTML = '<span class="ylms-pb_banner-text">' + message + prayIcon + '</span>';
        wrapper.appendChild(overlay);

        // Double-rAF ensures the browser paints the initial translateY(100%)
        // before we add the class that transitions it to translateY(0)
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                overlay.classList.add('ylms-pb_banner-visible');
            });
        });

        // After 7.5s, slide out the top and remove
        setTimeout(function () {
            overlay.classList.remove('ylms-pb_banner-visible');
            overlay.classList.add('ylms-pb_banner-exit');
            overlay.addEventListener('animationend', function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            });
        }, 7500);
    }

    function createProgressBar(container, lessons, currentStep, currentSubstep) {
        var totalSteps = lessons.length;
        var shouldAnimate = currentSubstep <= 1;
        var previousProgress, segmentWidth;
        if (shouldAnimate) {
            previousProgress = currentStep > 1 ? ((currentStep - 2) / (totalSteps - 1)) * 100 : 0;
            segmentWidth = currentStep > 1 ? (1 / (totalSteps - 1)) * 100 : 0;
        } else {
            previousProgress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            segmentWidth = 0;
        }

        var stepsHtml = lessons.map(function (lesson, i) {
            var stepNum = i + 1;
            var isCompleted = stepNum < currentStep;
            var isActive = stepNum === currentStep;
            var isLastCompleted = stepNum === currentStep - 1;

            var circleClass = 'ylms-pb_circle';
            if (isCompleted) circleClass += ' ylms-pb_completed';
            else if (isActive) circleClass += ' ylms-pb_active';

            var labelClass = 'ylms-pb_label';
            if (stepNum <= currentStep) labelClass += ' ylms-pb_active';

            var circleContent;
            if (isCompleted) {
                var tickClass = (isLastCompleted && shouldAnimate) ? 'ylms-pb_tick ylms-pb_tick-animate' : 'ylms-pb_tick';
                circleContent = '<span class="' + tickClass + '">✓</span>';
            } else {
                circleContent = stepNum;
            }

            var substepDots = createSubstepDots(
                lesson.substeps || 1,
                isActive ? currentSubstep : 1,
                isActive,
                isCompleted
            );

            return '<div class="ylms-pb_step" data-step="' + stepNum + '">' +
                '<div class="' + circleClass + '" title="' + lesson.full + '">' + circleContent + '</div>' +
                '<span class="' + labelClass + '">' + lesson.short + '</span>' +
                substepDots +
                '</div>';
        }).join('');

        var rightClass = currentStep > totalSteps ? 'ylms-pb_right ylms-pb_complete' : 'ylms-pb_right';
        var containerMaxWidth = totalSteps <= 6 ? totalSteps * 72 : Math.min(1400, totalSteps * 100);
        var containerPad = totalSteps <= 6 ? 24 : 32;

        container.innerHTML =
            '<div class="ylms-pb_wrapper" data-steps="' + totalSteps + '">' +
            '<div class="ylms-pb_steps-container" style="--ylms-pb-previous: ' + previousProgress + '; --ylms-pb-current: ' + (previousProgress + segmentWidth) + '; --ylms-pb-pad: ' + containerPad + 'px; max-width: ' + containerMaxWidth + 'px">' +
            '<div class="ylms-pb_track"></div>' +
            '<div class="ylms-pb_left"></div>' +
            '<div class="ylms-pb_fill-static"></div>' +
            (shouldAnimate ? '<div class="ylms-pb_fill-animated"></div>' : '') +
            '<div class="' + rightClass + '"></div>' +
            '<div class="ylms-pb_steps">' +
            stepsHtml +
            '</div>' +
            '</div>' +
            '</div>';

        // Check if the current lesson has a banner — show it after the fill animation ends
        var currentLesson = lessons[currentStep - 1];
        if (currentLesson && currentLesson.banner && shouldAnimate) {
            var wrapper = container.querySelector('.ylms-pb_wrapper');
            // The fill animation is 1s with 0.2s delay = completes at ~1.2s
            setTimeout(function () {
                showBannerOverlay(wrapper, currentLesson.banner);
            }, 1400);
        }
    }

    function updateSubsteps(substep) {
        currentState.substep = substep;
        var container = document.getElementById('ylms-' + currentState.moduleId + '-progress');
        if (container) {
            var activeStep = container.querySelector('.ylms-pb_step[data-step="' + currentState.step + '"]');
            if (activeStep) {
                var dots = activeStep.querySelectorAll('.ylms-pb_substep');
                dots.forEach(function (dot, i) {
                    dot.classList.remove('ylms-pb_substep-completed', 'ylms-pb_substep-active');
                    if (i + 1 <= substep) {
                        dot.classList.add('ylms-pb_substep-completed');
                    }
                });
            }
        }
    }

    function createTabsFromPanels(container) {
        var panels = document.querySelectorAll('[data-panel]');
        if (panels.length === 0) return;

        var tabData = [];
        panels.forEach(function (panel, index) {
            var panelId = panel.dataset.panel || (index + 1);
            var heading = panel.querySelector('h1, h2, h3, h4');
            var label = heading ? heading.textContent.trim() : 'Tab ' + (index + 1);
            tabData.push({ id: panelId, label: label });
            panel.classList.add('ylms-tb_panel');
            if (index === 0) panel.classList.add('ylms-tb_active');
        });

        if (tabData.length <= 1) return;

        var tabsHtml = tabData.map(function (tab, index) {
            var activeClass = index === 0 ? ' ylms-tb_active' : '';
            return '<button class="ylms-tb_tab' + activeClass + '" data-tab="' + tab.id + '">' +
                tab.label + '</button>';
        }).join('');

        var tabContainer = document.createElement('div');
        tabContainer.className = 'ylms-tb_container';
        tabContainer.innerHTML = '<div class="ylms-tb_tabs">' + tabsHtml + '</div>';

        var panelsContainer = document.createElement('div');
        panelsContainer.className = 'ylms-tb_panels';
        panels.forEach(function (panel) { panelsContainer.appendChild(panel); });

        container.after(tabContainer);
        tabContainer.after(panelsContainer);

        var tabs = tabContainer.querySelectorAll('.ylms-tb_tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var tabId = this.dataset.tab;
                var tabIndex = Array.from(tabs).indexOf(this) + 1;
                tabs.forEach(function (t) { t.classList.remove('ylms-tb_active'); });
                this.classList.add('ylms-tb_active');
                panels.forEach(function (p) { p.classList.remove('ylms-tb_active'); });
                var targetPanel = document.querySelector('[data-panel="' + tabId + '"]');
                if (targetPanel) targetPanel.classList.add('ylms-tb_active');
                updateSubsteps(tabIndex);
            });
        });

        var currentLesson = currentState.lessons[currentState.step - 1];
        if (currentLesson) currentLesson.substeps = tabData.length;
        createProgressBar(container, currentState.lessons, currentState.step, currentState.substep);
    }

    // Find the main content element — try multiple selectors for Canvas web + mobile app
    var contentSelectors = ['.user_content', '#content', '.page-content', '.show-content', '.entry-content', 'article', '[role="main"]'];
    function findContentEl() {
        for (var i = 0; i < contentSelectors.length; i++) {
            var el = document.querySelector(contentSelectors[i]);
            if (el && el.textContent.trim().length > 0) return el;
        }
        return null;
    }

    // Preload custom fonts via JS for mobile webviews that may not process @font-face reliably
    function preloadFonts() {
        var fonts = [
            { family: 'ITC Garamond Condensed', src: 'url("data:font/woff2;base64,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") format("woff2"), url("data:font/woff;base64,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") format("woff")' },
            { family: 'Banana Grotesk Regular', src: 'url("data:font/woff2;base64,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") format("woff2"), url("data:font/woff;base64,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") format("woff")' }
        ];
        if (typeof FontFace === 'undefined' || !document.fonts) return;
        fonts.forEach(function (f) {
            var face = new FontFace(f.family, f.src, { display: 'swap' });
            face.load().then(function (loaded) {
                document.fonts.add(loaded);
            }).catch(function () { });
        });
    }

    function initIframeTips() {
        var wrappers = document.querySelectorAll('.ylms-iframe-wrapper');
        if (wrappers.length === 0) return;

        wrappers.forEach(function (wrapper) {
            if (wrapper.previousElementSibling && wrapper.previousElementSibling.classList &&
                wrapper.previousElementSibling.classList.contains('ylms-iframe-tip')) {
                return;
            }

            var tip = document.createElement('div');
            tip.className = 'ylms-iframe-tip';
            tip.textContent = 'Rotate device for best experience';

            wrapper.parentNode.insertBefore(tip, wrapper);
        });
    }

    function calculateReadTime() {
        var WORDS_PER_MIN = 200;
        var SECS_PER_IMAGE = 10;
        var MINS_PER_IFRAME = 5;
        var contentEl = findContentEl();
        if (!contentEl) return 0;
        var textContent = contentEl.textContent || '';
        var words = textContent.trim().split(/\s+/).filter(function (w) { return w.length > 0; }).length;
        var readMins = words / WORDS_PER_MIN;
        var imageCount = contentEl.querySelectorAll('img').length;
        var imageMins = (imageCount * SECS_PER_IMAGE) / 60;
        var videoMins = 0;
        contentEl.querySelectorAll('[data-duration]').forEach(function (el) {
            videoMins += (parseInt(el.dataset.duration, 10) || 0) / 60;
        });
        var timecodeMins = 0;
        document.querySelectorAll('.ylms-time-code').forEach(function (el) {
            var text = el.textContent.trim();
            var match = text.match(/(\d+)\.(\d+)/);
            if (match) {
                timecodeMins += (parseInt(match[1], 10) || 0) + ((parseInt(match[2], 10) || 0) / 60);
            }
        });
        var iframes = contentEl.querySelectorAll('iframe');
        var activityIframeCount = 0;
        iframes.forEach(function (iframe) {
            var src = iframe.src || '';
            if (src.indexOf('genially.com') !== -1) {
                activityIframeCount++;
            }
        });
        var iframeMins = activityIframeCount * MINS_PER_IFRAME;
        var totalMins = Math.ceil(readMins + imageMins + videoMins + timecodeMins + iframeMins);
        if (totalMins < 1) totalMins = 1;
        return totalMins;
    }

    function renderReadTime(container, retries) {
        var mins = calculateReadTime();
        if (mins === 0 && (retries || 0) < 5) {
            setTimeout(function () { renderReadTime(container, (retries || 0) + 1); }, 500);
            return;
        }
        if (mins < 1) mins = 1;

        var timeText;
        if (mins >= 60) {
            var hours = Math.floor(mins / 60);
            var remainingMins = mins % 60;
            timeText = hours + 'hr';
            if (remainingMins > 0) {
                timeText += ' ' + remainingMins + 'min';
            }
        } else {
            timeText = mins + ' min';
        }

        var badge = document.createElement('div');
        badge.className = 'ylms-pb_readtime';
        badge.textContent = timeText;
        container.after(badge);
    }

    function parseProgress(value) {
        if (!value) return { step: 1, substepCount: 1, substep: 1 };
        var parts = value.split('-').map(function (p) { return parseInt(p, 10); });
        return {
            step: parts[0] || 1,
            substepCount: parts[1] || 1,
            substep: parts[2] || 1
        };
    }

    function renderModuleHeader(container, moduleNum) {
        var header = moduleHeaders[moduleNum];
        if (!header) return false;
        var d = headerDefaults;
        var variant = header.animVariant || 'from-left';
        var defaultLogoImage = header.logoImage || d.logoImage;
        var mobileLogoImage = header.logoImageMbl || d.logoImageMbl || defaultLogoImage;
        var logoImage = isMobileDevice() ? mobileLogoImage : defaultLogoImage;
        var logoImageAlt = header.logoImageAlt || d.logoImageAlt;
        var altLogoImage = header.altLogoImage || d.altLogoImage;
        var altLogoImageAlt = header.altLogoImageAlt || d.altLogoImageAlt || logoImageAlt;

        if (variant === 'welcome') {
            container.innerHTML =
                '<div class="ylms-header_container ylms-header_container--welcome">' +
                '<img class="ylms-header_logo ylms-header_logo--welcome-left" src="' + altLogoImage + '" alt="' + altLogoImageAlt + '" />' +
                '<img class="ylms-header_logo ylms-header_logo--welcome-right" src="' + logoImage + '" alt="' + logoImageAlt + '" />' +
                '</div>';
            return true;
        }

        container.innerHTML =
            '<div class="ylms-header_container">' +
            '<img class="ylms-header_logo" src="' + logoImage + '" alt="' + logoImageAlt + '" />' +
            '<div>' +
            '<h1>' + header.title + '</h1>' +
            '<h2>' + header.subtitle + '</h2>' +
            '</div>' +
            '</div>';
        return true;
    }

    function init() {
        // Render module header if present
        var headerContainer = document.getElementById('ylms-header');
        if (headerContainer && headerContainer.dataset.module) {
            renderModuleHeader(headerContainer, headerContainer.dataset.module);
        }

        // Reading-time-only mode
        var readTimeOnly = document.getElementById('ylms-reading-time');
        if (readTimeOnly) {
            renderReadTime(readTimeOnly);
            return;
        }

        // Detect which module container exists
        var container = null;
        var moduleId = null;
        var lessons = null;
        for (var key in moduleLessons) {
            var containerId = 'ylms-' + key + '-progress';
            var el = document.getElementById(containerId);
            if (el) {
                container = el;
                moduleId = key;
                lessons = moduleLessons[key];
                break;
            }
        }
        if (!container) {
            console.log('[YLMS-PB] No progress bar container found');
            return;
        }

        currentState.moduleId = moduleId;
        currentState.lessons = lessons;

        var progress = parseProgress(container.dataset.progress);
        currentState.step = progress.step;
        currentState.substep = progress.substep;

        var currentLesson = lessons[currentState.step - 1];
        if (currentLesson && progress.substepCount > 1) {
            currentLesson.substeps = progress.substepCount;
        }

        createTabsFromPanels(container);

        if (!document.querySelector('.ylms-tb_container')) {
            createProgressBar(container, lessons, currentState.step, currentState.substep);
        }

        window.ylmsUpdateSubstep = updateSubsteps;
        renderReadTime(container);
    }

    function initAttachments() {
        var contentEl = findContentEl();
        if (!contentEl) return;

        var links = contentEl.querySelectorAll('a[href*="/files/"]');
        if (links.length === 0) return;

        // Dedupe by file ID extracted from URL path
        var seen = {};
        var items = [];
        var stripWords = /\b(download|view|click|open|here|file|preview|the|this|a|an)\b/gi;
        links.forEach(function (link) {
            var href = link.href;
            var rawText = link.textContent.trim();
            var match = href.match(/\/files\/(\d+)/);
            var fileId = match ? match[1] : href;
            if (seen[fileId]) return;
            seen[fileId] = true;
            var text = rawText
                .replace(stripWords, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
            items.push({
                href: href,
                text: text || 'File'
            });
        });

        if (items.length === 0) return;

        var headerEl = document.getElementById('ylms-header');
        if (!headerEl) return;

        var dlIcon = '<svg class="ylms-att_icon" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><path d="m1807.093 1482.477 79.736 79.963-355.313 355.312H355.346L.035 1562.44l79.85-79.963 322.22 322.334H1484.76l322.334-322.334ZM997.677-.033v1167.02l355.313-355.313 79.962 79.85-491.858 491.633L449.46 891.524l79.962-79.85 355.313 355.313V-.033h112.941Z" fill-rule="evenodd"/></svg>';

        var listHtml = items.map(function (item) {
            return '<a class="ylms-att_link" href="' + item.href + '" target="_blank">' + dlIcon + item.text + '</a>';
        }).join('');

        var widget = document.createElement('div');
        widget.className = 'ylms-att_widget';
        widget.innerHTML =
            '<button class="ylms-att_btn" aria-label="Downloads">' +
            dlIcon +
            '<span class="ylms-att_badge">' + items.length + '</span>' +
            '</button>' +
            '<div class="ylms-att_dropdown">' +
            '<div class="ylms-att_dropdown-header">Downloads</div>' +
            listHtml +
            '</div>';

        headerEl.appendChild(widget);

        var btn = widget.querySelector('.ylms-att_btn');
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            widget.classList.toggle('ylms-att_open');
        });

        document.addEventListener('click', function (e) {
            if (!widget.contains(e.target)) {
                widget.classList.remove('ylms-att_open');
            }
        });
    }

    function initFileDownloadIcons() {
        var contentEl = findContentEl();
        if (!contentEl) return;

        var dlIcon = '<svg class="ylms-att_icon ylms-inline-dl" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><path d="m1807.093 1482.477 79.736 79.963-355.313 355.312H355.346L.035 1562.44l79.85-79.963 322.22 322.334H1484.76l322.334-322.334ZM997.677-.033v1167.02l355.313-355.313 79.962 79.85-491.858 491.633L449.46 891.524l79.962-79.85 355.313 355.313V-.033h112.941Z" fill-rule="evenodd"/></svg>';

        var links = contentEl.querySelectorAll('a[data-api-returntype="File"]');
        links.forEach(function (link) {
            if (link.querySelector('.ylms-inline-dl')) return;
            // Skip if a Canvas download button already follows this link
            if (link.nextElementSibling && link.nextElementSibling.classList.contains('file_download_btn')) return;
            if (link.classList.contains('file_download_btn')) return;

            link.insertAdjacentHTML('beforeend', ' ' + dlIcon);
        });
    }

    function initExternalLinkIcons() {
        var contentEl = findContentEl();
        if (!contentEl) return;

        var extIcon = '<span class="external_link_icon" style="margin-inline-start: 5px; display: inline-block; text-indent: initial;" role="presentation">' +
            '<svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" style="width:1em; height:1em; vertical-align:middle; fill:currentColor">' +
            '<path d="M1226.667 267c88.213 0 160 71.787 160 160v426.667H1280v-160H106.667v800C106.667 1523 130.56 1547 160 1547h1066.667c29.44 0 53.333-24 53.333-53.333v-213.334h106.667v213.334c0 88.213-71.787 160-160 160H160c-88.213 0-160-71.787-160-160V427c0-88.213 71.787-160 160-160Zm357.706 442.293 320 320c20.8 20.8 20.8 54.614 0 75.414l-320 320-75.413-75.414 228.907-228.906H906.613V1013.72h831.254L1508.96 784.707l75.413-75.414Zm-357.706-335.626H160c-29.44 0-53.333 24-53.333 53.333v160H1280V427c0-29.333-23.893-53.333-53.333-53.333Z" fill-rule="evenodd"></path>' +
            '</svg>' +
            '<span class="screenreader-only">Links to an external site.</span>' +
            '</span>';

        var links = contentEl.querySelectorAll('a[data-external]');
        links.forEach(function (link) {
            if (link.querySelector('.external_link_icon')) return;
            link.insertAdjacentHTML('beforeend', extIcon);
        });
    }



    function initSanskritGlossary() {
        if (!sanskritGlossary || sanskritGlossary.length === 0) return;

        // Check if header exists - if not, don't highlight words in content
        var headerEl = document.getElementById('ylms-header');
        var shouldHighlightWords = !!headerEl;

        // Build a lookup map (lowercase word -> glossary entry)
        var glossaryMap = {};
        sanskritGlossary.forEach(function (entry) {
            glossaryMap[entry.word.toLowerCase()] = entry;
        });

        // Build regex from glossary words (longest first to avoid partial matches)
        // Also detect the word "Sanskrit" itself as a link to the glossary
        // Exclude overly common words (e.g. "Yoga") from inline detection
        var skipDetection = { 'yoga': true, 'yoga sutras': true };
        var words = sanskritGlossary
            .map(function (e) { return e.word; })
            .filter(function (w) { return !skipDetection[w.toLowerCase()]; });
        words.push('Sanskrit Glossary', 'Sanskrit');
        words.sort(function (a, b) { return b.length - a.length; });

        // Create pattern that matches words with optional 's' at the end for plurals
        // e.g., "Asana" matches both "Asana" and "Asanas"
        var escapedWords = words.map(function (word) {
            // Escape special regex characters
            return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        });
        var pattern = new RegExp('\\b(' + escapedWords.join('|') + ')s?\\b', 'gi');

        // Only scan and highlight text if header exists
        if (shouldHighlightWords) {
            // Scan text nodes in panels and content area
            var contentEl = findContentEl();
            var containers = document.querySelectorAll('[data-panel]');
            if (contentEl) {
                var panelContainers = Array.prototype.slice.call(containers);
                panelContainers.push(contentEl);
                containers = panelContainers;
            }
            if (containers.length === 0) {
                containers = document.querySelectorAll('body');
            }

            containers.forEach(function (container) {
                var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
                var textNodes = [];
                while (walker.nextNode()) textNodes.push(walker.currentNode);

                textNodes.forEach(function (node) {
                    if (!pattern.test(node.textContent)) return;
                    pattern.lastIndex = 0;

                    var parent = node.parentNode;
                    if (!parent) return;
                    if (parent.classList && parent.classList.contains('ylms-sanskrit')) return;
                    if (parent.closest && parent.closest('.ylms-sg_modal')) return;
                    if (parent.closest && parent.closest('.ylms-pb_wrapper')) return;
                    if (parent.closest && parent.closest('a, button, [role="button"]')) return;

                    // Only detect in body copy — p, span, li (skip headings, buttons, etc.)
                    var allowedParent = parent.closest && parent.closest('p, span, li');
                    if (!allowedParent) return;

                    var frag = document.createDocumentFragment();
                    var text = node.textContent;
                    var lastIndex = 0;
                    var match;
                    pattern.lastIndex = 0;

                    while ((match = pattern.exec(text)) !== null) {
                        if (match.index > lastIndex) {
                            frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
                        }
                        var span = document.createElement('span');
                        span.className = 'ylms-sanskrit';
                        span.textContent = match[0];
                        span.setAttribute('tabindex', '0');
                        span.setAttribute('role', 'button');
                        span.setAttribute('aria-label', match[0] + ' — click to open Sanskrit Glossary');
                        span.addEventListener('click', function () {
                            var word = this.textContent;
                            if (word.toLowerCase().indexOf('sanskrit') === 0) {
                                openGlossaryModal();
                            } else {
                                // Strip trailing 's' for plural lookup
                                var lookupWord = word.replace(/s$/i, '');
                                openGlossaryModal(lookupWord);
                            }
                        });
                        span.addEventListener('keydown', function (e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                var word = this.textContent;
                                if (word.toLowerCase().indexOf('sanskrit') === 0) {
                                    openGlossaryModal();
                                } else {
                                    // Strip trailing 's' for plural lookup
                                    var lookupWord = word.replace(/s$/i, '');
                                    openGlossaryModal(lookupWord);
                                }
                            }
                        });
                        frag.appendChild(span);
                        lastIndex = pattern.lastIndex;
                    }

                    if (lastIndex < text.length) {
                        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
                    }

                    parent.replaceChild(frag, node);
                });
            });
        }

        // Add standalone "Sanskrit" button in the header, below downloads if present
        if (headerEl) {
            var sgIcon = '<svg class="ylms-att_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor"/>' +
                '</svg>';

            var sgBtn = document.createElement('button');
            sgBtn.className = 'ylms-sg_header-btn';
            sgBtn.setAttribute('aria-label', 'Sanskrit Glossary');
            sgBtn.innerHTML = sgIcon + '<span>Sanskrit</span>';
            sgBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                openGlossaryModal();
            });
            headerEl.appendChild(sgBtn);
        }

        // Create modal (hidden by default) - always create it even if header doesn't exist
        // This allows programmatic access to the glossary
        createGlossaryModal();
    }

    function createGlossaryModal() {
        var overlay = document.createElement('div');
        overlay.className = 'ylms-sg_overlay';
        overlay.id = 'ylms-sg-overlay';

        // Group entries by first letter
        var letterGroups = {};
        sanskritGlossary.forEach(function (entry) {
            var letter = entry.word.charAt(0).toUpperCase();
            if (!letterGroups[letter]) letterGroups[letter] = [];
            letterGroups[letter].push(entry);
        });

        // Build A–Z tabs
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var availableLetters = Object.keys(letterGroups).sort();
        var firstLetter = availableLetters.length > 0 ? availableLetters[0] : 'A';

        var tabsHtml = alphabet.map(function (letter) {
            var hasEntries = letterGroups[letter] ? true : false;
            var activeClass = letter === firstLetter ? ' ylms-sg_az-active' : '';
            var disabledClass = !hasEntries ? ' ylms-sg_az-disabled' : '';
            return '<button class="ylms-sg_az-tab' + activeClass + disabledClass + '" data-letter="' + letter + '"' +
                (!hasEntries ? ' disabled' : '') + '>' + letter + '</button>';
        }).join('');

        // Build all entries in one continuous tbody with letter heading rows
        var allRowsHtml = availableLetters.map(function (letter) {
            var headingRow = '<tr class="ylms-sg_letter-heading" data-letter="' + letter + '">' +
                '<td colspan="3">' + letter + '</td></tr>';
            var rows = letterGroups[letter].map(function (entry) {
                return '<tr data-word="' + entry.word.toLowerCase() + '" data-letter="' + letter + '">' +
                    '<td class="ylms-sg_word">' + entry.word + '</td>' +
                    '<td class="ylms-sg_iast">' + (entry.iast || '') + '</td>' +
                    '<td class="ylms-sg_meaning">' + entry.meaning + '</td>' +
                    '</tr>';
            }).join('');
            return headingRow + rows;
        }).join('');

        overlay.innerHTML =
            '<div class="ylms-sg_modal" role="dialog" aria-labelledby="ylms-sg-title" aria-modal="true">' +
            '<button class="ylms-sg_close" aria-label="Close glossary">&times;</button>' +
            '<h2 id="ylms-sg-title" class="ylms-sg_title">Sanskrit Glossary</h2>' +
            '<div class="ylms-sg_az-bar">' + tabsHtml + '</div>' +
            '<div class="ylms-sg_table-wrap">' +
            '<table class="ylms-sg_table">' +
            '<tbody>' + allRowsHtml + '</tbody>' +
            '</table>' +
            '</div>' +
            '<details class="ylms-sg_legend">' +
            '<summary>Diacritics Guide</summary>' +
            '<div class="ylms-sg_legend-body">' +
            '<div class="ylms-sg_legend-col">' +
            '<span><b>ā ī ū</b> Long vowels — held for twice the duration</span>' +
            '<span><b>ṛ</b> Vowel r — a short, rolled sound</span>' +
            '<span><b>ṃ</b> Anusvāra — a nasal hum (as in <i>oṃ</i>)</span>' +
            '<span><b>ḥ</b> Visarga — a soft, breathy echo of the preceding vowel</span>' +
            '</div>' +
            '<div class="ylms-sg_legend-col">' +
            '<span><b>ś</b> Palatal sibilant — like English "sh"</span>' +
            '<span><b>ṣ</b> Retroflex sibilant — tongue curled back</span>' +
            '<span><b>ṭ ḍ ṇ</b> Retroflex consonants — tongue touches the palate</span>' +
            '<span><b>ñ ṅ</b> Nasal consonants — as in "canyon" and "sing"</span>' +
            '</div>' +
            '</div>' +
            '</details>' +
            '</div>';

        document.body.appendChild(overlay);

        var wrap = overlay.querySelector('.ylms-sg_table-wrap');
        var scrollingFromClick = false;

        // A–Z tab click → scroll to that letter heading
        var azTabs = overlay.querySelectorAll('.ylms-sg_az-tab:not(.ylms-sg_az-disabled)');
        azTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var letter = this.dataset.letter;
                var heading = overlay.querySelector('.ylms-sg_letter-heading[data-letter="' + letter + '"]');
                if (heading && wrap) {
                    scrollingFromClick = true;
                    overlay.querySelectorAll('.ylms-sg_az-tab').forEach(function (t) { t.classList.remove('ylms-sg_az-active'); });
                    this.classList.add('ylms-sg_az-active');
                    heading.scrollIntoView({ block: 'start', behavior: 'instant' });
                    // Re-enable scroll detection after animation
                    setTimeout(function () { scrollingFromClick = false; }, 600);
                }
            });
        });

        // Scroll detection → update active letter tab
        if (wrap) {
            wrap.addEventListener('scroll', function () {
                if (scrollingFromClick) return;
                var headings = overlay.querySelectorAll('.ylms-sg_letter-heading');
                var currentLetter = firstLetter;
                var wrapTop = wrap.scrollTop;
                headings.forEach(function (h) {
                    if (h.offsetTop - wrap.offsetTop <= wrapTop + 10) {
                        currentLetter = h.dataset.letter;
                    }
                });
                overlay.querySelectorAll('.ylms-sg_az-tab').forEach(function (t) {
                    t.classList.toggle('ylms-sg_az-active', t.dataset.letter === currentLetter);
                });
            });
        }

        // Close handlers
        overlay.querySelector('.ylms-sg_close').addEventListener('click', closeGlossaryModal);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeGlossaryModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeGlossaryModal();
        });
    }

    function openGlossaryModal(highlightWord) {
        var overlay = document.getElementById('ylms-sg-overlay');
        if (overlay) {
            // Clear previous highlights
            var rows = overlay.querySelectorAll('.ylms-sg_table tbody tr');
            rows.forEach(function (row) { row.classList.remove('ylms-sg_highlight'); });

            overlay.classList.add('ylms-sg_visible');
            document.body.style.overflow = 'hidden';

            if (highlightWord) {
                var target = highlightWord.toLowerCase();
                // Activate the correct letter tab
                var letter = highlightWord.charAt(0).toUpperCase();
                overlay.querySelectorAll('.ylms-sg_az-tab').forEach(function (t) {
                    t.classList.toggle('ylms-sg_az-active', t.dataset.letter === letter);
                });
                // Highlight and scroll to the row
                rows.forEach(function (row) {
                    if (row.dataset.word === target) {
                        row.classList.add('ylms-sg_highlight');
                        setTimeout(function () { row.scrollIntoView({ block: 'center', behavior: 'instant' }); }, 80);
                    }
                });
            } else {
                // Reset scroll to top when opened from header button
                var wrap = overlay.querySelector('.ylms-sg_table-wrap');
                if (wrap) wrap.scrollTop = 0;
                // Activate first letter
                var firstHeading = overlay.querySelector('.ylms-sg_letter-heading');
                if (firstHeading) {
                    var fl = firstHeading.dataset.letter;
                    overlay.querySelectorAll('.ylms-sg_az-tab').forEach(function (t) {
                        t.classList.toggle('ylms-sg_az-active', t.dataset.letter === fl);
                    });
                }
            }

            var closeBtn = overlay.querySelector('.ylms-sg_close');
            if (closeBtn) closeBtn.focus();
        }
    }

    function closeGlossaryModal() {
        var overlay = document.getElementById('ylms-sg-overlay');
        if (overlay) {
            overlay.classList.remove('ylms-sg_visible');
            document.body.style.overflow = '';
        }
    }

    function isGuideEnabledForPage(headerEl) {
        return !!headerEl;
    }

    function initGuideTriggerLink() {
        var headerEl = document.getElementById('ylms-header');
        if (!isGuideEnabledForPage(headerEl)) return;

        if (headerEl.querySelector('.ylms-guide_header-link')) return;

        var guideLink = document.createElement('a');
        guideLink.href = '#';
        guideLink.className = 'ylms-guide_header-link';
        guideLink.textContent = 'Show guide';
        guideLink.setAttribute('aria-label', 'Show onscreen guide');
        guideLink.addEventListener('click', function (e) {
            e.preventDefault();
            initGuide({ manual: true });
        });

        headerEl.appendChild(guideLink);
    }

    // ─── Interactive Guide / Tutorial System ───
    // [DESKTOP-ONLY-START]
    var guideSteps = [
        {
            selector: '#ylms-header',
            message: 'Welcome to your course tour. We\'ll quickly show you around so you can navigate the platform with confidence',
            position: 'none', // auto, top, bottom, left, right
            index: 0
        },
        {
            selector: '#header > div.ic-app-header__main-navigation > div',
            message: '<strong>Main platform navigation</strong> - Use the main platform navigation to find your course.',
            position: 'right', // auto, top, bottom, left, right
            index: 1
        },
        {
            selector: '#modules-link',
            message: '<strong>Course navigation</strong> - Use these tabs to navigate your course. Select <strong>Modules</strong> to access the full list of modules and lessons at any time. ',
            position: 'auto', // auto, top, bottom, left, right
            index: 2
        },
        {
            selector: '#breadcrumbs > ol > li:nth-child(4)',
            message: '<strong>Lesson navigation</strong> - See the module number, lesson title, and page title here. For easiest navigation, use the Modules tab.',
            position: 'bottom', // auto, top, bottom, left, right
            index: 3
        },
        {
            selector: '#ylms-header > div.ylms-att_widget',
            message: '<strong>Downloadable resources</strong> - Easily find all downloads for a particular lesson in one convenient place for quick access.',
            position: 'auto',
            index: 4
        },
        {
            selector: '.ylms-sg_header-btn',
            message: '<strong>Sanskrit glossary</strong> - Open the Sanskrit glossary to explore yoga terms and build your confidence with key language.',
            position: 'auto',
            index: 5
        },
        {
            selector: '#ylms-module0-progress > div > div > div.ylms-pb_steps',
            message: '<strong>Lesson progress bar</strong> - Track your progress through each module with this visual progress bar.',
            position: 'bottom',
            index: 6
        },
        {
            selector: '#wiki_page_show > div > div.ylms-pb_readtime',
            message: '<strong>Estimated lesson time</strong> - Check the estimated reading and exercise time to plan your learning.',
            position: 'right',
            index: 7
        },
        {
            selector: 'iframe[src*="vimeo.com"], iframe[src*="player.vimeo.com"]',
            message: '<strong>Video and interactive content</strong> - Lessons include text, video, and interactive content to support your learning. Use the video controls to adjust playback, turn on captions, or go fullscreen.',
            position: 'auto',
            offsetTarget: 'bottom-right', // Special positioning for iframe controls
            index: 8
        },
        {
            selector: '#mark-as-done-container',
            message: '<strong>Mark as Done</strong> - Mark each lesson as done to unlock the next one.',
            position: 'auto',
            index: 9
        },
        {
            selector: '#module_navigation_target > div > div.module-sequence-footer > div > div.module-sequence-footer-right > span.module-sequence-footer-button--next',
            message: '<strong>Next Lesson</strong> - Once you have marked the lesson as done, click Next to continue.',
            position: 'auto',
            index: 10
        },
        {
            selector: '.ylms-guide_header-link',
            message: '<strong>Replay Guide</strong> - Use this link on this page to replay the on-screen guide.',
            position: 'auto',
            index: 11
        },
    ];

    var GUIDE_STORAGE_KEY = 'ylms-guide-completed';
    var GUIDE_DELAY_MS = 5000; // 5 seconds
    var GUIDE_DISABLE_ON_MOBILE = true; // Set to false to enable on mobile

    function hasSeenGuide() {
        try {
            return localStorage.getItem(GUIDE_STORAGE_KEY) === 'true';
        } catch (e) {
            return false;
        }
    }

    function markGuideAsSeen() {
        try {
            localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
        } catch (e) {
            // Silently fail if localStorage is unavailable
        }
    }

    function calculateTooltipPosition(targetEl, tooltip, step) {
        var rect = targetEl.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // 'none' position: center on screen, no arrow
        if (step && step.position === 'none') {
            return {
                top: (viewportHeight - tooltipRect.height) / 2,
                left: (viewportWidth - tooltipRect.width) / 2,
                arrowPosition: 'none',
                targetRect: rect
            };
        }

        var ARROW_SIZE = 10;
        var SPACING = 20; // Spacing from target element

        // Handle special offset targets (e.g., iframe controls)
        var targetRect = rect;
        if (step && step.offsetTarget === 'bottom-right') {
            // Point to bottom-right area of the element (where video controls typically are)
            var controlsWidth = 200; // Approximate width of video controls
            var controlsHeight = 50; // Approximate height of video controls
            targetRect = {
                top: rect.bottom - controlsHeight,
                bottom: rect.bottom,
                left: rect.right - controlsWidth,
                right: rect.right,
                width: controlsWidth,
                height: controlsHeight
            };
        }

        // All calculations are viewport-relative (for position: fixed)
        var spaceTop = targetRect.top;
        var spaceBottom = viewportHeight - targetRect.bottom;
        var spaceLeft = targetRect.left;
        var spaceRight = viewportWidth - targetRect.right;

        var position = 'bottom'; // default
        var top, left, arrowPosition;

        // Use explicitly specified position; only auto-detect for 'auto' or unset
        var specifiedPosition = step && step.position;
        if (specifiedPosition && specifiedPosition !== 'auto' && specifiedPosition !== 'none') {
            position = specifiedPosition;
        } else {
            // Prefer right/left for elements on the sides of the page
            var isLeftSide = targetRect.left < viewportWidth / 3;
            var isRightSide = targetRect.right > (viewportWidth * 2) / 3;

            // Choose position with most space, with preference for horizontal on sides
            if (isLeftSide && spaceRight >= tooltipRect.width + SPACING + ARROW_SIZE) {
                position = 'right';
            } else if (isRightSide && spaceLeft >= tooltipRect.width + SPACING + ARROW_SIZE) {
                position = 'left';
            } else if (spaceBottom >= tooltipRect.height + SPACING + ARROW_SIZE) {
                position = 'bottom';
            } else if (spaceTop >= tooltipRect.height + SPACING + ARROW_SIZE) {
                position = 'top';
            } else if (spaceRight >= tooltipRect.width + SPACING + ARROW_SIZE) {
                position = 'right';
            } else if (spaceLeft >= tooltipRect.width + SPACING + ARROW_SIZE) {
                position = 'left';
            } else {
                // Not enough space anywhere, default to bottom
                position = 'bottom';
            }
        }

        // Calculate viewport-relative position (for position: fixed)
        switch (position) {
            case 'bottom':
                top = targetRect.bottom + SPACING;
                left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
                arrowPosition = 'top';
                break;
            case 'top':
                top = targetRect.top - tooltipRect.height - SPACING;
                left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
                arrowPosition = 'bottom';
                break;
            case 'right':
                top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
                left = targetRect.right + SPACING;
                arrowPosition = 'left';
                break;
            case 'left':
                top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
                left = targetRect.left - tooltipRect.width - SPACING;
                arrowPosition = 'right';
                break;
        }

        // Keep tooltip within viewport bounds
        var minLeft = 10;
        var maxLeft = viewportWidth - tooltipRect.width - 10;
        var minTop = 10;
        var maxTop = viewportHeight - tooltipRect.height - 10;

        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;
        if (top < minTop) top = minTop;
        if (top > maxTop) top = maxTop;

        return { top: top, left: left, arrowPosition: arrowPosition, targetRect: targetRect };
    }

    function createGuideTooltip(step, stepIndex, totalSteps) {
        var tooltip = document.createElement('div');
        tooltip.className = 'ylms-guide_tooltip';
        tooltip.setAttribute('role', 'dialog');
        tooltip.setAttribute('aria-live', 'polite');

        var isLastStep = stepIndex === totalSteps - 1;
        var nextBtnText = isLastStep ? 'Done' : 'Next';

        // Create dot indicators
        var dotsHtml = '';
        for (var i = 0; i < totalSteps; i++) {
            var dotClass = 'ylms-guide_dot';
            if (i === stepIndex) dotClass += ' ylms-guide_dot--active';
            dotsHtml += '<span class="' + dotClass + '"></span>';
        }

        var backBtnHtml = stepIndex > 0 ? '<button class="ylms-guide_btn ylms-guide_btn--back">Back</button>' : '';

        tooltip.innerHTML =
            '<div class="ylms-guide_arrow"></div>' +
            '<button class="ylms-guide_close" aria-label="Close guide">&times;</button>' +
            '<div class="ylms-guide_content">' +
            '<p class="ylms-guide_message">' + step.message + '</p>' +
            '<div class="ylms-guide_actions">' +
            '<div class="ylms-guide_dots">' + dotsHtml + '</div>' +
            '<div class="ylms-guide_buttons">' +
            backBtnHtml +
            '<button class="ylms-guide_btn ylms-guide_btn--next">' + nextBtnText + '</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        return tooltip;
    }

    function showGuideStep(stepIndex) {
        // Remove any existing tooltip, overlay, and highlight
        var existingTooltip = document.querySelector('.ylms-guide_tooltip');
        var existingOverlay = document.querySelector('.ylms-guide_overlay');
        var existingHighlight = document.querySelector('.ylms-guide_highlight-ring');

        if (existingTooltip) existingTooltip.remove();
        if (existingOverlay) existingOverlay.remove();
        if (existingHighlight) existingHighlight.remove();

        if (stepIndex >= guideSteps.length) {
            markGuideAsSeen();
            return;
        }

        var step = guideSteps[stepIndex];
        var targetEl = document.querySelector(step.selector);

        if (!targetEl) {
            // Element not found, skip to next step
            showGuideStep(stepIndex + 1);
            return;
        }

        // Create semi-transparent overlay
        var overlay = document.createElement('div');
        overlay.className = 'ylms-guide_overlay';
        document.body.appendChild(overlay);

        // Create non-disruptive highlight ring (fixed position, doesn't affect layout)
        var highlightRing = document.createElement('div');
        highlightRing.className = 'ylms-guide_highlight-ring';
        document.body.appendChild(highlightRing);

        // Create tooltip (appended to body, not near target element)
        var tooltip = createGuideTooltip(step, stepIndex, guideSteps.length);
        document.body.appendChild(tooltip);

        // Position highlight ring to match target element
        function updatePositions() {
            var rect = targetEl.getBoundingClientRect();

            // Calculate tooltip position (may use offset target)
            var pos = calculateTooltipPosition(targetEl, tooltip, step);

            // Update highlight ring position (use offset target if specified)
            var highlightRect = pos.targetRect || rect;
            if (pos.arrowPosition === 'none') {
                highlightRing.style.display = 'none';
            } else {
                highlightRing.style.display = '';
                highlightRing.style.top = highlightRect.top + 'px';
                highlightRing.style.left = highlightRect.left + 'px';
                highlightRing.style.width = highlightRect.width + 'px';
                highlightRing.style.height = highlightRect.height + 'px';
            }

            // Update tooltip position
            tooltip.style.top = pos.top + 'px';
            tooltip.style.left = pos.left + 'px';

            // Update arrow position
            var arrow = tooltip.querySelector('.ylms-guide_arrow');
            arrow.className = 'ylms-guide_arrow ylms-guide_arrow--' + pos.arrowPosition;
        }

        // Initial positioning
        updatePositions();

        // Position tooltip after it's in the DOM so we can measure it
        requestAnimationFrame(function () {
            updatePositions();

            // Fade in
            requestAnimationFrame(function () {
                overlay.classList.add('ylms-guide_visible');
                tooltip.classList.add('ylms-guide_visible');
            });

            // Scroll target into view if needed
            var rect = targetEl.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Update positions after scroll
                setTimeout(updatePositions, 500);
            }
        });

        // Update positions on scroll/resize
        var updateTimer;
        function scheduleUpdate() {
            if (updateTimer) clearTimeout(updateTimer);
            updateTimer = setTimeout(updatePositions, 10);
        }
        window.addEventListener('scroll', scheduleUpdate, true);
        window.addEventListener('resize', scheduleUpdate);

        // Event handlers
        var nextBtn = tooltip.querySelector('.ylms-guide_btn--next');
        var skipBtn = tooltip.querySelector('.ylms-guide_close');

        function cleanup() {
            tooltip.classList.remove('ylms-guide_visible');
            overlay.classList.remove('ylms-guide_visible');
            highlightRing.remove();
            window.removeEventListener('scroll', scheduleUpdate, true);
            window.removeEventListener('resize', scheduleUpdate);
        }

        var backBtn = tooltip.querySelector('.ylms-guide_btn--back');
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                cleanup();
                setTimeout(function () {
                    tooltip.remove();
                    overlay.remove();
                    showGuideStep(stepIndex - 1);
                }, 300);
            });
        }

        nextBtn.addEventListener('click', function () {
            cleanup();
            setTimeout(function () {
                tooltip.remove();
                overlay.remove();
                showGuideStep(stepIndex + 1);
            }, 300);
        });

        skipBtn.addEventListener('click', function () {
            cleanup();
            setTimeout(function () {
                tooltip.remove();
                overlay.remove();
            }, 300);
            markGuideAsSeen();
        });

        // Close on Escape
        function handleEscape(e) {
            if (e.key === 'Escape') {
                cleanup();
                tooltip.remove();
                overlay.remove();
                markGuideAsSeen();
                document.removeEventListener('keydown', handleEscape);
            }
        }
        document.addEventListener('keydown', handleEscape);
    }

    function bookmarkSite() {
        if (isMobileDevice()) return;

        var headerEl = document.getElementById('ylms-header');
        if (!isGuideEnabledForPage(headerEl)) return;

        var storageKey = 'ylms-bookmark-reminder-dismissed';
        try {
            if (localStorage.getItem(storageKey) === 'true') return;
        } catch (e) {
            // Ignore storage access errors and continue showing reminder
        }

        if (headerEl.querySelector('.ylms-bookmark-banner')) return;

        var shortcut = navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL';
        var banner = document.createElement('div');
        banner.className = 'ylms-bookmark-banner';
        banner.innerHTML =
            '<span class="ylms-bookmark-banner_text">You may find it useful to bookmark this reference page using ' + shortcut + ' + D.</span>' +
            '<button type="button" class="ylms-bookmark-banner_dismiss" aria-label="Dismiss bookmark reminder">Don\'t show again</button>';

        var dismissBtn = banner.querySelector('.ylms-bookmark-banner_dismiss');
        dismissBtn.addEventListener('click', function () {
            try {
                localStorage.setItem(storageKey, 'true');
            } catch (e) {
                // Ignore storage access errors
            }

            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        });

        headerEl.appendChild(banner);
    }

    function initGuide(options) {
        var opts = options || {};
        var isManual = !!opts.manual;

        // Activate guide for module 0-2 pages or guide demo pages
        var headerEl = document.getElementById('ylms-header');
        if (!isGuideEnabledForPage(headerEl)) return;

        // Disable on mobile if flag is set
        if (GUIDE_DISABLE_ON_MOBILE && isMobileDevice()) {
            console.log('[YLMS-Guide] Disabled on mobile devices');
            return;
        }

        // Check if user has already seen the guide
        if (!isManual && hasSeenGuide()) return;

        if (isManual) {
            showGuideStep(0);
            return;
        }

        // Wait for delay, then start guide
        setTimeout(function () {
            showGuideStep(0);
        }, GUIDE_DELAY_MS);
    }
    // [DESKTOP-ONLY-END]

    preloadFonts();
    setTimeout(initIframeTips, 450);
    setTimeout(init, 250);
    setTimeout(initAttachments, 500);
    setTimeout(initFileDownloadIcons, 550);
    setTimeout(initExternalLinkIcons, 575);
    setTimeout(initSanskritGlossary, 600);
    // [DESKTOP-ONLY-START]
    setTimeout(initGuideTriggerLink, 625);
    setTimeout(initGuide, 650);

    setTimeout(bookmarkSite, 10000);
    // [DESKTOP-ONLY-END]



})();
