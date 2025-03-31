# WolframAlpha API Entegrasyonu Talimatları

Bu projede matematiksel hesaplamaları doğru ve detaylı bir şekilde yapmak için WolframAlpha API'sini kullanıyoruz. Bu, çeşitli karmaşık matematik problemlerini çözmek için güçlü bir araçtır.

## Kurulum Adımları

1. [WolframAlpha Developer Portal](https://developer.wolframalpha.com/portal/myapps)'da bir hesap oluşturun.
2. "Get an AppID" butonunu tıklayarak yeni bir uygulama oluşturun.
3. Uygulamanıza bir isim verin (örn. "MatematikCozucu").
4. AppID'nizi (API anahtarı) aldıktan sonra, `solution/page.tsx` dosyasındaki `WOLFRAM_APP_ID` değişkenine yapıştırın:

```javascript
const WOLFRAM_APP_ID = 'YOUR_WOLFRAM_APP_ID'; // Buraya API anahtarınızı yazın
```

## Nasıl Çalışır

API entegrasyonu şu şekilde çalışır:

1. Kullanıcı bir matematik problemi girer
2. Sistem problemi analiz eder ve WolframAlpha sorgusu oluşturur
3. API'den cevap alınır ve sonuçlar adımlar halinde listelenir
4. Eğer API çağrısı başarısız olursa, sistem yedek olarak yerel hesaplama metodlarını kullanır

## Desteklenen Problem Türleri

WolframAlpha API'si aşağıdaki problem türlerini ve daha fazlasını çözebilir:

- Denklem çözümleri (`2x + 3 = 7` vb.)
- Denklem sistemleri (`x + y = 10, 2x - y = 5` vb.)
- İntegral hesapları (`∫x²dx` vb.)
- Türev hesapları (`d/dx (sin(x))` vb.)
- Determinant hesapları
- Matris işlemleri
- Limit hesapları
- Ve daha birçok matematiksel problem...

## Hata Ayıklama

API çağrıları başarısız olursa:

1. API anahtarınızın doğru olduğunu kontrol edin
2. Günlük API kullanım limitinizi aşmadığınızdan emin olun (ücretsiz hesap günlük 2000 sorgu ile sınırlıdır)
3. Problem formatının uygun olduğundan emin olun
4. WolframAlpha'nın desteklediği sorgu formatlarını inceleyin

## İnternet Bağlantısı Gerekliliği

WolframAlpha API kullanımı için internet bağlantısı gereklidir. API'ye erişilemediği durumlarda, sistem otomatik olarak daha basit, yerel hesaplama fonksiyonlarına geçiş yapar. 