import React, { useEffect, useState } from 'react';

import M from 'materialize-css';

import './Product.css';
import ProductImage from '../../../assets/img/product/ProductSample.jpg';
import ProductImage2 from '../../../assets/img/product/ProductSample2.jpg';
import ProductImage3 from '../../../assets/img/product/ProductSample3.jpg';
import ProductImage4 from '../../../assets/img/product/ProductSample4.jpg';
import ProductImage5 from '../../../assets/img/product/ProductSample5.jpg';
import ProductImage6 from '../../../assets/img/product/ProductSample6.jpg';
import ProductImage7 from '../../../assets/img/product/ProductSample7.jpg';
import ProductImage8 from '../../../assets/img/product/ProductSample8.jpg';

const slideDown = (event, productIconCount, currentProductIconCount, setCurrentProductIconCount) => {
    event.preventDefault();

    //3 : offset to display icons, 72: height of icon (68) and margin (4)
    const maxTranslateY = (productIconCount - 3) * 72;
    const currentTranslateY = (currentProductIconCount - 1) * 72;
    if (maxTranslateY === currentTranslateY) {
        return;
    }
    for (let i = 0; i < productIconCount; i++) {
        let productCollectionDiv = document.getElementsByClassName("product-photo-collection-icon-div")[i];
        productCollectionDiv.style.transform = "translateY(-"+ (currentTranslateY + 72) +"px)";
    }
    setCurrentProductIconCount(currentProductIconCount+1);
}

const slideUp = (event, productIconCount, currentProductIconCount, setCurrentProductIconCount) => {
    event.preventDefault();

    const currentTranslateY = (currentProductIconCount - 1) * 72;
    if (0 === currentTranslateY) {
        return;
    }
    for (let i = 0; i < productIconCount; i++) {
        let productCollectionDiv = document.getElementsByClassName("product-photo-collection-icon-div")[i];
        productCollectionDiv.style.transform = "translateY("+ (72 - currentTranslateY) +"px)";

    }
    setCurrentProductIconCount(currentProductIconCount-1);
}

const moveToProductImage = (event, productCarouselInstance, target) => {
    event.preventDefault();
    productCarouselInstance.set(target);
}

const Product = () => {

    const [productIconCount, setProductIconCount] = useState(0);
    const [currentProductIconCount, setCurrentProductIconCount] = useState(0);
    const [productCarouselInstance, setProductCarouselInstance] = useState(0);

    useEffect( () => {

        setProductIconCount(8);
        setCurrentProductIconCount(1);

        const variantOptions = {
            dropdownOptions: {
                hover: false,
            },
        };

        const productCarouselOptions = {
            fullWidth: true,
            indicators: false,
            duration: 50,
        };

        const variantElem = document.getElementById('variant-select');
        const quantityElem = document.getElementById('quantity-select');
        const productCarouselElem = document.getElementById('product-carousel');

        const productCarouselInstance = M.Carousel.init(productCarouselElem, productCarouselOptions);
        setProductCarouselInstance(productCarouselInstance);
        const variantInstance = M.FormSelect.init(variantElem, variantOptions);
        const quantityInstance = M.FormSelect.init(quantityElem);

        // Remove event listeners added by Materialize for corousel
        productCarouselElem.removeEventListener('mousedown', productCarouselInstance._handleCarouselTapBound);
        productCarouselElem.removeEventListener('mousemove', productCarouselInstance._handleCarouselDragBound);
        productCarouselElem.removeEventListener('mouseup', productCarouselInstance._handleCarouselReleaseBound);
        productCarouselElem.removeEventListener('mouseleave', productCarouselInstance._handleCarouselReleaseBound);
        productCarouselElem.removeEventListener('click', productCarouselInstance._handleCarouselClickBound);
    }, []);

    return (
        <div className = "row card-panel">
            <div className="col s12 m12 l6 hide-on-small-only">
                <div className="col s9 m9 l9">
                    <div className="">
                        <div id="product-carousel" className="carousel carousel-slider center product-photo-focussed">
                            <a className="carousel-item" href="#!"><img src={ProductImage} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage2} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage3} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage4} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage5} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage6} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage7} alt="product"></img></a>
                            <a className="carousel-item" href="#!"><img src={ProductImage8} alt="product"></img></a>
                        </div>
                    </div>
                </div>
                <div className="col s3 m3 l3">

                    <div className="product-photo-collection-prev-btn-div">
                        <p className="product-photo-collection-prev-para">
                            <a className="product-photo-collection-prev-btn" href="#!" onClick={e => slideUp(e, productIconCount, currentProductIconCount, setCurrentProductIconCount)}>
                                <i className="material-icons">expand_less</i>
                            </a>
                        </p>
                    </div>
                    
                    <div className="product-photo-collection">                        
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 0)} >
                                <img src={ProductImage} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 1)} >
                                <img src={ProductImage2} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 2)} >
                                <img src={ProductImage3} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 3)} >
                                <img src={ProductImage4} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 4)} >
                                <img src={ProductImage5} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 5)} >
                                <img src={ProductImage6} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 6)} >
                                <img src={ProductImage7} alt="product"></img>
                            </a>
                        </div>
                        <div className="product-photo-collection-icon-div">
                            <a className="product-photo-collection-icon" href="#!"
                                onClick={ e => moveToProductImage(e, productCarouselInstance, 7)} >
                                <img src={ProductImage8} alt="product"></img>
                            </a>
                        </div>
                    </div>

                    <div className="product-photo-collection-next-btn-div">
                        <p className="product-photo-collection-next-para">
                            <a className="product-photo-collection-next-btn" href="#!" onClick={e => slideDown(e, productIconCount, currentProductIconCount, setCurrentProductIconCount)}>
                                <i className="material-icons">expand_more</i>
                            </a>
                        </p>
                    </div>

                </div>
            </div>
            <div className="col s12 m12 l6">
                <div className="row">
                    <div className="col s12">
                        <div className="col s12">
                            <p><span className="product-pricing red-text text-lighten-2">Rs. 2000</span></p>
                        </div>
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12 m6 l6">
                                    <i className="material-icons prefix">view_carousel</i>
                                    <select defaultValue="Variant Not Selected" id="variant-select">
                                        <option value="Variant Not Selected" disabled>Variant</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </select>
                                </div>
                                <div className="col s12 m6 l6 input-field">
                                    <i className="material-icons prefix">view_week</i>
                                    <input id="quantity" type="number" min={1}/>
                                    <label htmlFor="quantity">Quantity</label>
                                </div>
                            </div>
                            <div className="input-field col s12 m6 l6 center-align">
                                <button className="btn waves-effect waves-light teal darken-3 wishlist-btn">
                                    <i className="material-icons">favorite_border</i>
                                    Add to Whishlist
                                </button>
                            </div>
                            <div className="input-field col s12 m6 l6 center-align">
                                <button className="btn waves-effect waves-light teal darken-3 cart-btn">
                                    <i className="material-icons">shopping_cart</i>
                                    Add to Cart
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;