# Laboratuvar Raporlama Uygulaması

Bu proje, laboratuvar raporlarının yönetimi için geliştirilmiş bir web uygulamasıdır. Backend kısmı Java ve Spring Boot kullanılarak, frontend kısmı ise React ile geliştirilmiştir. Proje, raporların tanımlanması, güncellenmesi, silinmesi ve listelenmesi gibi işlevleri destekler. Ayrıca, JWT ile güvenli giriş sağlanmıştır.

## Diğer Repo

Bu proje için kullanılan backend kodlarına [buradan](https://github.com/canermastan/Laboratory-Reporting-System-API) ulaşabilirsiniz.

## Kurulum

### React (Frontend)

Projeyi başlatmak için aşağıdaki komutları kullanabilirsiniz:

```bash
npm install && npm start
```

### Kullanıcı Bilgileri
Uygulama başlatıldığında admin ve kullanıcı hesapları otomatik olarak oluşturulmaktadır. Kullanıcı bilgileri aşağıdaki gibidir:

#### Admin
```
Email: admin@test.com
Parola: 123456
```

#### User
```
Email: user@test.com
Parola: 123456
```

### Teknik Detaylar
#### UI Kütüphanesi
Bu uygulamada, geliştiricilerin kodu hızlı ve etkili bir şekilde anlamalarını sağlamak için Semantic UI kullanılmıştır. Semantic UI, anlaşılır bir yapıya sahiptir ve sınıflar ile etiketler semantik isimlendirmeyle anlamlı bir şekilde adlandırılmıştır. Ayrıca, kapsamlı bir dökümantasyona sahip olması nedeniyle tercih edilmiştir.

#### Kimlik Doğrulama Mekanizması

Bu uygulamada, kullanıcıların güvenli bir şekilde giriş yapabilmesi için JSON Web Token (JWT) kullanılmıştır. JWT, modern web uygulamalarında yaygın olarak kullanılan bir kimlik doğrulama standardıdır.

#### Data Transfer Object (DTO)

DTO (Data Transfer Object), veri transferi için optimize edilmiş bir tasarım desenidir. Veri tabanı veya harici servislerle iletişimde veri nesnelerini etkili bir şekilde aktarır. DTO'lar, ağ trafiğini azaltarak istemci uygulamanın performansını artırır ve sadece gereksinim duyulan verilerin alınmasını sağlar. Bu uygulamada DTO tasarım deseni, kullanıcıların sadece ihtiyaç duyduğu verilere erişimini kolaylaştırmak için tercih edilmiştir.

#### Cache Mekanizması

REST API'lerde performansı artırmak ve sunucu yükünü azaltmak için cache mekanizması kullanılır. Cache, veri veya yanıtların geçici olarak saklandığı bir bellek alanıdır. Bu uygulamada özel bir cache mekanizması kullanılmasa da, performans gereksinimleri göz önünde bulundurularak Spring'in cache kabiliyetinden az da olsa faydalanılmıştır.

## Endpoints

### Authentication

**POST /auth/register**

Kullanıcı sisteme kayıt olur.

Request Body:
```json
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "hospitalIdentityNumber": ""
}
```

**POST /auth/login**

Kullanıcı sisteme giriş yapar.

Request Body:
```json
{
  "email": "user@test.com",
  "password": "123456"
}
```
### Image
```
POST /image/upload/{reportId}
```

Rapora fotoğraf tanımlar.

```
GET /image/download/{fileId}
```

Rapora tanımlı fotoğrafı getirir.

### Report
```
GET /api/v1/report/all
```
Tüm raporları getirir.
```
GET /api/v1/report/{id}
```

ID ile eşleşen raporu getirir.


****

**POST /api/v1/report/save**

Request Body:
```json

{
  "reportNo": "",
  "patientFirstName": "",
  "patientLastName": "",
  "patientIdentityNumber": "",
  "diagnosisTitle": "",
  "diagnosisDetail": ""
}

```

Yeni rapor ekler.


```
PUT /api/v1/report/upload/{id}
```

ID ile eşleşen raporu günceller.

```
DELETE /api/v1/report/delete/{id}
```
ID ile eşleşen raporu siler (bu işlemi sadece admin kullanıcılar yapabilir).