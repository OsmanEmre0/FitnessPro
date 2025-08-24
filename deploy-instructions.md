# Netlify Deployment Talimatları

## 🚀 Hızlı Deploy

### 1. Manuel Deploy (Önerilen)

1. **GitHub'a Push**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Netlify Dashboard**
   - https://app.netlify.com adresine gidin
   - "New site from Git" butonuna tıklayın
   - GitHub hesabınızı bağlayın
   - Repository'nizi seçin

3. **Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (otomatik algılanacak)

4. **Environment Variables**
   - Site settings → Environment variables
   - `VITE_RAPIDAPI_KEY` = `your_rapidapi_key_here`

5. **Deploy**
   - "Deploy site" butonuna tıklayın
   - 2-3 dakika bekleyin

### 2. Netlify CLI ile Deploy

```bash
# Netlify CLI kurulumu
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## 🔧 Environment Variables

### Netlify Dashboard'da Ayarlayın:
```
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

### RapidAPI Anahtarı Alma:
1. https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
2. "Subscribe to Test" (ücretsiz)
3. API anahtarını kopyalayın

## 📁 Dosya Yapısı

```
FitnessPro/
├── netlify.toml          # Netlify yapılandırması
├── public/
│   └── _redirects        # SPA routing
├── dist/                 # Build çıktısı
├── env.example           # Environment örneği
└── deploy-instructions.md # Bu dosya
```

## ✅ Kontrol Listesi

- [ ] Build başarılı (`npm run build`)
- [ ] Environment variables ayarlandı
- [ ] API anahtarı geçerli
- [ ] SPA routing çalışıyor
- [ ] Responsive tasarım test edildi
- [ ] Favori sistemi çalışıyor
- [ ] Arama fonksiyonu çalışıyor

## 🐛 Sorun Giderme

### Build Hatası
```bash
# Node version kontrolü
node --version  # 18+ olmalı

# Dependencies temizleme
rm -rf node_modules package-lock.json
npm install
```

### API Hatası
- Environment variable'ın doğru ayarlandığından emin olun
- RapidAPI anahtarının geçerli olduğunu kontrol edin

### Routing Hatası
- `public/_redirects` dosyasının varlığını kontrol edin
- `netlify.toml` dosyasındaki redirect ayarlarını kontrol edin

## 🌐 Custom Domain

1. **Domain Settings** → **Custom domains**
2. **Add custom domain**
3. DNS ayarlarını yapın:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

## 📊 Analytics (İsteğe Bağlı)

Netlify Analytics eklemek için:
1. **Site settings** → **Analytics**
2. **Enable analytics**
3. **Tracking code** otomatik eklenir

## 🔄 Otomatik Deploy

Her `git push` sonrası otomatik deploy için:
1. **Build & deploy** → **Continuous deployment**
2. **Deploy contexts** ayarlayın:
   - **Production**: `main` branch
   - **Preview**: `develop` branch

## 📱 PWA Desteği (Gelecek)

PWA desteği eklemek için:
1. `public/manifest.json` oluşturun
2. Service worker ekleyin
3. Icons ekleyin

---

**Başarılı deployment! 🎉**
