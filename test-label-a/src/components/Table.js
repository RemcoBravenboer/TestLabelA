import React, {Component} from 'react';
import Axios from 'axios/index';
import endpoints from "../endpoints";
import tableStyle from '../css/Table.module.css'
import Spinner from "./Spinner";
import Swal from 'sweetalert2'

class Table extends Component {
    state = {
        category: this.props.category,
        data: null,
        searchTerm: null,
        searchResult: [],
        savedData: null,
        cellIndex: null
    };

    /* Call the method to get data by category on mount */
    componentDidMount() {
        this.getData(this.state.category);
    }

    /* Whenever a new category is selected, catch it here and set it to the state */
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({category: nextProps.category});
        this.getData(nextProps.category);
    }


    /* Renders the table header */
    renderTableHeader = () => {
        const header = Object.keys(this.state.data[0]);
        return header.map((index, key) => {
            return <th key={key} onClick={this.sortTable.bind(this)}>{index.toUpperCase()
                .replace(/_/g, " ")}</th>
        })
    };

    /* Renders the table rows */
    renderTable = () => {
        return this.state.data.map((values, index) => {
            return (
                <tr key={index}>
                    {
                        Object.values(values).map((value, id) => {
                            return (
                                <td key={id}>{value}</td>
                            )
                        })
                    }
                </tr>
            )
        })
    };

    /* Retrieves data for the selected category */
    getData = (category) => {
        this.setState({data: null});
        Axios.get(endpoints.getCategory(category))
            .then(res => {
                    this.setState({data: res.data.results}, () => {
                        this.setState({savedData: this.state.data})
                    });
                    document.getElementById('dataTable').scrollIntoView();
                }
            );

    };

    /* Saves the search term on each change of the input field */
    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
    };

    /* Prevents default submission and calls the filter function */
    formSubmit = (e) => {
        e.preventDefault();
        this.setState({data: this.state.savedData}, () => {
            this.findObjectByLabel(this.state.data, this.state.searchTerm)
        })
    };

    /*
    The function that provides our filter functionality.
    It stringify's the object and pushes it to searchResult if it matches the label
    */
    findObjectByLabel = (obj, label) => {
        this.setState({searchResult: []});

        Object.values(obj).map((val) => {
            if(JSON.stringify(val).includes(label)) {
                this.state.searchResult.push(val)
            }
        });

        if(this.state.searchResult.length === 0) {
            document.getElementById("searchForm").reset();
            Swal.fire({
                title: 'No results found',
                text: 'Please try a different search query.',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        } else {
            this.setState({data: this.state.searchResult})
        }
    };

    sortTable = (e) => {
        this.setState({cellIndex: e.target.cellIndex}, () =>
            this.setState({data: this.state.data.sort(this.compare)}))
    };

    /* Comparator used for the sorting method */
    compare = (a, b) => {
        const selectedIndex = this.state.cellIndex;
        const valA = Object.values(a)[selectedIndex];
        const valB = Object.values(b)[selectedIndex];

        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        } else if (valA < valB) {
            comparison = -1;
        }
        return comparison;
    };

    render() {
        return (
            <div>
                <h1 className={tableStyle.alignCenter}>
                    {this.props.category.charAt(0).toUpperCase()
                    + this.props.category.slice(1)}
                </h1>
                {this.state.data ?
                    <div>
                        <div className={tableStyle.alignCenter}>
                            <form id="searchForm"
                                  onSubmit={this.formSubmit}>
                                <input type="text"
                                       placeholder="Enter a search term.."
                                       name="search"
                                       onChange={this.handleChange}/>
                                <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                            <h2>Click on a header to sort a-z</h2>
                        </div>

                        <table id="dataTable" className={tableStyle.table}>
                            <tbody>
                            <tr>
                                {this.renderTableHeader()}
                            </tr>
                            {this.renderTable()}
                            </tbody>
                        </table>
                    </div> : <Spinner/> }
            </div>
        );
    }
}

export default Table;