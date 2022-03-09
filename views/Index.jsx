const React = require('react')
class Index extends React.Component{
    render() {
        return (
            <div>
                <h1>Fruits Index Page</h1>
                <ul>
                    {
                        this.props.fruits.map((fruit, i) => {
                            return (
                                <li key = {i}>
                                    The <a href={`/fruits/${ fruit.id }`}> { fruit.name } </a> is { fruit.color }.
                                    { fruit.readyToEat ? <span>It is ready to eat</span> : <span>It is not ready to eat</span>}
                                    {/* Delete here */}
                                    <form action = {`/fruits/${fruit._id}?_method=DELETE`} method = "POST">
                                        <input type = "submit" value = "DELETE"/>
                                    </form>
                                </li>
                            )
                        })
                    }
                </ul>
                <nav>
                    <a href="/fruits/new">Create a New Fruit</a>
                </nav>
            </div>
        )
    }
}

module.exports = Index