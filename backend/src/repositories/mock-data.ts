import { Product } from '../interfaces/product-interfaces';

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Notebook Dell Inspiron 15',
        price: 3500.00,
        description: 'Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD. Tela de 15.6 polegadas Full HD.',
        image: '/images/1.png',
        discount: 0.10
    },
    {
        id: 2,
        name: 'Mouse Logitech MX Master 3',
        price: 299.90,
        description: 'Mouse sem fio ergonômico com múltiplos botões programáveis e conexão Bluetooth.',
        image: '/images/2.png',
        discount: 0.05
    },
    {
        id: 3,
        name: 'Teclado Mecânico RGB',
        price: 450.00,
        description: 'Teclado mecânico com switches RGB customizáveis, layout ABNT2 e cabo destacável USB-C.',
        image: '/images/3.png',
        discount: 0.15
    },
    {
        id: 4,
        name: 'Monitor LG 27" 4K',
        price: 1800.00,
        description: 'Monitor UltraFine 4K com reprodução de cores precisa, ideal para design e edição de vídeo.',
        image: '/images/4.png',
        discount: 0.20
    },
    {
        id: 5,
        name: 'Webcam Logitech C922',
        price: 199.90,
        description: 'Webcam Full HD com autofoco automático e microfone integrado para streamings e videoconferências.',
        image: '/images/5.png',
        discount: 0.00
    },
    {
        id: 6,
        name: 'Headset Gamer SteelSeries Arctis 7',
        price: 599.90,
        description: 'Headset wireless com som surround 7.1, microfone retrátil e bateria de até 24 horas.',
        image: '/images/6.png',
        discount: 0.12
    }
];
