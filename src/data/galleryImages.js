// Photography: Unsplash (https://unsplash.com/license) — free to use, stored locally in /public/images.
const img = (name) => `/images/${name}.webp`

export const galleryCategories = ['All', 'Food', 'Interiors', 'Drinks', 'Kitchen', 'Dining']

export const galleryImages = [
  { id: 'g1', src: img('rogan-josh'), w: 1200, h: 2132, category: 'Food', caption: 'Kashmiri Rogan Josh', alt: 'Rogan josh in a brass bowl swirled with cream' },
  { id: 'g2', src: img('interior-bar'), w: 1600, h: 1200, category: 'Interiors', caption: 'The long bar after dark', alt: 'Warmly lit restaurant bar with shelves of bottles and pendant lights' },
  { id: 'g3', src: img('cappuccino'), w: 1000, h: 1500, category: 'Drinks', caption: 'Morning cappuccinos', alt: 'Two cappuccinos with latte art beside potted herbs' },
  { id: 'g4', src: img('chef-copper'), w: 1100, h: 1693, category: 'Kitchen', caption: 'Finishing at the pass', alt: 'Chef garnishing a plate under copper heat lamps' },
  { id: 'g5', src: img('friends-table'), w: 1400, h: 933, category: 'Dining', caption: 'Long-table Sundays', alt: 'Friends laughing around a crowded dining table' },
  { id: 'g6', src: img('butter-chicken'), w: 1000, h: 667, category: 'Food', caption: 'Old Delhi Butter Chicken', alt: 'Butter chicken curry swirled with cream' },
  { id: 'g7', src: img('interior-green'), w: 1400, h: 1867, category: 'Interiors', caption: 'The garden room', alt: 'Dining room with teal banquettes and lush tropical plants' },
  { id: 'g8', src: img('smoked-cocktail'), w: 1000, h: 667, category: 'Drinks', caption: 'Smoked Gur Old Fashioned', alt: 'Amber drink with rosemary on a dark wooden bar' },
  { id: 'g9', src: img('dum-biryani'), w: 1000, h: 1139, category: 'Food', caption: 'Lucknowi Dum Biryani', alt: 'Saffron biryani in a brass vessel' },
  { id: 'g10', src: img('kitchen-flame'), w: 1100, h: 733, category: 'Kitchen', caption: 'Fire on the line', alt: 'Chef tossing a pan over a high flame in a busy kitchen' },
  { id: 'g11', src: img('guests-dining'), w: 1400, h: 933, category: 'Dining', caption: 'Friday dinner service', alt: 'Guests enjoying dinner and conversation at the restaurant' },
  { id: 'g12', src: img('interior-blue'), w: 1400, h: 2114, category: 'Interiors', caption: 'The mezzanine', alt: 'Restaurant interior with warm lamps and a staircase to a mezzanine' },
  { id: 'g13', src: img('strawberry-cooler'), w: 1000, h: 1230, category: 'Drinks', caption: 'Strawberry Kokum Cooler', alt: 'Red strawberry coolers with mint and lime' },
  { id: 'g14', src: img('thali-flatlay'), w: 1100, h: 619, category: 'Food', caption: 'The steel thali', alt: 'Overhead view of a steel thali surrounded by small bowls of curry' },
  { id: 'g15', src: img('chef-cooking'), w: 1400, h: 933, category: 'Kitchen', caption: 'Plating the tasting menu', alt: 'Chef plating dishes at a busy open kitchen counter' },
  { id: 'g16', src: img('solo-diner'), w: 1400, h: 933, category: 'Dining', caption: 'A quiet lunch', alt: 'A woman enjoying a dish at a candle-lit table' },
  { id: 'g17', src: img('fish-curry'), w: 1000, h: 1500, category: 'Food', caption: 'Malabar Fish Curry', alt: 'Fish fillets in a golden coconut curry with lemon' },
  { id: 'g18', src: img('interior-cafe-plants'), w: 1400, h: 960, category: 'Interiors', caption: 'The café counter', alt: 'Bright café with a chalkboard menu and hanging plants' },
  { id: 'g19', src: img('masala-chai'), w: 1000, h: 669, category: 'Drinks', caption: 'House chai, whole spices', alt: 'A cup of masala chai surrounded by whole spices' },
  { id: 'g20', src: img('kitchen-pass'), w: 1400, h: 933, category: 'Kitchen', caption: 'Before service', alt: 'Chef preparing the kitchen line under pendant lights' },
  { id: 'g21', src: img('brunch-table'), w: 1400, h: 933, category: 'Dining', caption: 'Weekend brunch', alt: 'Guests sharing brunch plates and coffee at a table' },
  { id: 'g22', src: img('gajar-halwa'), w: 1000, h: 1498, category: 'Food', caption: 'Gajar Halwa, Rabdi Foam', alt: 'Gajar halwa in an engraved silver bowl' },
  { id: 'g23', src: img('interior-conservatory'), w: 1400, h: 933, category: 'Interiors', caption: 'The conservatory', alt: 'Glass-roofed dining area filled with plants and string lights' },
  { id: 'g24', src: img('cold-brew'), w: 1000, h: 668, category: 'Drinks', caption: 'Jaggery Cold Brew', alt: 'Cold brew coffee with cream swirling over ice' },
  { id: 'g25', src: img('chicken-tikka'), w: 1000, h: 611, category: 'Food', caption: 'Coal-grilled tikka', alt: 'Chicken tikka skewers over glowing charcoal' },
  { id: 'g26', src: img('spicy-masala'), w: 1000, h: 1000, category: 'Food', caption: 'Kolhapuri masala, straight from the pan', alt: 'A black pan of fiery Kolhapuri curry garnished with coriander' },
]

// Curated subset for the homepage preview (asymmetric grid order matters)
export const galleryPreview = ['g12', 'g5', 'g3', 'g14', 'g23', 'g13'].map((id) =>
  galleryImages.find((image) => image.id === id),
)
