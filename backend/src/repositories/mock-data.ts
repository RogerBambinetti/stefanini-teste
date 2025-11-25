import { Product } from '../interfaces/product-interfaces';

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Notebook Dell Inspiron 15',
        price: 3500.00,
        description: 'Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD. Tela de 15.6 polegadas Full HD.',
        image: 'https://images.unsplash.com/photo-1588405748030-b37e3c43439d?w=500&h=500&fit=crop'
    },
    {
        id: 2,
        name: 'Mouse Logitech MX Master 3',
        price: 299.90,
        description: 'Mouse sem fio ergonômico com múltiplos botões programáveis e conexão Bluetooth.',
        image: 'https://images.unsplash.com/photo-1587829191301-51f4cbe65e89?w=500&h=500&fit=crop'
    },
    {
        id: 3,
        name: 'Teclado Mecânico RGB',
        price: 450.00,
        description: 'Teclado mecânico com switches RGB customizáveis, layout ABNT2 e cabo destacável USB-C.',
        image: 'https://images.unsplash.com/photo-1587829191301-51f4cbe65e89?w=500&h=500&fit=crop'
    },
    {
        id: 4,
        name: 'Monitor LG 27" 4K',
        price: 1800.00,
        description: 'Monitor UltraFine 4K com reprodução de cores precisa, ideal para design e edição de vídeo.',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop'
    },
    {
        id: 5,
        name: 'Webcam Logitech C922',
        price: 199.90,
        description: 'Webcam Full HD com autofoco automático e microfone integrado para streamings e videoconferências.',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'
    },
    {
        id: 6,
        name: 'Headset Gamer SteelSeries Arctis 7',
        price: 599.90,
        description: 'Headset wireless com som surround 7.1, microfone retrátil e bateria de até 24 horas.',
        image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop'
    }
];
