import type { Product } from '@/lib/types';
// Icon components are no longer directly imported here for data definition.
// They will be imported in the client components that render them.

export const products: Product[] = [
  {
    id: '1',
    name: 'NovaTech X1 Laptop',
    shortDescription: 'Ultra-thin powerhouse for professionals and creatives.',
    longDescription:
      "Experience unparalleled performance with the NovaTech X1. Featuring the latest generation processor, a stunning 4K display, and an all-day battery life, it's designed for those who demand excellence. Its sleek aluminum chassis is both durable and lightweight, making it perfect for on-the-go productivity.",
    price: 1499.99,
    images: [
      '/images/laptop-1.jpg',
      '/images/laptop-2.jpg',
      '/images/laptop-3.jpg',
    ],
    coverImageIndex: 0,
    category: 'Laptops',
    categoryIconName: 'Laptop', 
    featured: true,
    specifications: [
      { name: 'Processor', value: 'Intel Core i7 13th Gen', iconName: 'Cpu' },
      { name: 'RAM', value: '16GB DDR5', iconName: 'MemoryStick' },
      { name: 'Storage', value: '1TB NVMe SSD', iconName: 'HardDrive' },
      { name: 'Display', value: '14-inch 4K OLED', iconName: 'Palette' },
      { name: 'Battery', value: 'Up to 12 hours', iconName: 'Zap' },
    ],
    reviews: [
      { id: 'r1-1', author: 'Alex P.', rating: 5, comment: 'Absolutely love this laptop! Blazing fast and the screen is gorgeous.', date: '2023-10-15T10:00:00Z', avatar: '/images/avatar-1.jpg' },
      { id: 'r1-2', author: 'Sarah K.', rating: 4, comment: 'Great for video editing, but gets a bit warm under heavy load.', date: '2023-10-20T14:30:00Z', avatar: '/images/avatar-2.jpg' },
    ],
    stock: 25,
    sku: 'NT-X1-16-1TB',
    tags: ['ultrabook', '4k display', 'professional'],
  },
  {
    id: '2',
    name: 'AuraSound Pro Headphones',
    shortDescription: 'Immersive audio experience with noise-cancellation.',
    longDescription:
      'Dive into pure sound with AuraSound Pro. These headphones offer crystal-clear highs, deep bass, and industry-leading active noise cancellation. Crafted with premium materials for maximum comfort, they are perfect for music lovers, travelers, and anyone seeking an escape into audio bliss.',
    price: 299.99,
    images: [
      '/images/headphones-1.jpg',
      '/images/headphones-2.jpg',
      '/images/headphones-3.jpg',
    ],
    coverImageIndex: 0,
    category: 'Audio',
    categoryIconName: 'Headphones', 
    featured: true,
    specifications: [
      { name: 'Type', value: 'Over-ear, Closed-back', iconName: 'Headphones' },
      { name: 'Connectivity', value: 'Bluetooth 5.2, 3.5mm Jack', iconName: 'Zap' },
      { name: 'Noise Cancellation', value: 'Active, Hybrid', iconName: 'MessageSquare' },
      { name: 'Battery Life', value: 'Up to 30 hours (ANC on)', iconName: 'Zap' },
    ],
    reviews: [
      { id: 'r2-1', author: 'Mike B.', rating: 5, comment: "Best noise-cancelling headphones I've ever owned!", date: '2023-11-01T09:00:00Z', avatar: '/images/avatar-3.jpg' },
    ],
    stock: 50,
    sku: 'AS-PRO-BLK',
    tags: ['noise cancelling', 'bluetooth', 'premium audio'],
  },
  {
    id: '3',
    name: 'ConnectSphere Smart Hub',
    shortDescription: 'Centralize your smart home devices with ease.',
    longDescription:
      "The ConnectSphere Smart Hub is the brain of your smart home. Compatible with thousands of devices across various protocols, it allows you to create custom automations, control devices remotely, and monitor your home's status. Secure, reliable, and future-proof.",
    price: 129.99,
    images: [
      '/images/smart-hub-1.jpg',
      '/images/smart-hub-2.jpg',
      '/images/smart-hub-3.jpg',
    ],
    coverImageIndex: 0,
    category: 'Smart Home',
    categoryIconName: 'Smartphone', 
    featured: true,
    specifications: [
      { name: 'Compatibility', value: 'Zigbee, Z-Wave, Wi-Fi, Bluetooth', iconName: 'Zap' },
      { name: 'Processor', value: 'Quad-core ARM Cortex-A53', iconName: 'Cpu' },
      { name: 'Connectivity', value: 'Ethernet, Wi-Fi 2.4/5GHz', iconName: 'Zap' },
      { name: 'App Support', value: 'iOS, Android', iconName: 'Smartphone' },
    ],
    reviews: [
      { id: 'r3-1', author: 'Laura G.', rating: 4, comment: 'Works well, but the app could be more intuitive.', date: '2023-09-25T18:00:00Z', avatar: '/images/avatar-4.jpg' },
    ],
    stock: 70,
    sku: 'CS-HUB-V2',
    tags: ['smart home', 'automation', 'iot'],
  },
  {
    id: '4',
    name: 'PixelPerfect Pro Monitor',
    shortDescription: '27-inch 4K monitor with exceptional color accuracy.',
    longDescription:
      'Elevate your visual experience with the PixelPerfect Pro Monitor. This 27-inch 4K UHD display delivers stunning clarity and vibrant colors, covering 99% of the Adobe RGB color gamut. Ideal for photographers, designers, and content creators who demand precision.',
    price: 699.00,
    images: [
      '/images/monitor-1.jpg',
      '/images/monitor-2.jpg',
      '/images/monitor-3.jpg',
    ],
    coverImageIndex: 0,
    category: 'Displays',
    categoryIconName: 'Laptop', 
    featured: true,
    specifications: [
      { name: 'Screen Size', value: '27-inch IPS', iconName: 'Palette' },
      { name: 'Resolution', value: '3840 x 2160 (4K UHD)', iconName: 'Palette' },
      { name: 'Color Gamut', value: '99% Adobe RGB, 100% sRGB', iconName: 'Palette' },
      { name: 'Refresh Rate', value: '60Hz', iconName: 'Zap' },
      { name: 'Ports', value: 'HDMI 2.0, DisplayPort 1.4, USB-C', iconName: 'Zap' },
    ],
    reviews: [
      { id: 'r4-1', author: 'David R.', rating: 5, comment: 'Incredible monitor for photo editing. Colors are spot on!', date: '2023-11-10T11:20:00Z', avatar: '/images/avatar-5.jpg' },
      { id: 'r4-2', author: 'Emily W.', rating: 4, comment: 'Great display, wish it had a higher refresh rate for gaming though.', date: '2023-11-12T16:45:00Z', avatar: '/images/avatar-6.jpg' },
    ],
    stock: 30,
    sku: 'PP-MON-27-4K',
    tags: ['4k monitor', 'color accurate', 'professional display'],
  },
  {
    id: '5',
    name: 'GamerMax Pro Keyboard',
    shortDescription: 'Mechanical keyboard with customizable RGB lighting.',
    longDescription:
      'Dominate the competition with the GamerMax Pro Keyboard. Featuring responsive mechanical switches, full N-key rollover, and vibrant per-key RGB lighting, this keyboard is built for performance and style. Includes a detachable wrist rest for comfort during long gaming sessions.',
    price: 129.99,
    images: [
      '/images/keyboard-1.jpg',
      '/images/keyboard-2.jpg',
      '/images/keyboard-3.jpg',
    ],
    coverImageIndex: 0,
    category: 'Peripherals',
    categoryIconName: 'Keyboard', 
    featured: true,
    specifications: [
      { name: 'Switch Type', value: 'Mechanical (Red Switches)', iconName: 'Keyboard' },
      { name: 'Backlight', value: 'Per-key RGB LED', iconName: 'Palette' },
      { name: 'Connectivity', value: 'Wired USB-C', iconName: 'Zap' },
      { name: 'Features', value: 'N-key Rollover, Anti-ghosting', iconName: 'Cpu' },
    ],
    reviews: [
      { id: 'r5-1', author: 'Kevin L.', rating: 5, comment: 'Awesome keyboard! The RGB is amazing and the keys feel great.', date: '2023-12-01T15:00:00Z', avatar: '/images/avatar-7.jpg' },
    ],
    stock: 40,
    sku: 'GM-KB-PRO-RGB',
    tags: ['gaming keyboard', 'mechanical', 'rgb'],
  },
  {
    id: '6',
    name: 'StreamLine WebCam',
    shortDescription: 'Full HD webcam for streaming and video calls.',
    longDescription:
      'Look your best with the StreamLine WebCam. Delivering crisp 1080p video at 30fps, this webcam features autofocus, a built-in noise-reducing microphone, and a privacy shutter. Perfect for streaming, video conferencing, and online classes.',
    price: 79.99,
    images: [
      '/images/webcam-1.jpg',
      '/images/webcam-2.jpg',
      '/images/webcam-3.jpg',
    ],
    coverImageIndex: 0,
    category: 'Cameras',
    categoryIconName: 'Camera',
    featured: true,
    specifications: [
      { name: 'Resolution', value: '1920 x 1080 (Full HD)', iconName: 'Camera' },
      { name: 'Frame Rate', value: '30fps', iconName: 'Zap' },
      { name: 'Microphone', value: 'Built-in, Noise-reducing', iconName: 'MessageSquare' },
      { name: 'Focus', value: 'Autofocus', iconName: 'Palette' },
    ],
    reviews: [
      { id: 'r6-1', author: 'Jessica T.', rating: 4, comment: 'Good quality for the price. Autofocus works well.', date: '2023-11-20T10:30:00Z', avatar: '/images/avatar-8.jpg' },
    ],
    stock: 60,
    sku: 'SL-WC-1080P',
    tags: ['webcam', '1080p', 'streaming', 'video call'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

    