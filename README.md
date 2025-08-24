# FitnessPro - Egzersiz Kütüphanesi

Modern web teknolojileri ile geliştirilmiş, kullanıcı dostu bir egzersiz kütüphanesi uygulaması. Kullanıcılar egzersizleri arayabilir, kas gruplarına göre filtreleyebilir, favorilere ekleyebilir ve detaylı bilgilerini görüntüleyebilir.

## 🚀 Özellikler

### ✨ Ana Özellikler
- **🔍 Akıllı Arama**: Egzersiz adına göre arama yapma
- **🏋️ Kas Grubu Filtreleme**: Vücut bölgelerine göre egzersiz filtreleme
- **❤️ Favori Sistemi**: Egzersizleri favorilere ekleme/çıkarma
- **📱 Responsive Tasarım**: Mobil, tablet ve desktop uyumlu
- **🎯 Detaylı Bilgiler**: Egzersiz talimatları, hedef kaslar ve ekipman bilgileri
- **🖼️ Yüksek Kaliteli GIF'ler**: `/image` endpoint'inden gelen yüksek çözünürlüklü egzersiz animasyonları
- **⚡ Hızlı Yükleme**: React Query ile optimize edilmiş performans

### 🎨 Kullanıcı Deneyimi
- **Modern UI/UX**: Tailwind CSS ile şık tasarım
- **Loading States**: Skeleton loading ve spinner animasyonları
- **Error Handling**: Kullanıcı dostu hata mesajları
- **Smooth Animations**: Geçiş animasyonları ve hover efektleri
- **Accessibility**: Erişilebilirlik standartlarına uygun

## 🛠️ Kullanılan Teknolojiler

### 🎯 Frontend Framework
- **React 18.3.1**: Modern React hooks ve functional components
- **TypeScript 5.5.3**: Tip güvenliği ve geliştirici deneyimi
- **Vite 5.4.2**: Hızlı build tool ve development server

### 🎨 Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **PostCSS 8.4.35**: CSS processing
- **Autoprefixer 10.4.18**: CSS vendor prefixing
- **Lucide React 0.344.0**: Modern icon library

### 🔄 State Management & Data Fetching
- **React Query (TanStack Query) 5.85.5**: Server state management
  - Otomatik caching
  - Background refetching
  - Loading/error states
  - Query invalidation
- **Axios 1.11.0**: HTTP client
  - Request/response interceptors
  - Error handling
  - Timeout configuration

### 📝 Form Management
- **Formik 2.4.6**: Form state management
- **Yup 1.7.0**: Form validation
  - Türkçe karakter desteği
  - Minimum/maximum karakter kontrolü
  - Regex validation

### 🔧 Development Tools
- **ESLint 9.9.1**: Code linting
- **TypeScript ESLint 8.3.0**: TypeScript linting
- **ESLint React Hooks 5.1.0**: React hooks linting

### 🌐 API & External Services
- **ExerciseDB (RapidAPI)**: Egzersiz verileri ve yüksek kaliteli GIF'ler
  - Ana endpoint'ler: Egzersiz listesi, arama, filtreleme
  - Resim endpoint'i: `/image` ile yüksek kaliteli GIF'ler (180px çözünürlük)

## 📁 Proje Yapısı

```
src/
├── components/          # UI Bileşenleri
│   ├── Header.tsx      # Uygulama başlığı ve navigasyon
│   ├── SearchForm.tsx  # Arama formu
│   ├── BodyPartFilter.tsx # Kas grubu filtreleme
│   ├── ExerciseCard.tsx # Egzersiz kartı
│   ├── ExerciseGrid.tsx # Egzersiz grid görünümü
│   ├── ExerciseDetailModal.tsx # Egzersiz detay modalı
│   └── LoadingSpinner.tsx # Yükleme animasyonu
├── hooks/              # Custom React Hooks
│   ├── useExercises.ts # API hooks (React Query)
│   └── useFavorites.ts # Favori yönetimi
├── services/           # API Servisleri
│   └── api.ts         # Axios konfigürasyonu ve API calls
├── types/              # TypeScript Tip Tanımları
│   └── exercise.ts    # Exercise interface ve form types
├── App.tsx            # Ana uygulama bileşeni
├── main.tsx           # Uygulama giriş noktası
└── index.css          # Global stiller
```

## 🎯 Bileşen Detayları

### 🧩 UI Bileşenleri

#### Header.tsx
- Uygulama başlığı ve logo
- Favori sayısı gösterimi
- Responsive tasarım
- Navigasyon butonları

#### SearchForm.tsx
- Formik ile form yönetimi
- Yup validation
- Real-time arama
- Clear button
- Loading states

#### BodyPartFilter.tsx
- Kas grubu filtreleme
- Mobilde dropdown, desktop'ta horizontal scroll
- Responsive tasarım
- Loading skeleton

#### ExerciseCard.tsx
- Egzersiz bilgileri
- `/image` endpoint'inden gelen yüksek kaliteli GIF'ler
- Favori toggle butonu
- Image loading states
- Hover efektleri
- Blob URL yönetimi

#### ExerciseGrid.tsx
- Grid layout
- Loading skeleton
- Error states
- Empty states
- Responsive grid

#### ExerciseDetailModal.tsx
- Egzersiz detayları
- Büyük GIF animasyonu (`/image` endpoint'inden)
- Talimatlar
- Hedef kaslar
- Ekipman bilgileri
- Favori toggle

### 🎣 Custom Hooks

#### useExercises.ts
```typescript
// React Query hooks
export const useExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: () => exerciseApi.getAllExercises(1000, 0),
    staleTime: 1000 * 60 * 15, // 15 dakika cache
    gcTime: 1000 * 60 * 30, // 30 dakika garbage collection
  });
};
```

#### useFavorites.ts
- LocalStorage entegrasyonu
- Cross-tab synchronization
- Favori ekleme/çıkarma
- State management

### 🔧 API Servisleri

#### api.ts
```typescript
const api = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
  timeout: 15000,
});
```

**API Endpoints:**
- `GET /exercises` - Tüm egzersizler
- `GET /exercises/bodyPart/{bodyPart}` - Kas grubuna göre
- `GET /exercises/name/{query}` - Arama
- `GET /exercises/bodyPartList` - Kas grupları listesi
- `GET /image?exerciseId={id}&resolution=180` - Yüksek kaliteli GIF'ler

## 🔧 API Endpoint'leri

Bu uygulama aşağıdaki ExerciseDB endpoint'lerini kullanır:

### Ana Endpoint'ler
- `GET /exercises` - Tüm egzersizleri getir
- `GET /exercises/bodyPart/{bodyPart}` - Kas grubuna göre egzersizler
- `GET /exercises/name/{name}` - İsme göre egzersiz arama
- `GET /exercises/bodyPartList` - Mevcut kas grupları
- `GET /exercises/targetList` - Hedef kas listesi
- `GET /exercises/equipmentList` - Ekipman listesi

### Resim Endpoint'i
- `GET /image?exerciseId={id}&resolution=180` - Egzersiz GIF'lerini getir
  - `exerciseId`: Egzersiz ID'si (4 karakter, örn: "0001")
  - `resolution`: Çözünürlük (sabit: 180)

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum
```bash
# Projeyi klonlayın
git clone <repository-url>
cd FitnessPro

# Bağımlılıkları yükleyin
npm install

# API Anahtarını Ayarlayın
# Bu uygulama ExerciseDB API'sini kullanır. API anahtarını almak için:
# 1. https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb sayfasına gidin
# 2. "Subscribe to Test" butonuna tıklayın (ücretsiz plan)
# 3. RapidAPI hesabınızla giriş yapın
# 4. API anahtarınızı kopyalayın

# Environment variables
cp .env.example .env
# .env dosyasına RapidAPI anahtarınızı ekleyin
VITE_RAPIDAPI_KEY=your_api_key_here

# Development server'ı başlatın
npm run dev
```

### Build
```bash
# Production build
npm run build

# Preview build
npm run preview
```

## 🔧 Konfigürasyon

### Environment Variables
```env
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

### React Query Konfigürasyonu
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Tailwind CSS Konfigürasyonu
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 📱 Responsive Tasarım

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Özellikler
- **Mobile-first** yaklaşım
- **Flexible grid** sistemi
- **Adaptive components**
- **Touch-friendly** butonlar

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Purple gradient (#8B5CF6 to #EC4899)
- **Secondary**: Pink gradient (#EC4899 to #8B5CF6)
- **Background**: Slate gradient (#F8FAFC to #F1F5F9)
- **Text**: Slate (#1E293B, #64748B)

### Typography
- **Headings**: Bold, responsive font sizes
- **Body**: Regular, readable font sizes
- **Captions**: Small, muted colors

### Spacing
- **Consistent** spacing scale
- **Responsive** padding/margins
- **Component** spacing

## 🔄 State Management

### React Query (Server State)
- **Caching**: Otomatik cache yönetimi
- **Background Updates**: Arka plan güncellemeleri
- **Error Handling**: Otomatik hata yönetimi
- **Loading States**: Yükleme durumları

### Local State (Client State)
- **useState**: Component state
- **useFavorites**: Favori yönetimi
- **Form State**: Formik ile form state

## 🛡️ Error Handling

### API Errors
- **Try-catch** blokları
- **User-friendly** hata mesajları
- **Retry** mekanizması
- **Fallback** UI

### Form Validation
- **Yup** schema validation
- **Real-time** validation
- **Error** display
- **Success** feedback

## ⚡ Performance Optimizasyonları

### React Query
- **Stale Time**: Veri tazeliği kontrolü
- **GC Time**: Memory yönetimi
- **Query Keys**: Cache yönetimi
- **Background Refetching**: Otomatik güncelleme

### Code Splitting
- **Lazy Loading**: Component lazy loading
- **Bundle Splitting**: Code splitting
- **Tree Shaking**: Unused code removal

### Image Optimization
- **Lazy Loading**: Image lazy loading
- **Error Handling**: Image error states
- **Loading States**: Image loading indicators

## 🔍 SEO ve Accessibility

### SEO
- **Meta tags**: Proper meta tags
- **Semantic HTML**: Semantic markup
- **Performance**: Core Web Vitals

### Accessibility
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Keyboard accessibility
- **Focus management**: Focus indicators
- **Color contrast**: WCAG compliance

## 🧪 Testing

### Test Stratejisi
- **Unit Tests**: Component testing
- **Integration Tests**: Hook testing
- **E2E Tests**: User flow testing

### Test Tools
- **Vitest**: Unit testing
- **React Testing Library**: Component testing
- **MSW**: API mocking

## 📦 Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting
- **AWS S3**: Cloud hosting

## 🤝 Katkıda Bulunma

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch
3. **Make** changes
4. **Test** thoroughly
5. **Submit** pull request

### Code Standards
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Conventional Commits**: Commit messages

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🙏 Teşekkürler

- **ExerciseDB API**: Egzersiz verileri ve yüksek kaliteli GIF'ler için
- **RapidAPI**: API platformu için
- **React Query**: State management için
- **Tailwind CSS**: Styling framework için

## 🚨 Sorun Giderme

### API Anahtarı Hatası
Eğer "API Anahtarı Gerekli" mesajı görüyorsanız:
1. `.env` dosyasının proje kök dizininde olduğundan emin olun
2. API anahtarının doğru formatta olduğunu kontrol edin
3. RapidAPI hesabınızın aktif olduğunu kontrol edin

### Resim Yükleme Sorunları
- Resimler yüklenmiyorsa: API anahtarınızın `/image` endpoint'ine erişimi olduğundan emin olun
- Yavaş yükleme: İnternet bağlantınızı kontrol edin

### Performans Sorunları
- Uygulama yavaşsa: Tarayıcı cache'ini temizleyin
- API limitleri: RapidAPI ücretsiz plan limitlerini kontrol edin

## 📞 İletişim

Proje hakkında sorularınız için:
- **Email**: [osariahnetoglu@gmail.com]
- **GitHub**: [https://github.com/OsmanEmre0]
- **LinkedIn**: [https://www.linkedin.com/in/osman-emre-sar%C4%B1ahmeto%C4%9Flu/]

---

**FitnessPro** - Modern egzersiz kütüphanesi uygulaması 🏋️‍♂️