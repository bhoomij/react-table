import React, { Component } from 'react';
// import Griddle from 'griddle-react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch('http://starlord.hackerearth.com/gamesarena')
            .then(res => res.json())
            .then(data => {
                //remove first entry
                data.shift();
                console.log(data[1])
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    renderGames() {
        if (this.state.data) {
            const styleConfig = {
                icons: {
                  TableHeadingCell: {
                    sortDescendingIcon:  <span>&nbsp; <i class="fa fa-sort-desc" aria-hidden="true"></i></span>,
                    sortAscendingIcon:   <span>&nbsp; <i class="fa fa-sort-asc" aria-hidden="true"></i></span>,
                  },
                },
                classNames: {
                  Table: 'table table-dark table-hover'
                },
                styles: {
                  Filter: { fontSize: 14 },
                }
            };

            return (
                    <Griddle
                        styleConfig={styleConfig}
                        data={this.state.data}
                        plugins={[plugins.LocalPlugin]}
                        components={{
                            SettingsToggle: () => <span />,
                        }}
                        pageProperties={{
                            currentPage: 1,
                            pageSize: 5,
                            recordCount: 100,
                        }}
                    >
                        <RowDefinition>
                            <ColumnDefinition id="title" title="Title" width={300} />
                            <ColumnDefinition id="platform" title="Platform" width={200} />
                            <ColumnDefinition id="score" title="Score" width={150} />
                            <ColumnDefinition id="genre" title="Genre" width={150} />
                            <ColumnDefinition id="editors_choice" title="Editors Choice" width={100} />
                        </RowDefinition>
                    </Griddle>
            );
        }

        return <div>Loading...</div>;
    }

    render() {
        return (
            <div className="container">
                <h3 className="header">Welcome to Gaming Zone!!</h3>
                {this.renderGames()}
            </div>
        );
    }
}

export default Dashboard;