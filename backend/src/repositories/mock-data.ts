import { Product } from '../interfaces/product-interfaces';

export const mockProducts: Product[] = [
    {
        id: 1,
        nome: 'Notebook Dell Inspiron 15',
        preco: 3500.00,
        descricao: 'Notebook com processador Intel Core i7, 16GB de RAM e 512GB SSD. Tela de 15.6 polegadas Full HD.',
        foto: 'https://images.unsplash.com/photo-1588405748030-b37e3c43439d?w=500&h=500&fit=crop'
    },
    {
        id: 2,
        nome: 'Mouse Logitech MX Master 3',
        preco: 299.90,
        descricao: 'Mouse sem fio ergonômico com múltiplos botões programáveis e conexão Bluetooth.',
        foto: 'https://images.unsplash.com/photo-1587829191301-51f4cbe65e89?w=500&h=500&fit=crop'
    },
    {
        id: 3,
        nome: 'Teclado Mecânico RGB',
        preco: 450.00,
        descricao: 'Teclado mecânico com switches RGB customizáveis, layout ABNT2 e cabo destacável USB-C.',
        foto: 'https://images.unsplash.com/photo-1587829191301-51f4cbe65e89?w=500&h=500&fit=crop'
    },
    {
        id: 4,
        nome: 'Monitor LG 27" 4K',
        preco: 1800.00,
        descricao: 'Monitor UltraFine 4K com reprodução de cores precisa, ideal para design e edição de vídeo.',
        foto: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop'
    },
    {
        id: 5,
        nome: 'Webcam Logitech C922',
        preco: 199.90,
        descricao: 'Webcam Full HD com autofoco automático e microfone integrado para streamings e videoconferências.',
        foto: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'
    },
    {
        id: 6,
        nome: 'Headset Gamer SteelSeries Arctis 7',
        preco: 599.90,
        descricao: 'Headset wireless com som surround 7.1, microfone retrátil e bateria de até 24 horas.',
        foto: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop'
    }
];
