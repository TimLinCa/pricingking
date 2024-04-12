import ProductList from "../../components/ProductList";
import axios from "axios";


export default function SearchPage({ params, searchParams }) {
    console.log(searchParams);
    const wb = searchParams['wb'];
    const productName = searchParams['q'];
    const isRating = searchParams['ir'];
    const isReviews = searchParams['ire'];
    const rating = searchParams['r'];
    const reviews = searchParams['res'];
    const sortByOption = searchParams['sort'];

    return (

        <div className=" m-8">
            {
                <ProductList
                    wb={wb}
                    productName={productName}
                    isRating={isRating}
                    isReviews={isReviews}
                    rating={rating}
                    reviews={reviews}
                    sortByOption={sortByOption} />
            }
        </div>

    );
}

const productListFetcher = async (params) => {
    const { wb, productName, isRating, rating, isReviews, reviews, sortByOption } = params;

    const AmazonAPI = "/api/searchAmazon";
    const WalmartAPI = "/api/searchWalmart";
    console.log(sortByOption);
    const request = {
        "productName": productName,
        "sortByOption": sortByOption,
    }


    console.log(isReviews);
    console.log(isRating);
    if (isRating === 'true') {
        request.rating = rating;
    }

    if (isReviews === 'true') {
        request.reviews = reviews;
    }

    console.log(request);
    let AmazonProductList = null;
    let WalmartProductList = null;
    if (wb.includes('Amazon')) {
        const amazon_res = await axios.post(AmazonAPI, request);
        AmazonProductList = amazon_res.data;
    }

    if (wb.includes('Walmart')) {
        const walmart_res = await axios.post(WalmartAPI, request);
        WalmartProductList = walmart_res.data;
    }

    //concat two lists
    let productList = null;
    if (AmazonProductList && WalmartProductList) {
        productList = AmazonProductList.concat(WalmartProductList);
    }
    else if (AmazonProductList) {
        productList = AmazonProductList;
    }
    else if (WalmartProductList) {
        productList = WalmartProductList;
    }
    return productList;
}