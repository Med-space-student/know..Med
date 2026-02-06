/**
 * KnowMed - Medical Education Platform
 * Complete JavaScript Implementation
 * Firebase Integration + Dynamic Rendering + Quiz System
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase (commented out - replace with your config)
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    currentUser: null,
    currentPage: 'home',
    currentSemester: 1,
    currentSubject: null,
    currentLesson: null,
    progress: {},
    quizState: {
        questions: [],
        currentIndex: 0,
        answers: [],
        score: 0
    },
    searchResults: [],
    streak: 0,
    lastStudyDate: null
};

// ============================================
// COMPLETE LESSON DATA
// ============================================
const LessonsData = {
    // SEMESTER 1
    1: {
        anatomy: {
            id: 'anatomy',
            name: 'Anatomy',
            icon: 'fa-bone',
            semester: 1,
            chapters: ['General Anatomy', 'Osteology', 'Arthrology', 'Myology', 'Angiology', 'Neurology'],
            lessons: [
                { id: 'anat1-1', chapter: 'General Anatomy', title: 'Introduction to Anatomy', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-2', chapter: 'General Anatomy', title: 'Anatomical Terminology', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-3', chapter: 'Osteology', title: 'Introduction to Bones', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-4', chapter: 'Osteology', title: 'Vertebral Column', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-5', chapter: 'Osteology', title: 'Thoracic Cage', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-6', chapter: 'Osteology', title: 'Skull Bones', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-7', chapter: 'Arthrology', title: 'Introduction to Joints', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-8', chapter: 'Arthrology', title: 'Vertebral Joints', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-9', chapter: 'Myology', title: 'Introduction to Muscles', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-10', chapter: 'Myology', title: 'Muscles of the Back', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-11', chapter: 'Angiology', title: 'Heart Anatomy', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-12', chapter: 'Angiology', title: 'Systemic Circulation', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-13', chapter: 'Neurology', title: 'Central Nervous System', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-14', chapter: 'Neurology', title: 'Peripheral Nerves', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat1-15', chapter: 'Neurology', title: 'Autonomic Nervous System', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        biochemistry: {
            id: 'biochemistry',
            name: 'Biochemistry',
            icon: 'fa-flask',
            semester: 1,
            chapters: ['Introduction', 'Carbohydrates', 'Lipids', 'Proteins', 'Enzymes'],
            lessons: [
                { id: 'bioch1-1', chapter: 'Introduction', title: 'Cell & Molecular Biology Basics', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-2', chapter: 'Carbohydrates', title: 'Monosaccharides & Disaccharides', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-3', chapter: 'Carbohydrates', title: 'Polysaccharides', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-4', chapter: 'Carbohydrates', title: 'Glycolysis', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-5', chapter: 'Carbohydrates', title: 'Gluconeogenesis', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-6', chapter: 'Lipids', title: 'Fatty Acids & Triglycerides', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-7', chapter: 'Lipids', title: 'Phospholipids & Membranes', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-8', chapter: 'Lipids', title: 'Cholesterol & Steroids', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-9', chapter: 'Lipids', title: 'Lipid Metabolism', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-10', chapter: 'Proteins', title: 'Amino Acids Structure', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-11', chapter: 'Proteins', title: 'Protein Structure', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch1-12', chapter: 'Enzymes', title: 'Enzyme Kinetics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        cytology: {
            id: 'cytology',
            name: 'Cytology',
            icon: 'fa-microscope',
            semester: 1,
            chapters: ['Cell Structure', 'Cell Membrane', 'Organelles'],
            lessons: [
                { id: 'cyto1-1', chapter: 'Cell Structure', title: 'Introduction to Cell Biology', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-2', chapter: 'Cell Structure', title: 'Prokaryotic vs Eukaryotic Cells', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-3', chapter: 'Cell Membrane', title: 'Membrane Structure', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-4', chapter: 'Cell Membrane', title: 'Transport Mechanisms', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-5', chapter: 'Organelles', title: 'Nucleus & Nuclear Envelope', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-6', chapter: 'Organelles', title: 'Endoplasmic Reticulum', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-7', chapter: 'Organelles', title: 'Golgi Apparatus', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-8', chapter: 'Organelles', title: 'Mitochondria', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-9', chapter: 'Organelles', title: 'Lysosomes & Peroxisomes', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto1-10', chapter: 'Organelles', title: 'Cell Cycle & Division', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        biophysics: {
            id: 'biophysics',
            name: 'Biophysics',
            icon: 'fa-atom',
            semester: 1,
            chapters: ['Mechanics', 'Fluids', 'Thermodynamics', 'Electricity'],
            lessons: [
                { id: 'bioph1-1', chapter: 'Mechanics', title: 'Forces & Motion', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-2', chapter: 'Mechanics', title: 'Work, Energy & Power', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-3', chapter: 'Fluids', title: 'Fluid Statics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-4', chapter: 'Fluids', title: 'Fluid Dynamics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-5', chapter: 'Fluids', title: 'Blood Circulation Physics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-6', chapter: 'Thermodynamics', title: 'Laws of Thermodynamics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-7', chapter: 'Thermodynamics', title: 'Heat Transfer in Body', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-8', chapter: 'Electricity', title: 'Basic Electrical Concepts', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph1-9', chapter: 'Electricity', title: 'Bioelectricity & Nerve Conduction', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        chemistry: {
            id: 'chemistry',
            name: 'Chemistry',
            icon: 'fa-vial',
            semester: 1,
            chapters: ['General Chemistry', 'Organic Chemistry', 'Biochemistry Intro'],
            lessons: [
                { id: 'chem1-1', chapter: 'General Chemistry', title: 'Atomic Structure', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-2', chapter: 'General Chemistry', title: 'Chemical Bonding', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-3', chapter: 'General Chemistry', title: 'Stoichiometry', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-4', chapter: 'General Chemistry', title: 'Solutions & Concentration', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-5', chapter: 'General Chemistry', title: 'Acids, Bases & pH', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-6', chapter: 'Organic Chemistry', title: 'Hydrocarbons', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-7', chapter: 'Organic Chemistry', title: 'Functional Groups', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem1-8', chapter: 'Organic Chemistry', title: 'Isomerism', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        biostatistics: {
            id: 'biostatistics',
            name: 'Biostatistics',
            icon: 'fa-chart-bar',
            semester: 1,
            chapters: ['Descriptive Statistics', 'Probability', 'Inferential Statistics'],
            lessons: [
                { id: 'biost1-1', chapter: 'Descriptive Statistics', title: 'Data Types & Collection', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost1-2', chapter: 'Descriptive Statistics', title: 'Measures of Central Tendency', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost1-3', chapter: 'Descriptive Statistics', title: 'Measures of Dispersion', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost1-4', chapter: 'Probability', title: 'Basic Probability Concepts', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost1-5', chapter: 'Probability', title: 'Probability Distributions', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost1-6', chapter: 'Inferential Statistics', title: 'Hypothesis Testing Basics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost1-7', chapter: 'Inferential Statistics', title: 'Confidence Intervals', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        histology: {
            id: 'histology',
            name: 'Histology',
            icon: 'fa-microscope',
            semester: 1,
            chapters: ['Basic Tissues', 'Epithelial', 'Connective', 'Muscle', 'Nervous'],
            lessons: [
                { id: 'hist1-1', chapter: 'Basic Tissues', title: 'Introduction to Histology', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'hist1-2', chapter: 'Epithelial', title: 'Epithelial Tissue Types', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'hist1-3', chapter: 'Connective', title: 'Connective Tissue Proper', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'hist1-4', chapter: 'Connective', title: 'Cartilage & Bone', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'hist1-5', chapter: 'Connective', title: 'Blood & Hematopoiesis', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'hist1-6', chapter: 'Muscle', title: 'Muscle Tissue Types', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'hist1-7', chapter: 'Nervous', title: 'Nervous Tissue', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        physiology: {
            id: 'physiology',
            name: 'Physiology',
            icon: 'fa-heartbeat',
            semester: 1,
            chapters: ['Cell Physiology', 'Nerve & Muscle', 'Cardiovascular', 'Respiratory'],
            lessons: [
                { id: 'phys1-1', chapter: 'Cell Physiology', title: 'Cell Membrane Transport', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-2', chapter: 'Cell Physiology', title: 'Membrane Potentials', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-3', chapter: 'Nerve & Muscle', title: 'Action Potentials', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-4', chapter: 'Nerve & Muscle', title: 'Synaptic Transmission', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-5', chapter: 'Nerve & Muscle', title: 'Muscle Contraction', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-6', chapter: 'Cardiovascular', title: 'Cardiac Electrophysiology', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-7', chapter: 'Cardiovascular', title: 'Cardiac Cycle', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'phys1-8', chapter: 'Respiratory', title: 'Mechanics of Breathing', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        }
    },
    // SEMESTER 2
    2: {
        anatomy: {
            id: 'anatomy',
            name: 'Anatomy',
            icon: 'fa-bone',
            semester: 2,
            chapters: ['Osteology II', 'Arthrology II', 'Myology II', 'Angiology II', 'Neurology II'],
            lessons: [
                // Osteology Part II
                { id: 'anat2-1', chapter: 'Osteology II', title: 'Coxal Bone and Femur', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-2', chapter: 'Osteology II', title: 'Tibia and Fibula', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-3', chapter: 'Osteology II', title: 'The Bones of the Foot', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Arthrology Part II
                { id: 'anat2-4', chapter: 'Arthrology II', title: 'Hip Joint', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-5', chapter: 'Arthrology II', title: 'Knee Joint', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-6', chapter: 'Arthrology II', title: 'Talo-crural (Ankle) Joint', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Myology Part II
                { id: 'anat2-7', chapter: 'Myology II', title: 'Muscles of the Hip', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-8', chapter: 'Myology II', title: 'Muscles of the Thigh', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-9', chapter: 'Myology II', title: 'Muscles of the Leg', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-10', chapter: 'Myology II', title: 'Muscles of the Foot', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Angiology Part II
                { id: 'anat2-11', chapter: 'Angiology II', title: 'Femoral Artery', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-12', chapter: 'Angiology II', title: 'Popliteal Artery', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-13', chapter: 'Angiology II', title: 'Tibio-fibular Trunk', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-14', chapter: 'Angiology II', title: 'Dorsal Arteries of Leg/Foot', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-15', chapter: 'Angiology II', title: 'Venous & Lymphatic Drainage', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Neurology Part II
                { id: 'anat2-16', chapter: 'Neurology II', title: 'Lumbar Plexus', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-17', chapter: 'Neurology II', title: 'Femoral Nerve', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-18', chapter: 'Neurology II', title: 'Modified Obturator Nerve', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-19', chapter: 'Neurology II', title: 'Sacral Plexus & Sciatic Nerve', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'anat2-20', chapter: 'Neurology II', title: 'Terminal Branches of Sciatic', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        biochemistry: {
            id: 'biochemistry',
            name: 'Biochemistry',
            icon: 'fa-flask',
            semester: 2,
            chapters: ['Amino Acids', 'Enzymes', 'Nucleic Acids', 'Bioenergetics'],
            lessons: [
                // Amino Acids
                { id: 'bioch2-1', chapter: 'Amino Acids', title: 'Amino Acids, Peptides, Proteins', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-2', chapter: 'Amino Acids', title: 'Structure & Properties of A.A.', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-3', chapter: 'Amino Acids', title: 'Amino Acid Metabolism', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-4', chapter: 'Amino Acids', title: 'Protein Sequencing', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Enzymes
                { id: 'bioch2-5', chapter: 'Enzymes', title: 'Enzymology', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-6', chapter: 'Enzymes', title: 'Single-substrate Enzyme Kinetics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-7', chapter: 'Enzymes', title: 'Modulation of Enzymatic Activity', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-8', chapter: 'Enzymes', title: 'Allosteric Enzymes', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioch2-9', chapter: 'Enzymes', title: 'Vitamins and Coenzymes', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Nucleic Acids
                { id: 'bioch2-10', chapter: 'Nucleic Acids', title: 'Nucleic Acids Structure', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Bioenergetics
                { id: 'bioch2-11', chapter: 'Bioenergetics', title: 'Bioenergetics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        cytology: {
            id: 'cytology',
            name: 'Cytology',
            icon: 'fa-microscope',
            semester: 2,
            chapters: ['Cell Biology'],
            lessons: [
                { id: 'cyto2-1', chapter: 'Cell Biology', title: 'Endoplasmic Reticulum', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-2', chapter: 'Cell Biology', title: 'Golgi Apparatus', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-3', chapter: 'Cell Biology', title: 'Ribosome', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-4', chapter: 'Cell Biology', title: 'Peroxisomes', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-5', chapter: 'Cell Biology', title: 'Lysosomes', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-6', chapter: 'Cell Biology', title: 'Mitochondria', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-7', chapter: 'Cell Biology', title: 'Interphase Nucleus', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'cyto2-8', chapter: 'Cell Biology', title: 'Cell Cycle', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        chemistry: {
            id: 'chemistry',
            name: 'Chemistry',
            icon: 'fa-vial',
            semester: 2,
            chapters: ['General Chemistry', 'Organic Chemistry'],
            lessons: [
                // General Chemistry
                { id: 'chem2-1', chapter: 'General Chemistry', title: 'Oxidation-Reduction (Ox/Red)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem2-2', chapter: 'General Chemistry', title: 'Acid-Base Reactions', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem2-3', chapter: 'General Chemistry', title: 'Solubility', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                // Organic Chemistry
                { id: 'chem2-4', chapter: 'Organic Chemistry', title: 'Reaction Mechanisms', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem2-5', chapter: 'Organic Chemistry', title: 'Electrophilic Addition (HX, X₂)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem2-6', chapter: 'Organic Chemistry', title: 'Nucleophilic Substitution (SN₁, SN₂)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem2-7', chapter: 'Organic Chemistry', title: 'Elimination (E₁, E₂)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'chem2-8', chapter: 'Organic Chemistry', title: 'Competition (SN, E)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        biophysics: {
            id: 'biophysics',
            name: 'Biophysics',
            icon: 'fa-atom',
            semester: 2,
            chapters: ['Optics & Imaging'],
            lessons: [
                { id: 'bioph2-1', chapter: 'Optics & Imaging', title: 'Optics', type: 'theory', tags: ['basics'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph2-2', chapter: 'Optics & Imaging', title: 'Spherical Diopters', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph2-3', chapter: 'Optics & Imaging', title: 'Thin Lenses', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph2-4', chapter: 'Optics & Imaging', title: 'The Eye', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph2-5', chapter: 'Optics & Imaging', title: 'Vision (Anomalies of the Eye)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'bioph2-6', chapter: 'Optics & Imaging', title: 'Non-ionizing Imaging', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        biostatistics: {
            id: 'biostatistics',
            name: 'Biostatistics',
            icon: 'fa-chart-bar',
            semester: 2,
            chapters: ['Stats & Informatics'],
            lessons: [
                { id: 'biost2-1', chapter: 'Stats & Informatics', title: 'Hypothesis Testing', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost2-2', chapter: 'Stats & Informatics', title: 'Comparison of Two Percentages', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost2-3', chapter: 'Stats & Informatics', title: 'Chi-square (X²) Test of Homogeneity', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost2-4', chapter: 'Stats & Informatics', title: 'Chi-square (X²) Test of Conformity', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost2-5', chapter: 'Stats & Informatics', title: 'Analysis of Variance (ANOVA)', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost2-6', chapter: 'Stats & Informatics', title: 'Epidemiological Measures', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'biost2-7', chapter: 'Stats & Informatics', title: 'Health Indicators', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        embryology: {
            id: 'embryology',
            name: 'Embryology',
            icon: 'fa-baby',
            semester: 2,
            chapters: ['Development'],
            lessons: [
                { id: 'embryo2-1', chapter: 'Development', title: 'Gametogenesis', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-2', chapter: 'Development', title: 'Spermatogenesis', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-3', chapter: 'Development', title: 'Oogenesis', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-4', chapter: 'Development', title: 'Ovulation', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-5', chapter: 'Development', title: 'First Week of Development', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-6', chapter: 'Development', title: 'Second Week of Development', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-7', chapter: 'Development', title: 'Third Week of Development', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-8', chapter: 'Development', title: 'Fourth Week of Development', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-9', chapter: 'Development', title: 'Annexes and Placenta', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-10', chapter: 'Development', title: 'Twin Pregnancies', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'embryo2-11', chapter: 'Development', title: 'Stem Cells', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        },
        ssh: {
            id: 'ssh',
            name: 'SSH',
            icon: 'fa-users',
            semester: 2,
            chapters: ['Social Sciences & Humanities'],
            lessons: [
                { id: 'ssh2-1', chapter: 'SSH', title: 'History of Medicine', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-2', chapter: 'SSH', title: 'History of Anatomy', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-3', chapter: 'SSH', title: 'Medical Ethics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-4', chapter: 'SSH', title: 'Bioethics', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-5', chapter: 'SSH', title: 'Medical Deontology', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-6', chapter: 'SSH', title: 'Medical Responsibility', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-7', chapter: 'SSH', title: 'Health, Society, and Culture', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-8', chapter: 'SSH', title: 'The Caregiver-Patient Relationship', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-9', chapter: 'SSH', title: 'Introduction to Public Health', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-10', chapter: 'SSH', title: 'Health Indicators (SSH)', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-11', chapter: 'SSH', title: 'Need and Supply of Care', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-12', chapter: 'SSH', title: 'Organization of the Health System', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-13', chapter: 'SSH', title: 'Quality and Safety of Care', type: 'theory', tags: ['high-yield'], pdfURL: '#', hasVideo: true, hasSummary: true },
                { id: 'ssh2-14', chapter: 'SSH', title: 'Health Economics', type: 'theory', tags: [], pdfURL: '#', hasVideo: true, hasSummary: true }
            ]
        }
    }
};

// ============================================
// QUIZ DATA
// ============================================
const QuizData = {
    anatomy: [
        {
            id: 'q1',
            question: 'Which bone forms the posterior part of the hard palate?',
            options: ['Maxilla', 'Palatine bone', 'Vomer', 'Sphenoid'],
            correct: 1,
            explanation: 'The palatine bones form the posterior one-third of the hard palate.',
            tags: ['high-yield']
        },
        {
            id: 'q2',
            question: 'The femoral artery passes through which opening?',
            options: ['Obturator foramen', 'Greater sciatic foramen', 'Adductor hiatus', 'Femoral ring'],
            correct: 2,
            explanation: 'The femoral artery passes through the adductor hiatus to become the popliteal artery.',
            tags: ['high-yield']
        },
        {
            id: 'q3',
            question: 'Which muscle is the main extensor of the knee?',
            options: ['Biceps femoris', 'Quadriceps femoris', 'Sartorius', 'Gracilis'],
            correct: 1,
            explanation: 'The quadriceps femoris is the main extensor of the knee joint.',
            tags: ['high-yield']
        },
        {
            id: 'q4',
            question: 'The sciatic nerve is formed by which spinal nerves?',
            options: ['L1-L4', 'L4-S3', 'T12-L3', 'S1-S4'],
            correct: 1,
            explanation: 'The sciatic nerve is formed by the ventral rami of L4-S3.',
            tags: ['high-yield']
        },
        {
            id: 'q5',
            question: 'Which ligament prevents posterior dislocation of the tibia on the femur?',
            options: ['ACL', 'PCL', 'MCL', 'LCL'],
            correct: 1,
            explanation: 'The PCL (Posterior Cruciate Ligament) prevents posterior displacement of the tibia.',
            tags: ['high-yield']
        }
    ],
    biochemistry: [
        {
            id: 'q1',
            question: 'Which amino acid is essential for humans?',
            options: ['Alanine', 'Glutamate', 'Lysine', 'Aspartate'],
            correct: 2,
            explanation: 'Lysine is an essential amino acid that must be obtained from the diet.',
            tags: ['high-yield']
        },
        {
            id: 'q2',
            question: 'What is the Michaelis constant (Km)?',
            options: ['Maximum reaction rate', 'Substrate concentration at half Vmax', 'Enzyme concentration', 'Product concentration'],
            correct: 1,
            explanation: 'Km is the substrate concentration at which the reaction rate is half of Vmax.',
            tags: ['high-yield']
        },
        {
            id: 'q3',
            question: 'Which vitamin is a component of NAD+?',
            options: ['Vitamin A', 'Vitamin B3 (Niacin)', 'Vitamin C', 'Vitamin D'],
            correct: 1,
            explanation: 'Niacin (Vitamin B3) is a component of NAD+ and NADP+.',
            tags: ['high-yield']
        }
    ],
    cytology: [
        {
            id: 'q1',
            question: 'Which organelle is responsible for protein synthesis?',
            options: ['Mitochondria', 'Ribosome', 'Lysosome', 'Golgi apparatus'],
            correct: 1,
            explanation: 'Ribosomes are the sites of protein synthesis in the cell.',
            tags: ['high-yield']
        },
        {
            id: 'q2',
            question: 'The Golgi apparatus is primarily involved in:',
            options: ['ATP production', 'Protein modification and packaging', 'DNA replication', 'Protein synthesis'],
            correct: 1,
            explanation: 'The Golgi apparatus modifies, packages, and sorts proteins for secretion or delivery.',
            tags: ['high-yield']
        }
    ],
    embryology: [
        {
            id: 'q1',
            question: 'During which week does gastrulation occur?',
            options: ['First week', 'Second week', 'Third week', 'Fourth week'],
            correct: 2,
            explanation: 'Gastrulation occurs during the third week of development.',
            tags: ['high-yield']
        },
        {
            id: 'q2',
            question: 'The placenta is derived from:',
            options: ['Only maternal tissue', 'Only fetal tissue', 'Both maternal and fetal tissue', 'Neither maternal nor fetal tissue'],
            correct: 2,
            explanation: 'The placenta is derived from both maternal (decidua basalis) and fetal (chorion frondosum) tissue.',
            tags: ['high-yield']
        }
    ]
};

// ============================================
// NAVIGATION ENGINE
// ============================================
const Navigation = {
    init() {
        // Hamburger menu
        document.getElementById('hamburgerBtn').addEventListener('click', this.toggleMenu);
        
        // Navigation links
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                const year = e.currentTarget.dataset.year;
                
                if (page === 'subjects' && year) {
                    AppState.currentSemester = parseInt(year);
                }
                
                this.navigateTo(page);
                this.closeMenu();
            });
        });

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                if (page) this.navigateTo(page);
            });
        });

        // Semester tabs
        document.querySelectorAll('.semester-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.semester-tab').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                AppState.currentSemester = parseInt(e.currentTarget.dataset.semester);
                UI.renderSubjects();
            });
        });
    },

    toggleMenu() {
        const menu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburgerBtn');
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    },

    closeMenu() {
        const menu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburgerBtn');
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    },

    navigateTo(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            AppState.currentPage = pageId;
            window.scrollTo(0, 0);
        }

        // Update nav active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });

        // Page-specific initialization
        if (pageId === 'subjects') {
            UI.renderSubjects();
        } else if (pageId === 'progress') {
            UI.renderProgress();
        } else if (pageId === 'quiz') {
            UI.initQuizPage();
        } else if (pageId === 'home') {
            UI.updateContinueLearning();
        }
    }
};

// ============================================
// UI ENGINE
// ============================================
const UI = {
    init() {
        this.renderSubjects();
        this.initSearch();
        this.initAuth();
        this.updateContinueLearning();
        this.updateTotalLessons();
    },

    updateTotalLessons() {
        let total = 0;
        Object.values(LessonsData).forEach(semester => {
            Object.values(semester).forEach(subject => {
                total += subject.lessons.length;
            });
        });
        document.getElementById('totalLessons').textContent = total + '+';
    },

    renderSubjects() {
        const container = document.getElementById('subjectsContainer');
        if (!container) return;

        const semesterData = LessonsData[AppState.currentSemester];
        if (!semesterData) return;

        container.innerHTML = '';

        Object.values(semesterData).forEach(subject => {
            const completedLessons = this.getCompletedLessonsCount(subject.id, AppState.currentSemester);
            const totalLessons = subject.lessons.length;
            const progressPercent = Math.round((completedLessons / totalLessons) * 100);

            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div class="subject-header">
                    <div class="subject-icon">
                        <i class="fas ${subject.icon}"></i>
                    </div>
                    <div>
                        <div class="subject-title">${subject.name}</div>
                        <div class="subject-info">${totalLessons} Lessons • ${subject.chapters.length} Chapters</div>
                    </div>
                </div>
                <div class="subject-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>${progressPercent}% Complete</span>
                        <span>${completedLessons}/${totalLessons}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                AppState.currentSubject = subject;
                this.renderLessons(subject);
                Navigation.navigateTo('lessons');
            });

            container.appendChild(card);
        });
    },

    renderLessons(subject) {
        const container = document.getElementById('lessonsContainer');
        const titleEl = document.getElementById('lessonsSubjectTitle');
        const infoEl = document.getElementById('lessonsSubjectInfo');
        const iconEl = document.getElementById('subjectIcon');
        const chapterFilter = document.getElementById('chapterFilter');

        if (!container) return;

        titleEl.textContent = subject.name;
        infoEl.textContent = `Semester ${subject.semester} • ${subject.lessons.length} Lessons`;
        iconEl.innerHTML = `<i class="fas ${subject.icon}"></i>`;

        // Update progress bar
        const completedLessons = this.getCompletedLessonsCount(subject.id, subject.semester);
        const progressPercent = Math.round((completedLessons / subject.lessons.length) * 100);
        document.getElementById('subjectProgressPercent').textContent = progressPercent + '%';
        document.getElementById('subjectProgressFill').style.width = progressPercent + '%';
        document.getElementById('completedLessons').textContent = completedLessons;
        document.getElementById('totalSubjectLessons').textContent = subject.lessons.length;

        // Populate chapter filter
        chapterFilter.innerHTML = '<option value="">All Chapters</option>';
        subject.chapters.forEach(chapter => {
            chapterFilter.innerHTML += `<option value="${chapter}">${chapter}</option>`;
        });

        chapterFilter.onchange = () => this.filterLessonsByChapter(subject, chapterFilter.value);

        this.filterLessonsByChapter(subject, '');

        // Back button handler
        document.getElementById('backToSubjects').onclick = () => {
            Navigation.navigateTo('subjects');
        };
    },

    filterLessonsByChapter(subject, chapter) {
        const container = document.getElementById('lessonsContainer');
        container.innerHTML = '';

        const filteredLessons = chapter 
            ? subject.lessons.filter(l => l.chapter === chapter)
            : subject.lessons;

        filteredLessons.forEach(lesson => {
            const isCompleted = AppState.progress[lesson.id] || false;
            
            const lessonEl = document.createElement('div');
            lessonEl.className = `lesson-item ${isCompleted ? 'completed' : ''}`;
            lessonEl.innerHTML = `
                <div class="lesson-checkbox">
                    ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="lesson-info">
                    <div class="lesson-chapter">${lesson.chapter}</div>
                    <div class="lesson-title">${lesson.title}</div>
                    <div class="lesson-tags">
                        ${lesson.tags.map(tag => `<span class="lesson-tag ${tag}">${tag}</span>`).join('')}
                        <span class="lesson-tag">${lesson.type}</span>
                    </div>
                </div>
                <div class="lesson-actions-row">
                    <button class="lesson-action-btn pdf" title="PDF Lesson" data-action="pdf">
                        <i class="fas fa-file-pdf"></i>
                    </button>
                    <button class="lesson-action-btn video" title="Explanation" data-action="video">
                        <i class="fas fa-play-circle"></i>
                    </button>
                    <button class="lesson-action-btn summary" title="Summary" data-action="summary">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                </div>
            `;

            // Lesson click - open content page
            lessonEl.querySelector('.lesson-info').addEventListener('click', () => {
                this.openLessonContent(lesson, subject);
            });

            // Action buttons
            lessonEl.querySelectorAll('.lesson-action-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.dataset.action;
                    this.openLessonContent(lesson, subject, action);
                });
            });

            // Checkbox toggle
            lessonEl.querySelector('.lesson-checkbox').addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLessonComplete(lesson.id);
                this.renderLessons(subject);
            });

            container.appendChild(lessonEl);
        });
    },

    openLessonContent(lesson, subject, initialTab = null) {
        AppState.currentLesson = lesson;
        
        document.getElementById('contentChapter').textContent = lesson.chapter;
        document.getElementById('contentTitle').textContent = lesson.title;
        document.getElementById('contentSubject').textContent = subject.name;
        document.getElementById('contentType').textContent = lesson.type;

        const toggle = document.getElementById('lessonCompleteToggle');
        toggle.checked = AppState.progress[lesson.id] || false;
        toggle.onchange = () => {
            this.toggleLessonComplete(lesson.id);
        };

        // Action buttons
        document.getElementById('pdfBtn').onclick = () => this.showContent('pdf', lesson);
        document.getElementById('videoBtn').onclick = () => this.showContent('video', lesson);
        document.getElementById('summaryBtn').onclick = () => this.showContent('summary', lesson);
        document.getElementById('lessonQuizBtn').onclick = () => {
            Navigation.navigateTo('quiz');
            document.getElementById('quizSubjectFilter').value = subject.id;
        };

        document.getElementById('backToLessons').onclick = () => {
            Navigation.navigateTo('lessons');
            this.renderLessons(subject);
        };

        Navigation.navigateTo('lessonContent');

        // Show initial content if specified
        if (initialTab) {
            this.showContent(initialTab, lesson);
        }
    },

    showContent(type, lesson) {
        const display = document.getElementById('contentDisplay');
        
        switch(type) {
            case 'pdf':
                display.innerHTML = `
                    <div class="content-pdf">
                        <div class="pdf-header">
                            <i class="fas fa-file-pdf" style="font-size: 3rem; color: var(--danger);"></i>
                            <h3>${lesson.title} - PDF Lesson</h3>
                            <p>Download or view the complete lesson notes</p>
                        </div>
                        <div class="pdf-actions" style="text-align: center; margin-top: 30px;">
                            <a href="${lesson.pdfURL}" class="btn btn-primary" target="_blank">
                                <i class="fas fa-download"></i> Download PDF
                            </a>
                            <button class="btn btn-outline" onclick="window.open('${lesson.pdfURL}', '_blank')">
                                <i class="fas fa-eye"></i> View Online
                            </button>
                        </div>
                        <div class="pdf-preview" style="margin-top: 30px; padding: 40px; background: var(--gray-100); border-radius: var(--radius); text-align: center;">
                            <i class="fas fa-file-alt" style="font-size: 5rem; color: var(--gray-400);"></i>
                            <p style="margin-top: 20px; color: var(--gray-600);">PDF Preview will appear here</p>
                        </div>
                    </div>
                `;
                break;
            case 'video':
                display.innerHTML = `
                    <div class="content-video">
                        <div class="video-container" style="background: var(--black); border-radius: var(--radius); aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
                            <div style="text-align: center; color: var(--white);">
                                <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 20px;"></i>
                                <h3>Video Explanation</h3>
                                <p>${lesson.title}</p>
                                <button class="btn btn-primary" style="margin-top: 20px;">
                                    <i class="fas fa-play"></i> Play Video
                                </button>
                            </div>
                        </div>
                        <div class="video-info" style="margin-top: 20px;">
                            <h4>About this lesson</h4>
                            <p style="color: var(--gray-600);">This video provides a comprehensive explanation of ${lesson.title}. Watch carefully and take notes for better understanding.</p>
                        </div>
                    </div>
                `;
                break;
            case 'summary':
                display.innerHTML = `
                    <div class="content-summary">
                        <div class="summary-header" style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                            <i class="fas fa-clipboard-list" style="font-size: 2rem; color: var(--success);"></i>
                            <div>
                                <h3>High-Yield Summary</h3>
                                <p style="color: var(--gray-600);">${lesson.title}</p>
                            </div>
                        </div>
                        <div class="summary-content" style="background: var(--gray-100); padding: 24px; border-radius: var(--radius); border-left: 4px solid var(--success);">
                            <h4 style="margin-bottom: 15px;">Key Points to Remember:</h4>
                            <ul style="padding-left: 20px; line-height: 2;">
                                <li>Key concept 1 related to ${lesson.title}</li>
                                <li>Important mechanism and pathway</li>
                                <li>Clinical correlation and application</li>
                                <li>Common exam questions on this topic</li>
                                <li>High-yield mnemonics for memorization</li>
                            </ul>
                            <div class="summary-note" style="margin-top: 20px; padding: 15px; background: rgba(255, 196, 0, 0.1); border-radius: var(--radius-sm);">
                                <i class="fas fa-lightbulb" style="color: var(--accent-dark);"></i>
                                <strong>Exam Tip:</strong> This topic frequently appears in board exams. Focus on understanding the core concepts rather than rote memorization.
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
    },

    toggleLessonComplete(lessonId) {
        AppState.progress[lessonId] = !AppState.progress[lessonId];
        
        // Update streak
        this.updateStudyStreak();
        
        // Save to localStorage (replace with Firestore when Firebase is configured)
        localStorage.setItem('knowmed_progress', JSON.stringify(AppState.progress));
        localStorage.setItem('knowmed_streak', JSON.stringify({
            streak: AppState.streak,
            lastDate: AppState.lastStudyDate
        }));

        // Check achievements
        this.checkAchievements();

        const message = AppState.progress[lessonId] ? 'Lesson marked as complete!' : 'Lesson marked as incomplete';
        this.showToast(message, 'success');
    },

    getCompletedLessonsCount(subjectId, semester) {
        const subject = LessonsData[semester][subjectId];
        if (!subject) return 0;
        
        return subject.lessons.filter(lesson => AppState.progress[lesson.id]).length;
    },

    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastDate = AppState.lastStudyDate;

        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate === yesterday.toDateString()) {
                AppState.streak++;
            } else {
                AppState.streak = 1;
            }
            AppState.lastStudyDate = today;
        }
    },

    updateContinueLearning() {
        const section = document.getElementById('continueLearning');
        const card = document.getElementById('continueCard');

        // Find last incomplete lesson
        let lastLesson = null;
        let lastSubject = null;

        Object.values(LessonsData).forEach(semester => {
            Object.values(semester).forEach(subject => {
                subject.lessons.forEach(lesson => {
                    if (!AppState.progress[lesson.id] && !lastLesson) {
                        lastLesson = lesson;
                        lastSubject = subject;
                    }
                });
            });
        });

        if (lastLesson) {
            section.style.display = 'block';
            card.innerHTML = `
                <div class="continue-icon">
                    <i class="fas ${lastSubject.icon}"></i>
                </div>
                <div class="continue-info">
                    <h3>Continue: ${lastLesson.title}</h3>
                    <p>${lastSubject.name} • ${lastLesson.chapter}</p>
                </div>
                <div class="continue-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;
            card.onclick = () => {
                AppState.currentSubject = lastSubject;
                this.openLessonContent(lastLesson, lastSubject);
            };
        } else {
            section.style.display = 'none';
        }
    },

    // ============================================
    // SEARCH ENGINE
    // ============================================
    initSearch() {
        const searchInput = document.getElementById('globalSearch');
        const subjectFilter = document.getElementById('searchSubject');
        const semesterFilter = document.getElementById('searchSemester');
        const resultsContainer = document.getElementById('searchResults');

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            const subject = subjectFilter.value;
            const semester = semesterFilter.value;

            if (!query) {
                resultsContainer.innerHTML = '';
                return;
            }

            const results = [];

            Object.entries(LessonsData).forEach(([semNum, semesterData]) => {
                if (semester && semNum !== semester) return;

                Object.entries(semesterData).forEach(([subId, subjectData]) => {
                    if (subject && subId !== subject) return;

                    subjectData.lessons.forEach(lesson => {
                        if (lesson.title.toLowerCase().includes(query) ||
                            lesson.chapter.toLowerCase().includes(query) ||
                            subjectData.name.toLowerCase().includes(query)) {
                            results.push({
                                lesson,
                                subject: subjectData,
                                semester: semNum
                            });
                        }
                    });
                });
            });

            this.renderSearchResults(results);
        };

        searchInput.addEventListener('input', performSearch);
        subjectFilter.addEventListener('change', performSearch);
        semesterFilter.addEventListener('change', performSearch);
    },

    renderSearchResults(results) {
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray-500); padding: 20px;">No results found</p>';
            return;
        }

        container.innerHTML = results.map(({ lesson, subject, semester }) => `
            <div class="search-result-item" data-lesson-id="${lesson.id}">
                <div class="search-result-icon">
                    <i class="fas ${subject.icon}"></i>
                </div>
                <div class="search-result-info">
                    <h4>${lesson.title}</h4>
                    <p>${subject.name} • ${lesson.chapter} • Semester ${semester}</p>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const lessonId = item.dataset.lessonId;
                this.openLessonFromSearch(lessonId);
            });
        });
    },

    openLessonFromSearch(lessonId) {
        Object.values(LessonsData).forEach(semester => {
            Object.values(semester).forEach(subject => {
                const lesson = subject.lessons.find(l => l.id === lessonId);
                if (lesson) {
                    AppState.currentSubject = subject;
                    AppState.currentSemester = subject.semester;
                    this.openLessonContent(lesson, subject);
                }
            });
        });
    },

    // ============================================
    // QUIZ SYSTEM
    // ============================================
    initQuizPage() {
        const subjectFilter = document.getElementById('quizSubjectFilter');
        
        // Populate subjects
        subjectFilter.innerHTML = '<option value="">Select Subject</option>';
        Object.values(LessonsData[1]).forEach(subject => {
            subjectFilter.innerHTML += `<option value="${subject.id}">${subject.name}</option>`;
        });
        Object.values(LessonsData[2]).forEach(subject => {
            if (!subjectFilter.querySelector(`option[value="${subject.id}"]`)) {
                subjectFilter.innerHTML += `<option value="${subject.id}">${subject.name}</option>`;
            }
        });

        document.getElementById('startQuizBtn').onclick = () => this.startQuiz();
        document.getElementById('nextQuestionBtn').onclick = () => this.nextQuestion();
        document.getElementById('prevQuestionBtn').onclick = () => this.prevQuestion();
        document.getElementById('submitQuizBtn').onclick = () => this.submitQuiz();
        document.getElementById('reviewQuizBtn').onclick = () => this.reviewQuiz();
        document.getElementById('retakeQuizBtn').onclick = () => this.retakeQuiz();
    },

    startQuiz() {
        const subject = document.getElementById('quizSubjectFilter').value;
        
        if (!subject) {
            this.showToast('Please select a subject', 'error');
            return;
        }

        const questions = QuizData[subject] || this.generateGenericQuestions(subject);
        
        if (questions.length === 0) {
            this.showToast('No questions available for this subject', 'error');
            return;
        }

        AppState.quizState = {
            questions: questions.slice(0, 10),
            currentIndex: 0,
            answers: new Array(Math.min(questions.length, 10)).fill(null),
            score: 0
        };

        document.getElementById('quizSelection').style.display = 'none';
        document.getElementById('quizInterface').style.display = 'block';
        document.getElementById('quizResults').style.display = 'none';

        this.renderQuestion();
    },

    generateGenericQuestions(subject) {
        // Generate generic questions based on subject lessons
        const questions = [];
        Object.values(LessonsData).forEach(semester => {
            if (semester[subject]) {
                semester[subject].lessons.slice(0, 5).forEach((lesson, idx) => {
                    questions.push({
                        id: `gen-${idx}`,
                        question: `What is the main concept covered in "${lesson.title}"?`,
                        options: [
                            'Understanding structure and function',
                            'Clinical applications and diagnosis',
                            'Pathophysiology and treatment',
                            'All of the above'
                        ],
                        correct: 3,
                        explanation: `This lesson covers comprehensive understanding of ${lesson.title} including structure, function, clinical applications, and related pathophysiology.`,
                        tags: lesson.tags
                    });
                });
            }
        });
        return questions;
    },

    renderQuestion() {
        const { questions, currentIndex, answers } = AppState.quizState;
        const question = questions[currentIndex];

        document.getElementById('currentQuestion').textContent = currentIndex + 1;
        document.getElementById('totalQuestions').textContent = questions.length;
        document.getElementById('currentScore').textContent = AppState.quizState.score;
        document.getElementById('quizProgressFill').style.width = ((currentIndex + 1) / questions.length * 100) + '%';

        document.getElementById('questionText').textContent = question.question;

        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = question.options.map((option, idx) => `
            <div class="option ${answers[currentIndex] === idx ? 'selected' : ''}" data-index="${idx}">
                <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="option-text">${option}</span>
            </div>
        `).join('');

        optionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', () => {
                const idx = parseInt(opt.dataset.index);
                AppState.quizState.answers[currentIndex] = idx;
                this.renderQuestion();
            });
        });

        // Update buttons
        document.getElementById('prevQuestionBtn').style.display = currentIndex > 0 ? 'flex' : 'none';
        document.getElementById('nextQuestionBtn').style.display = currentIndex < questions.length - 1 ? 'flex' : 'none';
        document.getElementById('submitQuizBtn').style.display = currentIndex === questions.length - 1 ? 'flex' : 'none';

        // Hide explanation
        document.getElementById('explanationPanel').style.display = 'none';
    },

    nextQuestion() {
        if (AppState.quizState.currentIndex < AppState.quizState.questions.length - 1) {
            AppState.quizState.currentIndex++;
            this.renderQuestion();
        }
    },

    prevQuestion() {
        if (AppState.quizState.currentIndex > 0) {
            AppState.quizState.currentIndex--;
            this.renderQuestion();
        }
    },

    submitQuiz() {
        const { questions, answers } = AppState.quizState;
        let score = 0;

        answers.forEach((answer, idx) => {
            if (answer === questions[idx].correct) {
                score++;
            }
        });

        AppState.quizState.score = score;

        // Show results
        document.getElementById('quizInterface').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';

        const percentage = Math.round((score / questions.length) * 100);
        document.getElementById('finalScore').textContent = score;
        document.getElementById('finalTotal').textContent = questions.length;
        document.getElementById('scorePercentage').textContent = percentage + '%';

        let message = '';
        if (percentage >= 90) message = 'Excellent! You are a medical scholar!';
        else if (percentage >= 70) message = 'Great job! Keep up the good work!';
        else if (percentage >= 50) message = 'Good effort! Review and try again.';
        else message = 'Keep studying! You will improve with practice.';

        document.getElementById('scoreMessage').textContent = message;

        // Check perfect score achievement
        if (percentage === 100) {
            this.unlockAchievement(4);
        }
    },

    reviewQuiz() {
        // Implementation for reviewing answers
        this.showToast('Review mode - showing correct answers', 'info');
    },

    retakeQuiz() {
        this.startQuiz();
    },

    // ============================================
    // PROGRESS & GAMIFICATION
    // ============================================
    renderProgress() {
        // Update stats
        const totalCompleted = Object.values(AppState.progress).filter(v => v).length;
        const totalLessons = this.getTotalLessons();
        const quizAverage = this.calculateQuizAverage();

        document.getElementById('studyStreak').textContent = AppState.streak;
        document.getElementById('totalCompleted').textContent = totalCompleted;
        document.getElementById('quizAverage').textContent = quizAverage + '%';
        document.getElementById('studyTime').textContent = Math.round(totalCompleted * 0.5) + 'h';

        // Render subject progress
        const container = document.getElementById('progressContainer');
        container.innerHTML = '';

        Object.values(LessonsData).forEach(semester => {
            Object.values(semester).forEach(subject => {
                const completed = this.getCompletedLessonsCount(subject.id, subject.semester);
                const total = subject.lessons.length;
                const percent = Math.round((completed / total) * 100);

                const card = document.createElement('div');
                card.className = 'progress-card';
                card.innerHTML = `
                    <div class="progress-card-header">
                        <div class="progress-card-icon">
                            <i class="fas ${subject.icon}"></i>
                        </div>
                        <div>
                            <div class="progress-card-title">${subject.name}</div>
                            <div class="progress-card-stats">Semester ${subject.semester}</div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percent}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>${percent}%</span>
                        <span>${completed}/${total} lessons</span>
                    </div>
                `;
                container.appendChild(card);
            });
        });

        this.checkAchievements();
    },

    getTotalLessons() {
        let total = 0;
        Object.values(LessonsData).forEach(semester => {
            Object.values(semester).forEach(subject => {
                total += subject.lessons.length;
            });
        });
        return total;
    },

    calculateQuizAverage() {
        // Placeholder - would calculate from actual quiz history
        return 85;
    },

    checkAchievements() {
        const totalCompleted = Object.values(AppState.progress).filter(v => v).length;

        // Achievement 1: First lesson
        if (totalCompleted >= 1) this.unlockAchievement(1);
        
        // Achievement 2: 10 lessons
        if (totalCompleted >= 10) this.unlockAchievement(2);
        
        // Achievement 3: 7-day streak
        if (AppState.streak >= 7) this.unlockAchievement(3);
        
        // Achievement 5: Complete semester
        this.checkSemesterCompletion();
        
        // Achievement 6: Complete all first year
        if (totalCompleted >= this.getTotalLessons()) this.unlockAchievement(6);
    },

    checkSemesterCompletion() {
        [1, 2].forEach(semNum => {
            const semester = LessonsData[semNum];
            let allComplete = true;
            
            Object.values(semester).forEach(subject => {
                subject.lessons.forEach(lesson => {
                    if (!AppState.progress[lesson.id]) allComplete = false;
                });
            });

            if (allComplete && Object.values(semester).length > 0) {
                this.unlockAchievement(5);
            }
        });
    },

    unlockAchievement(id) {
        const achievement = document.getElementById(`achievement-${id}`);
        if (achievement && achievement.classList.contains('locked')) {
            achievement.classList.remove('locked');
            // Don't show toast for already unlocked on load
        }
    },

    // ============================================
    // AUTHENTICATION
    // ============================================
    initAuth() {
        // Toggle between login and signup
        document.getElementById('showSignup').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('signupForm').style.display = 'block';
        });

        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });

        // Login
        document.getElementById('loginBtn').addEventListener('click', () => {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                this.showToast('Please enter email and password', 'error');
                return;
            }

            // Simulate login (replace with Firebase auth)
            this.simulateAuth(email, 'Dr. Student');
        });

        // Signup
        document.getElementById('signupBtn').addEventListener('click', () => {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            if (!name || !email || !password) {
                this.showToast('Please fill all fields', 'error');
                return;
            }

            // Simulate signup (replace with Firebase auth)
            this.simulateAuth(email, name);
        });

        // Google Sign In
        document.getElementById('googleSignInBtn').addEventListener('click', () => {
            this.showToast('Google Sign In - Configure Firebase to enable', 'info');
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            AppState.currentUser = null;
            this.updateAuthUI();
            this.showToast('Logged out successfully', 'success');
        });

        // Load saved progress
        this.loadSavedData();
    },

    simulateAuth(email, name) {
        AppState.currentUser = { email, name };
        this.updateAuthUI();
        this.showToast(`Welcome, ${name}!`, 'success');
        Navigation.navigateTo('home');
    },

    updateAuthUI() {
        const authNavItem = document.getElementById('authNavItem');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const userProfile = document.getElementById('userProfile');

        if (AppState.currentUser) {
            authNavItem.innerHTML = `<a href="#" data-page="auth" class="nav-link"><i class="fas fa-user"></i> Profile</a>`;
            loginForm.style.display = 'none';
            signupForm.style.display = 'none';
            userProfile.style.display = 'block';
            document.getElementById('profileName').textContent = AppState.currentUser.name;
            document.getElementById('profileEmail').textContent = AppState.currentUser.email;
        } else {
            authNavItem.innerHTML = `<a href="#" data-page="auth" class="nav-link auth-btn">Login</a>`;
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            userProfile.style.display = 'none';
        }

        // Re-attach event listener
        authNavItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            Navigation.navigateTo('auth');
        });
    },

    loadSavedData() {
        // Load progress from localStorage
        const savedProgress = localStorage.getItem('knowmed_progress');
        if (savedProgress) {
            AppState.progress = JSON.parse(savedProgress);
        }

        // Load streak
        const savedStreak = localStorage.getItem('knowmed_streak');
        if (savedStreak) {
            const data = JSON.parse(savedStreak);
            AppState.streak = data.streak || 0;
            AppState.lastStudyDate = data.lastDate;
        }
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    },

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }
};

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    UI.init();

    // Check if user has saved session
    const savedUser = localStorage.getItem('knowmed_user');
    if (savedUser) {
        AppState.currentUser = JSON.parse(savedUser);
        UI.updateAuthUI();
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppState, LessonsData, QuizData, Navigation, UI };
}