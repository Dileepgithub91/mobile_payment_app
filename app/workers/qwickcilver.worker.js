const { Worker, isMainThread, parentPort } = require("worker_threads");
const {
  cardService,
  qwikCilverService,
  pinePerkService,
} = require("../services");

const QwikCilverWorker = async (data) => {
  console.log(data[0]);
  let resError = [];
  let resSuccess = [];
  await data.forEach(async (product) => {
    ///update user
    const card = await cardService.saveCard({
      provider_code: product.sku,
      name: product.name,
      category_id: "gift_card",
      sub_category_id: "qwikcilver",
      product_description: "",
      priceType: "singleprice",
      min_price: product.minPrice,
      max_price: product.maxPrice,
      image: product.images.thumbnail,
    });
    console.log(card);
    if (!card.success) {
      responcesError.push(card.data);
    } else {
      responcesSuccess.push(card.data);
    }
  });
  console.log(resError, resSuccess);
  return { message: "Operation Completed!", resError, resSuccess };
};

if (isMainThread) {
  ///Qwick silver product api
  // const products = await qwikCilverService.getProductList({categoryId:122});
  // if (!products.success) {
  //  console.log(products);
  // }
  // if (products.data.products.length == 0) {
  //   responcesError.push("no Product Found!");
  // }

  const products = [
    {
      sku: "KALYUAE",
      name: "Kalyan Jewellers eGift Card-Resellers-uae",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "kalyan-jewellers-egift-card-resellers-uae",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/KALYUAE/d/thumbnail/637_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/KALYUAE/d/mobile/637_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/KALYUAE/d/image/637_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/KALYUAE/d/small_image/637_microsite.jpg",
      },
      created_at: "2020-08-07T11:02:56+00:00",
      updated_at: "2023-06-01T04:12:34+00:00",
    },
    {
      sku: "EGCGBTAJNY0002",
      name: "Taj-New Year",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-new-year",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:40:44+00:00",
      updated_at: "2023-06-20T10:37:20+00:00",
    },
    {
      sku: "THEC001",
      name: "Taj Hotels eGift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "egv1",
      minPrice: "500",
      maxPrice: "200000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/THEC001/d/thumbnail/372_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/THEC001/d/mobile/372_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/THEC001/d/image/372_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/THEC001/d/small_image/372_microsite.jpg",
      },
      created_at: "2019-03-25T11:35:24+00:00",
      updated_at: "2023-03-06T10:06:39+00:00",
    },
    {
      sku: "Grab001",
      name: "Grab E-Gift card - Singapore-01",
      currency: {
        code: "SGD",
        symbol: "S$",
        numericCode: "702",
      },
      url: "grab-e-gift-card-singapore",
      minPrice: "1",
      maxPrice: "1000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/Grab001/d/thumbnail/384_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/Grab001/d/mobile/384_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/Grab001/d/image/384_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/Grab001/d/small_image/384_microsite.png",
      },
      created_at: "2019-06-10T11:48:48+00:00",
      updated_at: "2022-02-17T10:07:17+00:00",
    },
    {
      sku: "EGCGBTAJE00001",
      name: "Taj-Engagement",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-engagement",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:35:41+00:00",
      updated_at: "2023-06-20T10:38:07+00:00",
    },
    {
      sku: "GRABPH001",
      name: "GrabGifts Philippines E-Voucher",
      currency: {
        code: "PHP",
        symbol: "₱",
        numericCode: "608",
      },
      url: "grabgifts-philippines-e-voucher-565",
      minPrice: "1",
      maxPrice: "1000000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GRABPH001/d/small_image/434_microsite.png",
      },
      created_at: "2019-12-03T06:49:09+00:00",
      updated_at: "2020-04-14T06:01:01+00:00",
    },
    {
      sku: "GRABPH002",
      name: "GrabGifts Philippines E-Voucher",
      currency: {
        code: "PHP",
        symbol: "₱",
        numericCode: "608",
      },
      url: "grabgifts-philippines-e-voucher",
      minPrice: "1",
      maxPrice: "1000000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GRABPH002/d/small_image/435_microsite.png",
      },
      created_at: "2019-12-03T07:41:35+00:00",
      updated_at: "2020-04-14T06:01:54+00:00",
    },
    {
      sku: "EGCGBTAJD0001",
      name: "TAJ-Diwali",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-diwali",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:13:33+00:00",
      updated_at: "2023-06-20T10:38:28+00:00",
    },
    {
      sku: "EGCGBIBJA001",
      name: "IBJA GOLD E-Gift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "ibja-gold-e-gift-card",
      minPrice: "100",
      maxPrice: "1000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBIBJA001/d/thumbnail/459_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBIBJA001/d/mobile/459_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBIBJA001/d/image/459_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBIBJA001/d/small_image/459_microsite.png",
      },
      created_at: "2020-02-14T09:53:44+00:00",
      updated_at: "2021-05-27T07:53:08+00:00",
    },
    {
      sku: "GCGBIBJA001",
      name: "IBJA GOLD Gift Card Test",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "ibja-gold-gift-card",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GCGBIBJA001/d/thumbnail/481_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/GCGBIBJA001/d/mobile/481_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/GCGBIBJA001/d/image/481_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GCGBIBJA001/d/small_image/481_microsite.jpg",
      },
      created_at: "2020-04-20T07:02:49+00:00",
      updated_at: "2022-02-17T10:07:25+00:00",
    },
    {
      sku: "EGCGBTAJE0001",
      name: "TAJ-Easter",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-easter-1149",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:09:26+00:00",
      updated_at: "2023-06-20T10:39:12+00:00",
    },
    {
      sku: "EGCGBKT001",
      name: "KT Test  E-Gift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "kt-test-e-gift-card",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBKT001/d/image/571_microsite.jpg",
        small: "",
      },
      created_at: "2020-07-07T07:12:48+00:00",
      updated_at: "2021-07-12T00:05:13+00:00",
    },
    {
      sku: "GBV2PLEGC001",
      name: "Flipkart E-Gift Card base",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "flipkart-e-gift-card",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GBV2PLEGC001/d/thumbnail/24_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/GBV2PLEGC001/d/mobile/24_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/GBV2PLEGC001/d/image/24_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GBV2PLEGC001/d/small_image/24_microsite.jpg",
      },
      created_at: "2015-09-08T23:03:59+00:00",
      updated_at: "2023-07-11T09:35:06+00:00",
    },
    {
      sku: "KLYNOMN001",
      name: "Kalyan Jewellers eGift Card-Resellers-oman",
      currency: {
        code: "OMR",
        symbol: null,
        numericCode: "512",
      },
      url: "kalyan-jewellers-egift-card-resellers-oman",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/KLYNOMN001/d/thumbnail/638_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/KLYNOMN001/d/mobile/638_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/KLYNOMN001/d/image/638_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/KLYNOMN001/d/small_image/638_microsite.jpg",
      },
      created_at: "2020-08-07T11:06:19+00:00",
      updated_at: "2023-04-11T14:23:36+00:00",
    },
    {
      sku: "EGCGBTAJET0001",
      name: "TAJ-Easter",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-easter",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:05:12+00:00",
      updated_at: "2023-06-20T10:43:05+00:00",
    },
    {
      sku: "EGCGBTAJOC0002",
      name: "TAJ-Occasions",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-occasions",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T05:59:33+00:00",
      updated_at: "2023-06-20T10:40:01+00:00",
    },
    {
      sku: "EGVTJCH0003",
      name: "TAJ-Christmas",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-christmas",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T05:44:28+00:00",
      updated_at: "2023-06-20T10:40:32+00:00",
    },
    {
      sku: "EGVTJGB0003",
      name: "Taj Mothers day test",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-mothers-day-test",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T04:01:31+00:00",
      updated_at: "2023-06-20T10:43:41+00:00",
    },
    {
      sku: "EGCGBTAJ001",
      name: "Taj hotels- Mother's Day-test",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-hotels-mothersday",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-03-31T04:33:36+00:00",
      updated_at: "2023-03-31T04:51:57+00:00",
    },
    {
      sku: "GBUATV2TAJEGC002",
      name: "Taj- Testing CN & PIN",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-cn-pin-1125",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC002/d/thumbnail/1125_microsite.jpeg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC002/d/mobile/1125_microsite.jpeg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC002/d/image/1125_microsite.jpeg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC002/d/small_image/1125_microsite.jpeg",
      },
      created_at: "2023-03-22T14:24:59+00:00",
      updated_at: "2023-03-22T14:24:59+00:00",
    },
    {
      sku: "EGCGBTest001",
      name: "Test J e-gift card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "test-j-e-gift-card",
      minPrice: "100",
      maxPrice: "1000",
      price: {
        cpg: {
          INR: {
            type: "RANGE",
            min: "100",
            max: "2000",
            denominations: ["100", "200", "500"],
          },
        },
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-03-30T11:49:09+00:00",
      updated_at: "2021-03-30T13:01:33+00:00",
    },
    {
      sku: "ASVAMZNB2B",
      name: "Amazon Shopping Voucher",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "amazon-shopping-voucher",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/ASVAMZNB2B/d/thumbnail/789_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/ASVAMZNB2B/d/mobile/789_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/ASVAMZNB2B/d/image/789_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/ASVAMZNB2B/d/small_image/789_microsite.jpg",
      },
      created_at: "2021-05-19T18:27:40+00:00",
      updated_at: "2023-07-19T11:31:10+00:00",
    },
    {
      sku: "GBUATV2TAJEGC001",
      name: "Taj hotels- Natural",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-hotels-natural-1109",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC001/d/thumbnail/1109_microsite.jpeg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC001/d/mobile/1109_microsite.jpeg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC001/d/image/1109_microsite.jpeg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GBUATV2TAJEGC001/d/small_image/1109_microsite.jpeg",
      },
      created_at: "2023-03-06T09:52:32+00:00",
      updated_at: "2023-07-09T05:53:19+00:00",
    },
    {
      sku: "EGCGBTAJBY0002",
      name: "Taj-Birthday",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-birthday",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:49:31+00:00",
      updated_at: "2023-06-20T10:36:20+00:00",
    },
    {
      sku: "EGCGBFK001",
      name: "Fastrack E-Gift Card",
      currency: {
        code: "AUD",
        symbol: "A$",
        numericCode: "036",
      },
      url: "fastrack-e-gift-card",
      minPrice: "10",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBFK001/d/thumbnail/66_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBFK001/d/mobile/66_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBFK001/d/image/66_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBFK001/d/small_image/66_microsite.png",
      },
      created_at: "2015-06-25T08:55:00+00:00",
      updated_at: "2023-07-20T13:48:18+00:00",
    },
    {
      sku: "GBV2LSRC003",
      name: "Reload Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "reload-card",
      minPrice: "50",
      maxPrice: "50000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GBV2LSRC003/d/thumbnail/23_microsite.jpg",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2015-11-01T22:07:26+00:00",
      updated_at: "2022-09-14T15:22:24+00:00",
    },
    {
      sku: "EGCGBAMZ001",
      name: "Amazon Pay E-Gift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "amazon-pay-e-gift-card",
      minPrice: "10",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBAMZ001/d/thumbnail/135_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBAMZ001/d/mobile/135_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBAMZ001/d/image/135_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBAMZ001/d/small_image/135_microsite.jpg",
      },
      created_at: "2015-06-28T06:25:03+00:00",
      updated_at: "2023-07-25T09:48:59+00:00",
    },
    {
      sku: "EGCGBVLC001",
      name: "VLCC E-Gift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "vlcc-gift-card",
      minPrice: "100",
      maxPrice: "50000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBVLC001/d/thumbnail/161_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBVLC001/d/mobile/161_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBVLC001/d/image/161_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBVLC001/d/small_image/161_microsite.jpg",
      },
      created_at: "2015-06-25T16:55:05+00:00",
      updated_at: "2022-02-17T10:06:58+00:00",
    },
    {
      sku: "EGCGBMYT002",
      name: "Myntra E-Gift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "myntra-e-gift-card",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBMYT002/d/thumbnail/205_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBMYT002/d/mobile/205_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBMYT002/d/image/205_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBMYT002/d/small_image/205_microsite.jpg",
      },
      created_at: "2015-12-27T02:46:52+00:00",
      updated_at: "2023-07-21T07:04:37+00:00",
    },
    {
      sku: "EGCGBBMS001",
      name: "BookMyShow E-Gift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "bookmyshow-e-gift-card",
      minPrice: "100",
      maxPrice: "500",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBBMS001/d/thumbnail/217_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBBMS001/d/mobile/217_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBBMS001/d/image/217_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBBMS001/d/small_image/217_microsite.png",
      },
      created_at: "2016-05-19T13:41:11+00:00",
      updated_at: "2022-06-07T10:55:27+00:00",
    },
    {
      sku: "EGCGBPAN001",
      name: "Pantaloons EGV",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "pantaloons-e-gift-card",
      minPrice: "100",
      maxPrice: "2000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBPAN001/d/thumbnail/233_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBPAN001/d/mobile/233_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCGBPAN001/d/image/233_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBPAN001/d/small_image/233_microsite.png",
      },
      created_at: "2016-11-11T13:05:01+00:00",
      updated_at: "2023-02-07T09:49:45+00:00",
    },
    {
      sku: "EGVSAVN99P02",
      name: "snapdeal",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "saavn-test-subscription-p02",
      minPrice: "100",
      maxPrice: "1000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGVSAVN99P02/d/thumbnail/247_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGVSAVN99P02/d/mobile/247_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGVSAVN99P02/d/image/247_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGVSAVN99P02/d/small_image/247_microsite.jpg",
      },
      created_at: "2017-05-29T06:24:35+00:00",
      updated_at: "2023-02-14T13:07:54+00:00",
    },
    {
      sku: "EGVGBSBDOM002",
      name: "Dominos E-Gift Card",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "dominos-e-gift-card",
      minPrice: "100",
      maxPrice: "2000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGVGBSBDOM002/d/thumbnail/252_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGVGBSBDOM002/d/mobile/252_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGVGBSBDOM002/d/image/252_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGVGBSBDOM002/d/small_image/252_microsite.jpg",
      },
      created_at: "2017-06-14T13:26:01+00:00",
      updated_at: "2022-02-17T10:07:06+00:00",
    },
    {
      sku: "GOOGLEPLAYRCB2C",
      name: "Google Play Recharge Code",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "google-play-recharge-code",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYRCB2C/d/thumbnail/279_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYRCB2C/d/mobile/279_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYRCB2C/d/image/279_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYRCB2C/d/small_image/279_microsite.png",
      },
      created_at: "2017-08-21T07:49:54+00:00",
      updated_at: "2022-02-17T10:07:10+00:00",
    },
    {
      sku: "EGCGBVOUASVAMEX001",
      name: "Amazon Shopping Voucher-Vouchagram-Amex",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "amazon-shopping-voucher-1195",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-06-22T10:48:27+00:00",
      updated_at: "2023-06-22T10:57:50+00:00",
    },
    {
      sku: "EGCGBVOUASVWON001",
      name: "Amazon Shopping Voucher-Vouchagram-Wonder Cement",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "amazon-shopping-voucher-1193",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-06-22T10:43:01+00:00",
      updated_at: "2023-06-22T10:55:54+00:00",
    },
    {
      sku: "EGCGBTAJQM0001",
      name: "Taj-Qmin",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-qmin",
      minPrice: "1000",
      maxPrice: "100000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-06-06T17:54:13+00:00",
      updated_at: "2023-06-20T10:35:15+00:00",
    },
    {
      sku: "EGCASVAMZNB2C",
      name: "Amazon Shopping Voucher-B2C",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "amazon-shopping-voucher-1175",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCASVAMZNB2C/d/thumbnail/1175_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCASVAMZNB2C/d/mobile/1175_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/EGCASVAMZNB2C/d/image/1175_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCASVAMZNB2C/d/small_image/1175_microsite.jpg",
      },
      created_at: "2023-05-31T09:35:30+00:00",
      updated_at: "2023-05-31T09:46:45+00:00",
    },
    {
      sku: "EGVEUROGGCB2B01",
      name: "GrapeFruit eGift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "grapefruit-egift-card",
      minPrice: "129",
      maxPrice: "129",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-25T05:25:38+00:00",
      updated_at: "2023-04-25T10:52:42+00:00",
    },
    {
      sku: "UBEREGV001",
      name: "UBER EGV",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "uber-egv",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2018-05-24T09:27:23+00:00",
      updated_at: "2020-04-14T05:48:21+00:00",
    },
    {
      sku: "EGCGBTAJVL0001",
      name: "Taj-Valentine",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-valentine",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:57:22+00:00",
      updated_at: "2023-06-20T10:35:37+00:00",
    },
    {
      sku: "EGCGBTAJED002",
      name: "Taj-Eid",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-eid",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:53:40+00:00",
      updated_at: "2023-06-20T10:36:01+00:00",
    },
    {
      sku: "EGCGBTAJW0002",
      name: "Taj-Wedding",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "taj-wedding",
      minPrice: "1000",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-18T06:44:43+00:00",
      updated_at: "2023-06-20T10:36:39+00:00",
    },
    {
      sku: "EGCGBUKAV001",
      name: "Air Vistra E-Gift card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "air-vistra-e-gift-card",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-10-07T11:07:33+00:00",
      updated_at: "2022-01-28T13:15:16+00:00",
    },
    {
      sku: "SPOTIFY1M129",
      name: "SPOTIFY PREMIUM STANDARD 1 MONTH 129INR",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "spotify-premium-standard-1-month-129inr",
      minPrice: "129",
      maxPrice: "129",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1M129/d/thumbnail/910_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1M129/d/mobile/910_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1M129/d/image/910_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1M129/d/small_image/910_microsite.png",
      },
      created_at: "2022-03-02T14:25:37+00:00",
      updated_at: "2022-04-20T10:15:14+00:00",
    },
    {
      sku: "SPOTIFY3M389",
      name: "SPOTIFY PREMIUM STANDARD 3 MONTH 389INR",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "spotify-premium-standard-3-month-389inr",
      minPrice: "389",
      maxPrice: "389",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY3M389/d/thumbnail/911_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY3M389/d/mobile/911_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY3M389/d/image/911_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY3M389/d/small_image/911_microsite.png",
      },
      created_at: "2022-03-02T14:36:59+00:00",
      updated_at: "2022-04-20T10:14:48+00:00",
    },
    {
      sku: "SPOTIFY6M719",
      name: "SPOTIFY PREMIUM STANDARD 6 MONTH 719INR",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "spotify-premium-standard-6-month-719inr",
      minPrice: "719",
      maxPrice: "719",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY6M719/d/thumbnail/912_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY6M719/d/mobile/912_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY6M719/d/image/912_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY6M719/d/small_image/912_microsite.png",
      },
      created_at: "2022-03-02T14:40:14+00:00",
      updated_at: "2022-04-20T10:14:22+00:00",
    },
    {
      sku: "SPOTIFY1Y1189",
      name: "SPOTIFY PREMIUM STANDARD ANNUAL 1189INR",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "spotify-premium-standard-annual-1189inr",
      minPrice: "1189",
      maxPrice: "1189",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1Y1189/d/thumbnail/913_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1Y1189/d/mobile/913_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1Y1189/d/image/913_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/SPOTIFY1Y1189/d/small_image/913_microsite.png",
      },
      created_at: "2022-03-02T14:42:34+00:00",
      updated_at: "2022-04-20T10:13:57+00:00",
    },
    {
      sku: "SDGUAE0002",
      name: "SharafDG UAE Trading eCard",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "sharafdg-uae-trading-ecard",
      minPrice: "1",
      maxPrice: "5000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-07-11T13:12:01+00:00",
      updated_at: "2023-07-12T05:21:57+00:00",
    },
    {
      sku: "SDGUAE001",
      name: "SharafDG UAE eCard",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "sharafdg-uae-ecard",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-24T06:30:03+00:00",
      updated_at: "2023-06-01T04:12:22+00:00",
    },
    {
      sku: "EGCGBUAE001",
      name: "IKEA UAE EGift Card ",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "ikea-uae-egift-card",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-03T14:34:33+00:00",
      updated_at: "2023-06-01T04:12:01+00:00",
    },
    {
      sku: "EGCGBQATAR001",
      name: "IKEA QATAR EGift Card ",
      currency: {
        code: "QAR",
        symbol: "ر.ق",
        numericCode: "634",
      },
      url: "ikea-qatar-egift-card",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-03T14:37:01+00:00",
      updated_at: "2023-06-01T04:20:09+00:00",
    },
    {
      sku: "EGCGBOMAN001",
      name: "IKEA OMAN EGift Card ",
      currency: {
        code: "OMR",
        symbol: null,
        numericCode: "512",
      },
      url: "ikea-oman-egift-card",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-03T14:38:28+00:00",
      updated_at: "2023-04-12T11:52:11+00:00",
    },
    {
      sku: "EGCGBEGYPT001",
      name: "IKEA EGYPT EGift Card ",
      currency: {
        code: "EGP",
        symbol: null,
        numericCode: "818",
      },
      url: "ikea-egypt-egift-card",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2023-04-03T14:39:27+00:00",
      updated_at: "2023-04-12T11:51:22+00:00",
    },
    {
      sku: "APITESTVOUCODECP",
      name: "API TESTING - Voucher code(CardPIN only)",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-voucher-pin",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2020-08-12T07:43:57+00:00",
      updated_at: "2023-02-20T10:51:12+00:00",
    },
    {
      sku: "EGCGBTN001",
      name: "Titan E-Gift card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "titan-egc",
      minPrice: "0",
      maxPrice: "50000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBTN001/d/thumbnail/69_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBTN001/d/mobile/69_microsite.png",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/EGCGBTN001/d/small_image/69_microsite.png",
      },
      created_at: "2015-06-26T03:55:00+00:00",
      updated_at: "2023-07-24T14:01:17+00:00",
    },
    {
      sku: "CNPIN",
      name: "API TESTING - CN & PIN",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-cn-pin",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/thumbnail/324_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/mobile/324_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/image/324_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/CNPIN/d/small_image/324_microsite.png",
      },
      created_at: "2018-07-26T06:58:11+00:00",
      updated_at: "2023-05-30T11:35:56+00:00",
    },
    {
      sku: "VOUCHERCODE",
      name: "API TESTING - Voucher code",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-voucher-code",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/VOUCHERCODE/d/thumbnail/325_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/VOUCHERCODE/d/mobile/325_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/VOUCHERCODE/d/image/325_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/VOUCHERCODE/d/small_image/325_microsite.jpg",
      },
      created_at: "2018-07-26T07:00:33+00:00",
      updated_at: "2023-07-13T06:18:09+00:00",
    },
    {
      sku: "UBEFLOW",
      name: "API TESTING - UBE",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-ube",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/UBEFLOW/d/thumbnail/326_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/UBEFLOW/d/mobile/326_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/UBEFLOW/d/image/326_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/UBEFLOW/d/small_image/326_microsite.jpg",
      },
      created_at: "2018-07-26T07:04:03+00:00",
      updated_at: "2023-07-25T08:37:35+00:00",
    },
    {
      sku: "CLAIMCODE",
      name: "API TESTING - Claim Code",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-claim-code",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/CLAIMCODE/d/thumbnail/327_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/CLAIMCODE/d/mobile/327_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/CLAIMCODE/d/image/327_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/CLAIMCODE/d/small_image/327_microsite.png",
      },
      created_at: "2018-07-26T07:25:07+00:00",
      updated_at: "2023-07-20T04:25:42+00:00",
    },
    {
      sku: "PROCESSINGSTS",
      name: "API TESTING - Processing Status",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-processing-status",
      minPrice: "100",
      maxPrice: "100000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/PROCESSINGSTS/d/thumbnail/328_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/PROCESSINGSTS/d/mobile/328_microsite.jpg",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/PROCESSINGSTS/d/small_image/328_microsite.jpg",
      },
      created_at: "2018-07-26T07:30:36+00:00",
      updated_at: "2023-05-11T11:53:23+00:00",
    },
    {
      sku: "CPGINACTIVE",
      name: "API TESTING - CPG Inactive",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-cpg-inactive",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/CPGINACTIVE/d/thumbnail/330_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/CPGINACTIVE/d/mobile/330_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/CPGINACTIVE/d/image/330_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/CPGINACTIVE/d/small_image/330_microsite.jpg",
      },
      created_at: "2018-07-26T07:38:11+00:00",
      updated_at: "2021-10-18T07:37:59+00:00",
    },
    {
      sku: "PROGPARAMSNA",
      name: "API TESTING - Program Parameters not found",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-program-parameters-not-found",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/PROGPARAMSNA/d/thumbnail/331_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/PROGPARAMSNA/d/mobile/331_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/PROGPARAMSNA/d/image/331_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/PROGPARAMSNA/d/small_image/331_microsite.jpg",
      },
      created_at: "2018-07-26T07:41:06+00:00",
      updated_at: "2021-06-03T11:14:36+00:00",
    },
    {
      sku: "CARDAPINA",
      name: "API TESTING - Card API Missing",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-card-api-missing",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/CARDAPINA/d/thumbnail/333_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/CARDAPINA/d/mobile/333_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/CARDAPINA/d/image/333_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/CARDAPINA/d/small_image/333_microsite.jpg",
      },
      created_at: "2018-07-26T07:43:50+00:00",
      updated_at: "2021-06-03T11:15:21+00:00",
    },
    {
      sku: "APITESTTIMFAIL",
      name: "API TESTING - Timeout Failure",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-timeout-failure",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/APITESTTIMFAIL/d/thumbnail/336_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/APITESTTIMFAIL/d/mobile/336_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/APITESTTIMFAIL/d/image/336_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/APITESTTIMFAIL/d/small_image/336_microsite.jpg",
      },
      created_at: "2018-08-17T11:43:36+00:00",
      updated_at: "2023-05-05T07:03:37+00:00",
    },
    {
      sku: "testsuccess001",
      name: "API TESTING - Timeout Success",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-timeout-sucess",
      minPrice: "10",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/testsuccess001/d/thumbnail/338_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/testsuccess001/d/mobile/338_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/testsuccess001/d/image/338_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/testsuccess001/d/small_image/338_microsite.jpg",
      },
      created_at: "2018-08-28T09:29:40+00:00",
      updated_at: "2023-07-13T09:08:33+00:00",
    },
    {
      sku: "SBCEGC001",
      name: "Starbucks eGift Card - Starbucks",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "starbucks-coffee",
      minPrice: "100",
      maxPrice: "5000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC001/d/thumbnail/351_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC001/d/mobile/351_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC001/d/image/351_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC001/d/small_image/351_microsite.jpg",
      },
      created_at: "2019-01-07T14:51:55+00:00",
      updated_at: "2022-02-17T10:07:14+00:00",
    },
    {
      sku: "GOOGLEPLAYGCB2B",
      name: "Google Play Gift Code",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "google-play-gift-code-b2b",
      minPrice: "10",
      maxPrice: "1000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYGCB2B/d/thumbnail/398_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYGCB2B/d/mobile/398_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYGCB2B/d/image/398_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/GOOGLEPLAYGCB2B/d/small_image/398_microsite.png",
      },
      created_at: "2019-06-26T09:18:29+00:00",
      updated_at: "2022-02-17T10:07:20+00:00",
    },
    {
      sku: "SBCEGC002",
      name: "Starbucks Test eGift Card",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "starbucks-test-egift-card",
      minPrice: "200",
      maxPrice: "5000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC002/d/thumbnail/438_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC002/d/mobile/438_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC002/d/image/438_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/SBCEGC002/d/small_image/438_microsite.jpg",
      },
      created_at: "2019-12-26T05:48:43+00:00",
      updated_at: "2020-04-29T05:11:48+00:00",
    },
    {
      sku: "APITESTCLAIMCODE",
      name: "API TESTING - Claim Code",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-claim-code-497",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2020-04-30T14:16:44+00:00",
      updated_at: "2023-01-24T05:22:37+00:00",
    },
    {
      sku: "PHYTIME002",
      name: "API TESTING - Physical Timeout Failure",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-physical-timeout-failure",
      minPrice: "100",
      maxPrice: "100000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYTIME002/d/thumbnail/820_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYTIME002/d/mobile/820_microsite.jpg",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYTIME002/d/small_image/820_microsite.jpg",
      },
      created_at: "2021-08-04T07:45:41+00:00",
      updated_at: "2021-12-18T14:29:56+00:00",
    },
    {
      sku: "amazonincentivessingapore",
      name: "Amazon Incentives - MEA",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "amazon-incentives-singapore",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/amazonincentivessingapore/d/thumbnail/711_microsite.png",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/amazonincentivessingapore/d/mobile/711_microsite.png",
        base: "https://gbdev.s3.amazonaws.com/uat/product/amazonincentivessingapore/d/image/711_microsite.png",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/amazonincentivessingapore/d/small_image/711_microsite.png",
      },
      created_at: "2020-10-13T15:44:40+00:00",
      updated_at: "2023-07-11T08:56:55+00:00",
    },
    {
      sku: "UBETIMEOUT",
      name: "API TESTING - UBE Timeout success",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-ube-timeout-success",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUT/d/thumbnail/749_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUT/d/mobile/749_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUT/d/image/749_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUT/d/small_image/749_microsite.jpg",
      },
      created_at: "2020-12-01T16:51:48+00:00",
      updated_at: "2022-05-19T11:14:31+00:00",
    },
    {
      sku: "UBETIMEOUTFAIL",
      name: "API TESTING - UBE Timeout failure",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-ube-timeout-failure",
      minPrice: "100",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUTFAIL/d/thumbnail/750_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUTFAIL/d/mobile/750_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUTFAIL/d/image/750_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/UBETIMEOUTFAIL/d/small_image/750_microsite.jpg",
      },
      created_at: "2020-12-01T17:42:38+00:00",
      updated_at: "2021-06-03T11:21:14+00:00",
    },
    {
      sku: "MICROSOFTPERSONALEGC",
      name: "GCMV MICROSOFT OFFICE 365 PERSONAL",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "gcmv-microsoft-office-365-personal",
      minPrice: "4899",
      maxPrice: "4899",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPERSONALEGC/d/thumbnail/764_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPERSONALEGC/d/mobile/764_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPERSONALEGC/d/image/764_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPERSONALEGC/d/small_image/764_microsite.jpg",
      },
      created_at: "2021-02-23T11:19:46+00:00",
      updated_at: "2022-02-18T06:36:39+00:00",
    },
    {
      sku: "MICROSOFTFAMILYEGC",
      name: "GCMV MICROSOFT OFFICE 365 FAMILY",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "gcmv-microsoft-office-365-family",
      minPrice: "6199",
      maxPrice: "6199",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTFAMILYEGC/d/thumbnail/765_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTFAMILYEGC/d/mobile/765_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTFAMILYEGC/d/image/765_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTFAMILYEGC/d/small_image/765_microsite.jpg",
      },
      created_at: "2021-02-23T11:40:36+00:00",
      updated_at: "2023-02-06T05:40:35+00:00",
    },
    {
      sku: "MICROSOFTSTUDENTEGC",
      name: "GCMV MICROSOFT OFFICE HOME AND STUDENT",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "gcmv-microsoft-office-home-and-student",
      minPrice: "9199",
      maxPrice: "9199",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTSTUDENTEGC/d/thumbnail/766_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTSTUDENTEGC/d/mobile/766_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTSTUDENTEGC/d/image/766_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTSTUDENTEGC/d/small_image/766_microsite.jpg",
      },
      created_at: "2021-02-23T11:49:56+00:00",
      updated_at: "2022-02-18T06:47:01+00:00",
    },
    {
      sku: "MICROSOFTPREMIUMEGC",
      name: "GCMV MICROSOFT OFFICE BUSINESS Standards",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "gcmv-microsoft-office-business-premium",
      minPrice: "9299",
      maxPrice: "9299",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-02-23T12:35:40+00:00",
      updated_at: "2022-03-14T07:36:16+00:00",
    },
    {
      sku: "MICROSOFTBUSINESSEGC",
      name: "GCMV MICROSOFT OFFICE HOME AND BUSINESS 2019",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "gcmv-microsoft-office-365-family-768",
      minPrice: "27999",
      maxPrice: "27999",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTBUSINESSEGC/d/image/768_microsite.jpg",
        small: "",
      },
      created_at: "2021-02-23T12:41:24+00:00",
      updated_at: "2022-02-18T06:45:34+00:00",
    },
    {
      sku: "MICROSOFTPROFESSIONALEGC",
      name: "GCMV MICROSOFT OFFICE PROFESSIONAL",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "gcmv-microsoft-office-365-personal-769",
      minPrice: "47899",
      maxPrice: "47899",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPROFESSIONALEGC/d/thumbnail/769_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPROFESSIONALEGC/d/mobile/769_microsite.jpg",
        base: "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPROFESSIONALEGC/d/image/769_microsite.jpg",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/MICROSOFTPROFESSIONALEGC/d/small_image/769_microsite.jpg",
      },
      created_at: "2021-02-23T12:45:56+00:00",
      updated_at: "2022-02-18T06:48:39+00:00",
    },
    {
      sku: "EGCGBBPUAE001",
      name: "Blue Prepaid UAE eCard",
      currency: {
        code: "AED",
        symbol: null,
        numericCode: "784",
      },
      url: "blue-prepaid-uae-ecard",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-06-03T07:53:33+00:00",
      updated_at: "2023-06-01T04:11:34+00:00",
    },
    {
      sku: "EGCGBBPQAT001",
      name: "Blue Prepaid Qatar eCard",
      currency: {
        code: "QAR",
        symbol: "ر.ق",
        numericCode: "634",
      },
      url: "blue-prepaid-qatar-ecard",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-06-03T07:56:55+00:00",
      updated_at: "2023-06-01T04:20:11+00:00",
    },
    {
      sku: "EGCGBBOM001",
      name: "Blue Prepaid Oman eCard",
      currency: {
        code: "OMR",
        symbol: null,
        numericCode: "512",
      },
      url: "blue-prepaid-oman-ecard",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-06-03T07:59:04+00:00",
      updated_at: "2021-06-18T10:46:03+00:00",
    },
    {
      sku: "EGCGBBPKSA001",
      name: "Blue Prepaid KSA eCard",
      currency: {
        code: "SAR",
        symbol: "﷼",
        numericCode: "682",
      },
      url: "blue-prepaid-ksa-ecard",
      minPrice: "1",
      maxPrice: "10000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail: "",
        mobile: "",
        base: "",
        small: "",
      },
      created_at: "2021-06-03T07:59:30+00:00",
      updated_at: "2023-06-01T04:14:34+00:00",
    },
    {
      sku: "PHYSICAL001",
      name: "API TESTING - Physical Product",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-physical-product-818",
      minPrice: "100",
      maxPrice: "100000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYSICAL001/d/thumbnail/818_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYSICAL001/d/mobile/818_microsite.jpg",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYSICAL001/d/small_image/818_microsite.jpg",
      },
      created_at: "2021-08-04T06:52:57+00:00",
      updated_at: "2023-01-24T06:37:21+00:00",
    },
    {
      sku: "PHYTIME001",
      name: "API TESTING - Physical Timeout Success",
      currency: {
        code: "INR",
        symbol: "₹",
        numericCode: "356",
      },
      url: "api-testing-physical-timeout-success-819",
      minPrice: "100",
      maxPrice: "100000",
      price: {
        cpg: [],
      },
      images: {
        thumbnail:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYTIME001/d/thumbnail/819_microsite.jpg",
        mobile:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYTIME001/d/mobile/819_microsite.jpg",
        base: "",
        small:
          "https://gbdev.s3.amazonaws.com/uat/product/PHYTIME001/d/small_image/819_microsite.jpg",
      },
      created_at: "2021-08-04T07:43:57+00:00",
      updated_at: "2021-12-18T14:30:30+00:00",
    },
  ];

  // Create a new worker thread
  const worker = new Worker(__filename);

  // Listen for messages from the worker thread
  worker.on("UpdateExternalApi", (result) => {
    console.log("Operation successfull!!", result);
  });
  // console.log(products.data.products.length);products.data.products
  // Send a message to the worker thread
  worker.postMessage({ action: "saveCard", data: products });
} else {
  // Worker thread code: Perform the actual computation
  parentPort.on("UpdateExternalApi", async (message) => {
    if (message.action === "saveCard") {
      let qwikCilverRes = await QwikCilverWorker(message.data);
      parentPort.postMessage(qwikCilverRes);
    }
  });
}

console.log("Operation completed!!");
