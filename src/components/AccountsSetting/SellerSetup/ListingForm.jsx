import React, { useState, useEffect, useRef } from "react";
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/ProductServices
import Category from "../../../services/API/Category"; //~/services/API/Category
import HomeService from "../../../services/API/HomeService"; //~/services/API/Home
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Spinner } from "react-bootstrap";
import Select from 'react-select';
import { MdDelete } from "react-icons/md";

const libraries = ["places"];

const ListingForm = ({ setSubmitted, productId, setProductId }) => {

  const [inputError, setInputError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noAttributeFounded, setNoAttributeFounded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [isFromLoading, setIsFromLoading] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries,
  });
  const productCondition = [
    { id: "BrandNew", name: "BrandNew" },
    { id: "Used", name: "Used" }
  ];

  const productUserCondition = [
    { value: 1, label: "Brand Used" },
    { value: 2, label: "Good" },
    { value: 3, label: "Fair" },
    { value: 4, label: "Acceptable" }
  ];

  const [productManagment, setProductManagments] = useState({
    file: [],
    condition: "",
    used_condition: null,
    underage: 0,
    attributes: [],
    old_files: [],
    termsdescription: "",
    title: "",
    category: null,
    subCategory: null,
    stockCapacity: "",
    brand_id: null,
    model: "",
    description: "",
    tags: "",
    saleprice: "",
    sellingNow: false,
    listing: "",
    price: "",
    minpurchase: 0,
    auctioned: false,
    bids: "",
    durations: 0,
    hours: "",
    auctionListing: "",
    end_listing: "",
    deliverddomestic: false,
    deliverdinternational: false,
    deliverycompany: "asd",
    address: "",
    latitude: "",
    longitude: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    old_files: [],
    shippingprice: 0,
    shipingdurations: 0,
    returnshippingprice: 0,
    returndurationlimit: 0,
    returnshippingpaidby: 0,
    returnshippinglocation: "asds",
    returncountry: "asdasd",
    returnstate: "returnstate",
    returncity: "dsasd",
    returnzip: "000",
    weight: "",
    height: "",
    length: "",
    width: ""
  })

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageFileChange = (e) => {
    const maxAllowedFiles = 5;
    const selectedFiles = Array.from(e.target.files);

    setProductManagments(prev => ({ ...prev, file: [...prev.file, ...selectedFiles] }));
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...productManagment.file];
    updatedFiles.splice(index, 1);
    setProductManagments(prev => ({ ...prev, file: updatedFiles }));
  };

  const fetchCategory = () => {
    Category.all()
      .then((response) => {
        let tempCategoryArray = []
        for (let i = 0; i < response?.length; i++) {
          tempCategoryArray.push({ value: response[i].id, label: response[i].name })
        }
        setCategories(tempCategoryArray);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const fetchSubCategory = (id) => {
    Category.getCategorySubCategoryById(id)
      .then((response) => {
        const arr = []
        for (let i = 0; i < response?.data?.sub_categories.length; i++) {
          arr.push({ label: response?.data?.sub_categories?.[i]?.name, value: response?.data?.sub_categories?.[i]?.id })
        }
        setSubCategories(arr);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.data);
      });
  };

  const getBrands = () => {
    HomeService.getbrands()
      .then((response) => {
        let tempCategoryArray = []
        for (let i = 0; i < response?.length; i++) {
          tempCategoryArray.push({ value: response[i].id, label: response[i].name })
        }
        setBrands(tempCategoryArray);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const handelCategoryChange = (data, apiAttributes, parent) => {
    if (parent) {
      setProductManagments(prev => ({ ...prev, category: data }));
      setSubCategories([]);
      fetchSubCategory(data.value);
    } else {
      setProductManagments(prev => ({ ...prev, category: data }));
      setSubCategories([]);
      fetchSubCategory(data.value);
      Category.productAttributes(data.value)
        .then((res) => {
          if (res?.data?.length > 0) {
            const categoryAddons = res?.data?.map(category => ({
              name: category.key,
              selected: null,
              options: category.options.map((option, index) => ({
                value: index + 1,
                label: option
              })),
              selectToSend: []
            }));
            setProductManagments(prev => ({ ...prev, attributes: categoryAddons }));

            if (productId !== '' &&
              productId !== null &&
              productId !== undefined &&
              categoryAddons?.[0]?.selected === null) {

              let updateAddons = []
              let selectedd = []
              let selectToSendd = []
              for (let i = 0; i < categoryAddons?.length; i++) {
                for (let j = 0; j < categoryAddons[i].options?.length; j++) {
                  for (let k = 0; k < apiAttributes[i].options?.length; k++) {
                    if (apiAttributes[i].options[k] === categoryAddons[i].options[j].label) {
                      selectedd.push({
                        value: k + 1,
                        label: apiAttributes[i].options[k]
                      })
                      selectToSendd.push(apiAttributes[i].options[k])
                    }
                  }
                }
                updateAddons.push({
                  name: categoryAddons[i].name,
                  selected: selectedd,
                  options: categoryAddons[i].options,
                  selectToSend: selectToSendd
                })
                selectedd = []
                selectToSendd = []
              }
              setProductManagments(prev => ({ ...prev, attributes: updateAddons, category: data }));
            }
          } else {
            setProductManagments(prev => ({ ...prev, attributes: [] }));
            setNoAttributeFounded(true)
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
          setIsLoading(false)
        });
    }
  }

  const handelSubCategoryChange = (data, apiAttributes) => {
    setProductManagments(prev => ({ ...prev, subCategory: data }));
    Category.productAttributes(data.value)
      .then((res) => {
        if (res?.data?.length > 0) {
          const categoryAddons = res?.data?.map(category => ({
            name: category.key,
            selected: null,
            options: category.options.map((option, index) => ({
              value: index + 1,
              label: option
            })),
            selectToSend: []
          }));
          setProductManagments(prev => ({ ...prev, attributes: categoryAddons }));

          if (productId !== '' &&
            productId !== null &&
            productId !== undefined &&
            categoryAddons?.[0]?.selected === null) {

            let updateAddons = []
            let selectedd = []
            let selectToSendd = []
            for (let i = 0; i < categoryAddons?.length; i++) {
              for (let j = 0; j < categoryAddons[i].options?.length; j++) {
                for (let k = 0; k < apiAttributes[i].options?.length; k++) {
                  if (apiAttributes[i].options[k] === categoryAddons[i].options[j].label) {
                    selectedd.push({
                      value: k + 1,
                      label: apiAttributes[i].options[k]
                    })
                    selectToSendd.push(apiAttributes[i].options[k])
                  }
                }
              }
              updateAddons.push({
                name: categoryAddons[i].name,
                selected: selectedd,
                options: categoryAddons[i].options,
                selectToSend: selectToSendd
              })
              selectedd = []
              selectToSendd = []
            }
            setProductManagments(prev => ({ ...prev, attributes: updateAddons, subCategory: data }));
          }
        } else {
          setProductManagments(prev => ({ ...prev, attributes: [] }));
          setNoAttributeFounded(true)
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      });

  }

  const handelUsedConsitionChange = (data) => {
    setProductManagments(prev => ({ ...prev, used_condition: data }));
  }

  useEffect(() => {
    setProductManagments(prev => ({ ...prev }));
  },
    [productManagment.attributes])

  const handelAddonsChange = (e, data, index) => {
    const updatedArray = [...productManagment.attributes];
    const labelsArray = e.map(option => option.label);

    updatedArray[index] = {
      name: data.name,
      selected: e,
      options: data?.options,
      selectToSend: labelsArray
    };

    setProductManagments(prev => ({ ...prev, attributes: updatedArray }));
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProductManagments(prev => ({ ...prev, [name]: checked }));
    } else {
      setProductManagments(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setProductManagments(prev => ({
        ...prev,
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      }));
      let political, administrative_area_level_1, postalCode;

      for (let i = 0; i < place.address_components?.length; i++) {
        const component = place.address_components[i];
        for (let j = 0; j < component.types?.length; j++) {
          if (component.types[j] === 'country') {
            political = component.long_name;
          } else if (component.types[j] === 'administrative_area_level_1') {
            administrative_area_level_1 = component.long_name;
          } else if (component.types[j] === 'postal_code') {
            postalCode = component.long_name;
          }
        }
      }
      setProductManagments(prev => ({
        ...prev,
        country: political,
        state: administrative_area_level_1,
        city: place.name,
        zip: postalCode,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInputError(true)
    setIsFromLoading(true)
    if (productManagment.file.length === 0 || productManagment.condition === "" ||
      productManagment.category === null || productManagment.brand_id === null ||
      productManagment.description === "" || productManagment.address === "" ||
      productManagment.country === "" ||
      productManagment.state === "" || productManagment.city === "" || productManagment.zip === "" ||
      productManagment.weight === "" || productManagment.weight === 0 || productManagment.width === "" ||
      productManagment.width === 0 || productManagment.height === "" || productManagment.height === 0 ||
      productManagment.length === "" || productManagment.length === 0
    ) {
      setIsFromLoading(false)
      return false;
    }

    if (productManagment.attributes.length > 0) {
      for (let i = 0; i < productManagment.attributes.length; i++) {
        if (productManagment.attributes[i].selected === null) {
          setIsFromLoading(false)
          return false;
        }
      }
    }

    if (productManagment.sellingNow) {
      if (productManagment.saleprice === "" || productManagment.saleprice === 0 || productManagment.saleprice < 0 ||
        productManagment.price === "" || productManagment.price === 0 || productManagment.price < 0 ||
        productManagment.minpurchase === "" || productManagment.minpurchase === 0 || productManagment.minpurchase < 0 ||
        productManagment.listing === "") {
        setIsFromLoading(false)
        return false;
      }
    }

    if (productManagment.auctioned) {
      if (productManagment.bids === "" || productManagment.bids === 0 || productManagment.bids < 0 ||
        productManagment.durations === "" || productManagment.durations === 0 || productManagment.durations < 0 ||
        productManagment.hours === "" || productManagment.hours === 0 || productManagment.hours < 0 ||
        productManagment.auctionListing === "" || productManagment.end_listing === "") {
        setIsFromLoading(false)
        return false;
      }
    }

    if (productManagment.condition === "Used") {
      if (productManagment.used_condition === null) {
        setIsFromLoading(false)
        return false;
      }
    }

    if (productManagment.condition != "Used" && !productManagment.auctioned) {
      if (productManagment.stockCapacity === "") {
        setIsFromLoading(false)
        return false;
      }
    }

    const formData = new FormData();
    productManagment.file.forEach((image_file) => {
      if (image_file?.name?.includes('http')) {
      } else {
        formData.append("file[]", image_file);
      }
    });

    formData.append("underage", productManagment?.underage);
    formData.append("condition", productManagment?.condition);
    if (productManagment?.condition === "Used") {
      formData.append("used_condition", productManagment?.used_condition?.label);
    }
    if (productManagment?.attributes?.length > 0) {
      let attributes = [];
      for (let i = 0; i < productManagment?.attributes?.length; i++) {
        for (let j = 0; j < productManagment.attributes[i].selectToSend?.length; j++) {
          attributes.push({ key: productManagment.attributes[i].name, value: productManagment.attributes[i].selectToSend[j] })
        }
      }
      formData.append('attributes', JSON.stringify(attributes));
    }
    if (productManagment.old_files.length > 0) {
      formData.append('old_files_web', JSON.stringify(productManagment.old_files));
    }
    formData.append("termsdescription", productManagment.termsdescription);
    formData.append("title", productManagment.title);
    if (productManagment.subCategory != null) {
      formData.append("category", productManagment?.subCategory?.value);
    } else {
      formData.append("category", productManagment?.category?.value);
    }
    if (productManagment.condition === 'Used' && !productManagment.auctioned) {
      formData.append("stockCapacity", 1);
    } else {
      formData.append("stockCapacity", productManagment.stockCapacity);
    }


    if (productManagment?.sellingNow === true) {
      formData.append("price", productManagment.price);
      formData.append("saleprice", productManagment.saleprice);
      formData.append("minpurchase", productManagment.minpurchase);
      formData.append("listing", productManagment.listing);
    } else {
      formData.append("price", null);
      formData.append("saleprice", null);
      formData.append("minpurchase", 0);
      formData.append("listing", null);
    }

    if (productManagment?.auctioned === true) {
      formData.append("bids", productManagment.bids);
      formData.append("durations", productManagment.durations);
      formData.append("hours", productManagment.hours);
      formData.append("auctionListing", productManagment.auctionListing);
      formData.append("end_listing", productManagment.end_listing);

    } else {
      formData.append("bids", null);
      formData.append("durations", 0);
      formData.append("hours", null);
      formData.append("auctionListing", null);
      formData.append("end_listing", null);
    }

    formData.append("brand_id", productManagment.brand_id?.value);
    formData.append("model", productManagment.model);
    formData.append("description", productManagment.description);
    formData.append("tags", JSON.stringify(productManagment.tags));
    formData.append("sellingNow", productManagment.sellingNow);
    formData.append("auctioned", productManagment.auctioned);
    formData.append("deliverddomestic", productManagment.deliverddomestic);
    formData.append("deliverdinternational", productManagment.deliverdinternational);
    formData.append("deliverycompany", productManagment.deliverycompany);
    formData.append("address", productManagment.address);
    formData.append("latitude", productManagment.latitude);
    formData.append("longitude", productManagment.longitude);
    formData.append("country", productManagment.country);
    formData.append("state", productManagment.state);
    formData.append("city", productManagment.city);
    formData.append("zip", productManagment.zip);
    formData.append("shippingprice", productManagment.shippingprice);
    formData.append("shipingdurations", productManagment.shipingdurations);
    formData.append("returnshippingprice", productManagment.returnshippingprice);
    formData.append("returndurationlimit", productManagment.returndurationlimit);
    formData.append("returnshippingpaidby", productManagment.returnshippingpaidby);
    formData.append("returnshippinglocation", productManagment.returnshippinglocation);
    formData.append("returncountry", productManagment.returncountry);
    formData.append("returnstate", productManagment.returnstate);
    formData.append("returncity", productManagment.returncity);
    formData.append("returnzip", productManagment.returnzip);
    formData.append("weight", productManagment.weight);
    formData.append("height", productManagment.height);
    formData.append("length", productManagment.length);
    formData.append("width", productManagment.width);

    if (productId !== '' && productId !== null && productId !== undefined) {
      ProductServices.updateProduct(productId, formData)
        .then((res) => {
          setSuccess(true)
          setProductId('')
          setPopupText('Product updated Sucessfully')
          setTimeout(() => {
            setSubmitted(false)
          }, 3000);
          setIsFromLoading(false)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
          setIsFromLoading(false)
        });
    } else {
      ProductServices.createSellerProduct(formData)
        .then((res) => {
          setSuccess(true)
          setPopupText('Product Listed Sucessfully')
          // setTimeout(() => {
          //   setSubmitted(false)
          // }, 3000);
          setIsFromLoading(false)
        })
        .catch((error) => {
          setIsFromLoading(false)
          toast.error(error?.response?.data?.message)
        });

    }

  }

  const getProductDetail = (guid) => {
    ProductServices.get(guid)
    
    .then((response) => {
      setProductManagments((prev) => ({
          ...prev,
          file: [...response?.data?.media],
          condition: response?.data?.condition,
          used_condition: {
            label: response?.data?.used_condition,
            value: response?.data?.used_condition === 'Brand Used' ? 1 :
              response?.data?.used_condition === "Good" ? 2 :
                response?.data?.used_condition === "Fair" ? 3 :
                  4
          },
          underage: response?.data?.underage,
          termsdescription: response?.data?.termsdescription,
          title: response?.data?.name,

          stockCapacity: response?.data?.stockcapacity,
          brand_id: { value: response?.data?.brand?.id, label: response?.data?.brand?.name },
          model: response?.data?.model,
          description: response?.data?.description,
          tags: ['girls', 'boys'],
          saleprice: response?.data?.sale_price,
          sellingNow: response?.data?.selling_now === 0 ? false : true,
          listing: response?.data?.listing,
          price: response?.data?.price,
          minpurchase: response?.data?.min_purchase,
          auctioned: response?.data?.auctioned === 0 ? false : true,
          bids: response?.data?.bids,
          durations: response?.data?.durations,
          hours: response?.data?.hours,
          auctionListing: response?.data?.auction_listing,
          end_listing: response?.data?.auction_End_listing ? response?.data?.auction_End_listing.slice(0,10) : '',
          // end_listing: response?.data?.end_listing ? `${response?.data?.end_listing.slice()}` : '',
          deliverddomestic: response?.data?.deliverd_domestic,
          deliverdinternational: response?.data?.deliverd_international,
          deliverycompany: "asd",
          address: response?.data?.user?.address,
          latitude: response?.data?.latitude,
          longitude: response?.data?.longitude,
          country: response?.data?.return_country,
          state: response?.data?.state,
          city: response?.data?.city,
          zip: response?.data?.zip,
          shippingprice: response?.data?.shipping_price,
          shipingdurations: response?.data?.shiping_durations,
          returnshippingprice: response?.data?.return_shipping_price,
          returndurationlimit: response?.data?.return_ship_duration_limt,
          returnshippingpaidby: response?.data?.return_ship_paid_by,
          returnshippinglocation: "asds",
          returncountry: "asdasd",
          returnstate: "returnstate",
          returncity: "dsasd",
          returnzip: "000",
          weight: response?.data?.weight,
          height: response?.data?.height,
          length: response?.data?.length,
          width: response?.data?.width
        }))
        if (response?.data?.category?.parent_id == null) {
          setProductManagments((prev) => ({
            ...prev,
            category: { value: response?.data?.category?.id, label: response?.data?.category?.name },
            subCategory: null
          }))
          handelCategoryChange({ value: response?.data?.category?.id, label: response?.data?.category?.name }, response?.data?.attributes, false)
        } else {
          setProductManagments((prev) => ({
            ...prev,
            category: { value: response?.data?.category?.parent_id, label: response?.data?.category?.parent_name },
            subCategory: { value: response?.data?.category?.id, label: response?.data?.category?.name }
          }))
          handelCategoryChange({ value: response?.data?.category?.parent_id, label: response?.data?.category?.parent_name }, response?.data?.attributes, true)
          handelSubCategoryChange({ value: response?.data?.category?.id, label: response?.data?.category?.name }, response?.data?.attributes)
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const oldImagesDelete = (id) => {

    const prevIds = [...productManagment.old_files]
    setProductManagments(prev => ({ ...prev, old_files: [...prevIds, id] }));
  }

  useEffect(() => {
    fetchCategory()
    getBrands()
  }, [])

  useEffect(() => {
    if (productId !== "") {
      getProductDetail(productId)
    }
  }, [productId])


  return (
    <>
      <section id="listing-creating-form">
        {isLoading ? (
          <div className="loader-container text-center">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        ) : (
          <>
            <form onSubmit={handleFormSubmit} className="p-m-f">
              <div className="t-p-m">
                Describe Your Product
              </div>
              <div className="p-m-p-c">
                <h3>Select condition of your item</h3>
                <h4>This book is a treatise on the theory of ethics, very popular during the Renaissance. </h4>
                <ul>
                  {productCondition?.map((data, index) => {
                    return (
                      <li key={index} onClick={() => { setProductManagments((prev) => ({ ...prev, condition: data.id })) }}>
                        <div className={`check ${productManagment?.condition === data.name ? 'active' : ''}`}>
                          <div className="check-wrap"></div>
                        </div>
                        <p className={`${productManagment?.condition === data.name ? 'active' : ''}`}>{data.name}</p>
                      </li>
                    )
                  })}
                </ul>
                {inputError && productManagment.condition === '' && <div className="error-input">condition is required</div>}

              </div>
              <div className="p-m-i-u">
                <div className="p-m-i-u-wrap">
                  <div className="upload-box" onClick={handleUploadClick}>
                    <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" strokeLinecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Click here to upload images</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageFileChange}
                      multiple  // Enable multiple file selection
                    />
                  </div>
                </div>
                {productManagment?.file?.length === 0 && inputError && <div className="error-input">Atleast  one image is required</div>}
                <p>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.39744 6.53134H10.2635V4.66524H8.39744M9.33048 16.7949C5.21574 16.7949 1.8661 13.4452 1.8661 9.33048C1.8661 5.21574 5.21574 1.8661 9.33048 1.8661C13.4452 1.8661 16.7949 5.21574 16.7949 9.33048C16.7949 13.4452 13.4452 16.7949 9.33048 16.7949ZM9.33048 0C8.10519 0 6.89189 0.24134 5.75986 0.710241C4.62784 1.17914 3.59925 1.86642 2.73284 2.73284C0.98303 4.48264 0 6.85589 0 9.33048C0 11.8051 0.98303 14.1783 2.73284 15.9281C3.59925 16.7945 4.62784 17.4818 5.75986 17.9507C6.89189 18.4196 8.10519 18.661 9.33048 18.661C11.8051 18.661 14.1783 17.6779 15.9281 15.9281C17.6779 14.1783 18.661 11.8051 18.661 9.33048C18.661 8.10519 18.4196 6.89189 17.9507 5.75986C17.4818 4.62784 16.7945 3.59925 15.9281 2.73284C15.0617 1.86642 14.0331 1.17914 12.9011 0.710241C11.7691 0.24134 10.5558 0 9.33048 0ZM8.39744 13.9957H10.2635V8.39744H8.39744V13.9957Z" fill="#989595" />
                  </svg>
                  Add minimum 5 images covering all angles of the item that describes well
                </p>
                {productManagment?.file?.length > 0 ?
                  <div className="selected-images">
                    <div className="row">
                      {productManagment.file.map((image, index) => {
                        return (

                          image?.name?.includes('http') ?
                            <div className="col-lg-2" key={index}>
                              <div className="selected-images-box">
                                <img src={image?.name} alt="" />
                                <span onClick={() => { handleDeleteImage(index); oldImagesDelete(image?.id) }}><MdDelete /></span>
                              </div>
                            </div>
                            :
                            <div className="col-lg-2" key={index}>
                              <div className="selected-images-box">
                                <img src={URL.createObjectURL(image)} alt="" />
                                <span onClick={() => { handleDeleteImage(index) }}><MdDelete /></span>
                              </div>
                            </div>

                        )
                      })}
                    </div>
                  </div>
                  : null}

              </div>
              <div className="p-m-i-s">
                <div className="title-line">
                  <h2>Product specifics</h2>
                  <div></div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Product title</label>
                    <input type="text" name="title" value={productManagment?.title} onChange={handleChange} placeholder="Enter product title" />
                    {productManagment.title === '' && inputError &&
                      <div className="error-input">Product title is required</div>
                    }
                  </div>
                  <div className="two-field-left">
                    <label>Category</label>
                    <Select
                      defaultValue={categories?.find(option => option?.value === productManagment?.category?.value)}
                      value={categories?.find(option => option?.value === productManagment?.category?.value)}
                      onChange={handelCategoryChange}
                      options={categories}
                      placeholder={'Select category'}
                    />
                    {productManagment.category === null && inputError &&
                      <div className="error-input">Category is required</div>
                    }
                  </div>
                  {subCategories?.length > 0 &&
                    <div className="two-field-left">
                      <label>Sub Category</label>
                      <Select
                        defaultValue={subCategories?.find(option => option?.value === productManagment?.subCategory?.value)}
                        value={subCategories?.find(option => option?.value === productManagment?.subCategory?.value)}
                        onChange={handelSubCategoryChange}
                        options={subCategories}
                        placeholder={'Select sub category'}
                      />

                    </div>
                  }
                </div>
                {productManagment?.attributes?.length > 0 ?
                  <div className="two-field">
                    {productManagment?.attributes?.map((data, index) => {
                      return (
                        <>
                          <div className="two-field-left" key={index}>
                            <label htmlFor="Price">{data?.name}</label>
                            <Select
                              // defaultValue={selected}
                              value={data?.selected}
                              onChange={(e) => { handelAddonsChange(e, data, index) }}
                              options={productManagment?.attributes?.[index]?.options}
                              placeholder={`Select ${data?.name}`}
                              isMulti
                            />
                            {productManagment?.attributes?.[index]?.selectToSend?.length === 0 && inputError &&
                              <div className="error-input">{data?.name} is required</div>
                            }
                          </div>
                        </>
                      )
                    })}
                  </div>
                  : null}
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Brand</label>
                    <Select
                      value={brands?.find(option => option?.value === productManagment?.brand_id?.value)}
                      onChange={(e) => { setProductManagments({ ...productManagment, brand_id: e }) }}
                      options={brands}
                      placeholder={'Select brand'}
                    />
                    {productManagment.brand_id === null && inputError &&
                      <div className="error-input">Brand is required</div>
                    }
                  </div>
                  {productManagment.condition === "Used" || productManagment.auctioned ? null :
                    <div className="two-field-left">
                      <label>Stock capacity (Quantity)</label>
                      <input type="number" name="stockCapacity" value={productManagment?.stockCapacity} onChange={handleChange} placeholder="Enter quantity" />
                      {productManagment.stockCapacity === "" && inputError &&
                        <div className="error-input">Stock capacity is required</div>
                      }
                    </div>
                  }
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Weight</label>
                    <input type="text" name="weight" value={productManagment?.weight} onChange={handleChange} placeholder="Enter weight" />
                    {productManagment.weight === "" && inputError &&
                      <div className="error-input">Weight is required</div>
                    }
                  </div>
                  <div className="two-field-left">
                    <label>Height</label>
                    <input type="text" name="height" value={productManagment?.height} onChange={handleChange} placeholder="Enter height" />
                    {productManagment.height === "" && inputError &&
                      <div className="error-input">Height is required</div>
                    }
                  </div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Length</label>
                    <input type="text" name="length" value={productManagment?.length} onChange={handleChange} placeholder="Enter length" />
                    {productManagment?.length === "" && inputError &&
                      <div className="error-input">Length is required</div>
                    }
                  </div>
                  <div className="two-field-left">
                    <label>Width</label>
                    <input type="text" name="width" value={productManagment?.width} onChange={handleChange} placeholder="Enter width" />
                    {productManagment.width === "" && inputError &&
                      <div className="error-input">Width is required</div>
                    }
                  </div>
                </div>
                <div className="two-field">
                  {productManagment?.condition === "Used" &&
                    <div className="two-field-left">
                      <label>Used Condition</label>
                      <Select
                        defaultValue={productUserCondition?.find(option => option?.value === productManagment?.used_condition?.value)}
                        value={productUserCondition?.find(option => option?.value === productManagment?.used_condition?.value)}
                        onChange={handelUsedConsitionChange}
                        options={productUserCondition}
                        placeholder={'Select used condition'}
                      />
                      {productManagment.condition === "Used" && productManagment.used_condition === null && inputError &&
                        <div className="error-input">User condition is required</div>
                      }
                    </div>
                  }
                  {/* <div className="two-field-left">
                    <label>Item model</label>
                    <input type="text" name="model" value={productManagment?.model} onChange={handleChange} placeholder="Enter item model" />
                    {productManagment.model === "" && inputError &&
                      <div className="error-input">Item model is required</div>
                    }
                  </div>
                  {productManagment?.condition != "Used" &&
                    <div className="two-field-left">
                    </div>
                  } */}
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Description</label>
                    <textarea type="text" name="description" value={productManagment?.description} onChange={handleChange} placeholder="Enter description" />
                    {productManagment.description === "" && inputError &&
                      <div className="error-input">Description is required</div>
                    }
                  </div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Underage</label>
                    <div className="p-m-p-c">
                      <ul>
                        <li onClick={() => { setProductManagments((prev) => ({ ...prev, underage: productManagment?.underage === 0 ? 1 : 0 })) }}>
                          <div className={`check ${productManagment?.underage === 1 ? 'active' : ''}`}>
                            <div className="check-wrap"></div>
                          </div>
                          <p className={`${productManagment?.underage === 1 ? 'active' : ''}`}>Underage</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-m-i-s">
                <div className="title-line"><h2>Product pricings</h2><div></div></div>
                <div className="two-field">
                  {productManagment?.auctioned === false &&
                    <div className="two-field-left-left">
                      <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <label style={{ margin: '0px' }}>Sell it now</label>
                        <div className="custom-switch">
                          <label className="switch3">
                            <input
                              type="radio"
                              value={productManagment.sellingNow}
                              checked={productManagment.sellingNow}
                              onClick={() => {
                                if (productManagment.sellingNow) {
                                  setProductManagments(prev => ({ ...prev, sellingNow: false, price: '', saleprice: '', minpurchase: '', listing: '' }))
                                } else {
                                  setProductManagments(prev => ({ ...prev, sellingNow: true, price: '', saleprice: '', minpurchase: '', listing: '' }))
                                }
                              }}
                            />
                            <span className="slider3 round3"></span>
                          </label>
                        </div>
                      </div>
                      {!productManagment.auctioned && !productManagment.sellingNow && inputError &&
                        <div className="error-input">Select Sell it now or Auction is required</div>
                      }
                    </div>
                  }
                  {productManagment?.sellingNow === false &&
                    <div className="two-field-left-left">
                      <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <label style={{ margin: '0px' }}>Auction</label>
                        <div className="custom-switch">
                          <label className="switch3">
                            <input
                              type="radio"
                              value={productManagment.auctioned}
                              checked={productManagment.auctioned}
                              onClick={() => {
                                if (productManagment.auctioned) {
                                  setProductManagments(prev => ({ ...prev, auctioned: false, bids: "", durations: 0, hours: "", auctionListing: "", end_listing: "" }))
                                } else {
                                  setProductManagments(prev => ({ ...prev, auctioned: true, bids: "", durations: 0, hours: "", auctionListing: "", end_listing: "" }))
                                }
                              }}
                            />
                            <span className="slider3 round3"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  }
                </div>

                {productManagment?.sellingNow === true &&
                  <>
                    <div className="two-field">
                      <div className="two-field-left">
                        <label>Price ($)</label>
                        <input type="number" name="price" value={productManagment?.price} onChange={handleChange} placeholder="Enter price" />
                        {(productManagment.price === "" && inputError && productManagment.sellingNow) &&
                          <div className="error-input">Price ($) is required</div>
                        }
                      </div>
                      <div className="two-field-left">
                        <label>Sale price  ($)</label>
                        <input type="number" name="saleprice" value={productManagment?.saleprice} onChange={handleChange} placeholder="Enter sale price" />
                        {(productManagment.saleprice === "" && inputError && productManagment.sellingNow) &&
                          <div className="error-input">Sale price  ($) is required</div>
                        }
                      </div>
                    </div>
                    <div className="two-field">
                      <div className="two-field-left">
                        <label>Min purchase</label>
                        <input type="number" name="minpurchase" value={productManagment?.minpurchase} onChange={handleChange} placeholder="Enter min purchase" />
                        {(productManagment.minpurchase === "" && inputError && productManagment.sellingNow) &&
                          <div className="error-input">Min purchase is required</div>
                        }
                      </div>
                      <div className="two-field-left">
                        <label>Schedule Your Listing</label>
                        <input type="date" name="listing" value={productManagment?.listing} onChange={handleChange} />
                        {(productManagment.listing === "" && inputError && productManagment.sellingNow) &&
                          <div className="error-input">Schedule your listing is required</div>
                        }
                      </div>
                    </div>
                  </>
                }
                {productManagment?.auctioned === true &&
                  <>
                    <div className="two-field">
                      <div className="two-field-left">
                        <label>Starting Bid ($)</label>
                        <input type="number" name="bids" value={productManagment?.bids} onChange={handleChange} placeholder="Enter bid" />
                        {(productManagment.bids === "" && inputError && productManagment.auctioned) &&
                          <div className="error-input">Starting bid ($) is required</div>
                        }
                      </div>
                      <div className="two-field-left">
                        <label>Duration</label>
                        <input type="number" name="durations" value={productManagment?.durations} onChange={handleChange} placeholder="Enter duration" />
                        {(productManagment.durations === "" && inputError && productManagment.auctioned) &&
                          <div className="error-input">Duration is required</div>
                        }
                      </div>
                    </div>
                    <div className="two-field">
                      {/* <div className="two-field-left">
                        <label>Hours</label>
                        <input type="number" name="hours" value={productManagment?.hours} onChange={handleChange} placeholder="min hours" />
                        {(productManagment.hours === "" && inputError && productManagment.auctioned) &&
                          <div className="error-input">Hours is required</div>
                        }
                      </div> */}
                      <div className="two-field-left">
                        <label>Schedule Your Listing</label>
                        <input type="date" name="auctionListing" value={productManagment?.auctionListing} onChange={handleChange} />
                        {(productManagment.auctionListing === "" && inputError && productManagment.auctioned) &&
                          <div className="error-input">Schedule your listing is required</div>
                        }
                      </div>
                      <div className="two-field-left">
                        <label>Schedule End Listing</label>
                        <input type="date" name="end_listing" value={productManagment?.end_listing} onChange={handleChange} />
                        {(productManagment.end_listing === "" && inputError && productManagment.auctioned) &&
                          <div className="error-input">Schedule end listing is required</div>
                        }
                      </div>
                    </div>
                    <div className="two-field">
                     
                      <div className="two-field-left">
                      </div>
                    </div>
                  </>
                }
              </div>
              <div className="p-m-i-s">
                <div className="title-line">
                  <h2>Delivery setup</h2>
                  <div></div>
                </div>
                <div className="two-field">
                  <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1' }}>
                    <label style={{ margin: '0px' }}>Deliver domestically</label>
                    <div className="custom-switch">
                      <label className="switch3">
                        <input
                          type="radio"
                          value={productManagment.deliverddomestic}
                          checked={productManagment.deliverddomestic}
                          onClick={() => {
                            if (productManagment.deliverddomestic) {
                              setProductManagments(prev => ({ ...prev, deliverddomestic: false }))
                            } else {
                              setProductManagments(prev => ({ ...prev, deliverddomestic: true }))
                            }
                          }}
                        />
                        <span className="slider3 round3"></span>
                      </label>
                    </div>
                  </div>
                  <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1' }}>
                    <label style={{ margin: '0px' }}>Deliver International</label>
                    <div className="custom-switch">
                      <label className="switch3">
                        <input
                          type="radio"
                          value={productManagment.deliverdinternational}
                          checked={productManagment.deliverdinternational}
                          onClick={() => {
                            if (productManagment.deliverdinternational) {
                              setProductManagments(prev => ({ ...prev, deliverdinternational: false }))
                            } else {
                              setProductManagments(prev => ({ ...prev, deliverdinternational: true }))
                            }
                          }}
                        />
                        <span className="slider3 round3"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Address</label>
                    {productId ?
                      <>
                        {isLoaded && (
                          <StandaloneSearchBox onPlacesChanged={handlePlaceChanged} style={{ width: '100%' }}>
                            <input type="text" name="address" onChange={handleChange} defaultValue={productManagment.address} placeholder={productManagment.address} />
                          </StandaloneSearchBox>
                        )}
                      </>
                      :
                      <>
                        {isLoaded && (
                          <StandaloneSearchBox
                            style={{ width: '100%' }}
                            onLoad={(ref) => (inputRef.current = ref)}
                            onPlacesChanged={handlePlaceChanged}
                          >
                            <input type="text" name="address" onChange={handleChange} placeholder="Enter your street Address" />
                          </StandaloneSearchBox>
                        )}
                      </>

                    }
                    {productManagment.address === "" && inputError &&
                      <div className="error-input">Address is required</div>
                    }
                    {/* <input type="text" name="stockCapacity" value={productManagment?.returnshippingpaidby} onChange={handleChange} placeholder="Enter address" /> */}
                  </div>
                  <div className="two-field-left">
                    <label>Country</label>
                    <input type="text" name="country" value={productManagment?.country} onChange={handleChange} placeholder="Enter country" />
                    {productManagment.country === "" && inputError &&
                      <div className="error-input">Country is required</div>
                    }
                  </div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>State</label>
                    <input type="text" name="state" value={productManagment?.state} onChange={handleChange} placeholder="Enter state" />
                    {productManagment.state === "" && inputError &&
                      <div className="error-input">State is required</div>
                    }
                  </div>
                  <div className="two-field-left">
                    <label>City</label>
                    <input type="text" name="city" value={productManagment?.city} onChange={handleChange} placeholder="Enter city" />
                    {productManagment.city === "" && inputError &&
                      <div className="error-input">City is required</div>
                    }
                  </div>
                </div>
                {/* <div className="two-field">
                  <div className="two-field-left">
                    <label>Shipping price</label>
                    <input type="number" name="shippingprice" value={productManagment?.shippingprice} onChange={handleChange} placeholder="Enter shipping price" />
                    {productManagment.shippingprice === "" && inputError &&
                      <div className="error-input">Shipping price is required</div>
                    }
                  </div>
                  <div className="two-field-left">
                    <label>Shipping duration</label>
                    <input type="number" name="shipingdurations" value={productManagment?.shipingdurations} onChange={handleChange} placeholder="Enter shipping duration" />
                    {productManagment.shipingdurations === "" && inputError &&
                      <div className="error-input">Shipping duration is required</div>
                    }
                  </div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label >Return shipping price</label>
                    <input type="number" name="returnshippingprice" value={productManagment?.returnshippingprice} onChange={handleChange} placeholder="Enter return shipping price" />
                    {productManagment.returnshippingprice === "" && inputError &&
                      <div className="error-input">Return shipping price is required</div>
                    }

                  </div>
                  <div className="two-field-left">
                    <label>Return duration limit</label>
                    <input type="number" name="returndurationlimit" value={productManagment?.returndurationlimit} onChange={handleChange} placeholder="Enter return duration limit" />
                    {(productManagment.returndurationlimit === "" && inputError) &&
                      <div className="error-input">Return duration limit paid by is required</div>}
                  </div>
                </div>
                <div className="two-field">
                  <div className="two-field-left">
                    <label>Return shipping price paid by</label>
                    <input type="number" name="returnshippingpaidby" value={productManagment?.returnshippingpaidby} onChange={handleChange} placeholder="Enter return shipping price paid by" />
                    {(productManagment.returnshippingpaidby === "" && inputError) &&
                      <div className="error-input">Return shipping price paid by is required</div>}
                  </div>
                  <div className="two-field-left">
                  </div>
                </div> */}
              </div>
              <div className="p-m-s-b">
                <button
                  className="btn2"
                  style={{ marginTop: "10px" }}
                  disabled={isFromLoading}
                  type="submit"
                >
                  {isFromLoading ? "loading.." : "Preview Product"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
      <Modal
        show={success}
        centered
        size="lg"
        className="seller-product-modal-wrap"
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-body">
          <svg width="133" height="133" viewBox="0 0 133 133" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.60825" y="1.25669" width="129.789" height="129.789" rx="64.8947" stroke="url(#paint0_linear_14_3937)" stroke-width="1.96651" />
            <path d="M36.0234 65.3982L55.9177 85.2925L95.7767 45.5039" stroke="url(#paint1_linear_14_3937)" stroke-width="7.86603" strokeLinecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="paint0_linear_14_3937" x1="145.163" y1="-2.67632" x2="-62.3032" y2="132.029" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8B2CA0" />
                <stop offset="1" stop-color="#00C3C9" />
              </linearGradient>
              <linearGradient id="paint1_linear_14_3937" x1="65.9" y1="45.5039" x2="65.9" y2="85.2925" gradientUnits="userSpaceOnUse">
                <stop stop-color="#8B2CA0" />
                <stop offset="1" stop-color="#00C3C9" />
              </linearGradient>
            </defs>
          </svg>
          <h4>{popupText}</h4>
          <p>We hope you enjoy selling on our platform</p>
        </div>
      </Modal>
    </>
  );
};

export default ListingForm;
