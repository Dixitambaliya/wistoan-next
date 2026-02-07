    import { Watch } from "@/types";

    export const WATCHES: Watch[] = [
        {
            id: 'sovereign-gold',
            name: 'The Sovereign Gold',
            tagline: 'Timeless Elegance in Every Second',
            description: 'The Sovereign Gold represents the pinnacle of craftsmanship. Featuring a 18k solid gold case and a handcrafted leather strap, this timepiece is more than a watch—it is a legacy. Each movement is hand-assembled over 400 hours by master watchmakers.',
            price: '$24,500',
            mainImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800'
            ],
            specs: {
                movement: 'Calibre W-101 Automatic',
                case: '18k Yellow Gold, 41mm',
                strap: 'Hand-stitched Crocodile Leather',
                resistance: '50m (5 ATM)'
            }
        },
        {
            id: 'midnight-navigator',
            name: 'Midnight Navigator',
            tagline: 'Command the Night',
            description: 'Designed for the modern explorer, the Midnight Navigator features a DLC-coated titanium case and a luminova dial that ensures clarity in the deepest darkness. Its GMT function allows you to track multiple time zones with ease.',
            price: '$12,800',
            mainImage: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1508685096489-7aac291253f6?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800'
            ],
            specs: {
                movement: 'Precision GMT Chronometer',
                case: 'Titanium DLC, 44mm',
                strap: 'High-Durability Rubber Composite',
                resistance: '200m (20 ATM)'
            }
        },
        {
            id: 'heritage-chronograph',
            name: 'Heritage Chronograph',
            tagline: 'A Tribute to Racing Excellence',
            description: 'Inspired by the golden era of motor racing, the Heritage Chronograph combines vintage aesthetics with modern performance. The sunburst silver dial and tachymeter bezel reflect a spirit of speed and precision.',
            price: '$9,200',
            mainImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1526045431048-f857369aba09?auto=format&fit=crop&q=80&w=800'
            ],
            specs: {
                movement: 'Column-Wheel Chronograph',
                case: 'Polished Stainless Steel, 40mm',
                strap: 'Perforated Racing Calfskin',
                resistance: '100m (10 ATM)'
            }
        },
        {
            id: 'ocean-master',
            name: 'Ocean Master Professional',
            tagline: 'Deep Sea Sophistication',
            description: 'The Ocean Master is built for the professional diver who refuses to compromise on style. With a ceramic unidirectional bezel and a helium escape valve, it is as functional as it is beautiful.',
            price: '$15,400',
            mainImage: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1639037687665-21c601931843?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800'
            ],
            specs: {
                movement: 'Seamaster Certified Auto',
                case: 'Brushed Steel & Ceramic, 42mm',
                strap: 'Integrated Steel Bracelet',
                resistance: '300m (30 ATM)'
            }
        },
        {
            id: 'celestial-tourbillon',
            name: 'Celestial Tourbillon',
            tagline: 'Art in Motion',
            description: 'Defying gravity, the Celestial Tourbillon features a skeletonized dial that reveals the mesmerizing dance of its complicated movement. Each piece is a unique mechanical sculpture, limited to only 50 units worldwide.',
            price: '$85,000',
            mainImage: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1517590119129-4d4c39bb39e7?auto=format&fit=crop&q=80&w=800'
            ],
            specs: {
                movement: 'W-900 Manual Tourbillon',
                case: 'Platinum, 43mm',
                strap: 'Silk-lined Alligator',
                resistance: '30m (3 ATM)'
            }
        },
        {
            id: 'urban-minimalist',
            name: 'Urban Minimalist',
            tagline: 'Essence of Simplicity',
            description: 'Stripping away the excess, the Urban Minimalist celebrates clean lines and perfect proportions. A perfect companion for the corporate board or a casual evening, its ultra-thin profile sits perfectly under any cuff.',
            price: '$4,500',
            mainImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=800'
            ],
            specs: {
                movement: 'Ultra-thin Quartz Precision',
                case: 'Stainless Steel, 38mm',
                strap: 'Milanese Steel Mesh',
                resistance: '30m (3 ATM)'
            }
        }
    ];
