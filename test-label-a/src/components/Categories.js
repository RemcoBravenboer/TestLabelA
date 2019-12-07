import React, {Component} from 'react';
import Axios from 'axios/index'
import endpoints from '../endpoints'
import categoryStyle from '../css/Categories.module.css'
import Table from "./Table";
import Spinner from "./Spinner";

class Categories extends Component {
    state = {
        categories: [],
        isLoaded: false,
        selectedCategory: null,
        data: null
    }

    /* After component mounts, retrieve the categories */
    componentDidMount() {
        Axios.get(endpoints.getAllCategories())
            .then(res => {
                    let categories = res.data;
                    /* Save keys instead of paths of categories */
                    categories = Object.keys(categories);
                    this.setState({categories: categories,
                        isLoaded: true});
                }
            );
    }

    /* Set selected category in state */
    setCategory = (category) => {
        this.setState({selectedCategory: category})
    };

    /* Get background image from category param */
    getBg = (val) =>
    {
        return {
            backgroundImage: 'url(./categoryImages/bg_' + val + '.png)'
        }
    }

    render() {
        return (
            <div>
                <h1 className={categoryStyle.alignCenter}>Pick a category</h1>
                <div>
                    { this.state.isLoaded ?
                        this.state.categories.map((value, index) => {
                            return <div className={categoryStyle.column}
                                        key={index}
                                        style={this.getBg(value)}
                                        onClick={() => {this.setCategory(value)}}>
                                {value.charAt(0).toUpperCase()
                                + value.slice(1)}
                            </div>
                        }) : <Spinner/> }
                </div>
                { this.state.selectedCategory ?
                    <Table category={this.state.selectedCategory} /> : null }

            </div>
        );
    }
}

export default Categories;