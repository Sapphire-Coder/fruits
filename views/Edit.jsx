const React = require('react')

// using the default layout
const DefaultLayout = require('./layout/Default')

class Edit extends React.Component {
    render() {
        return (
            <DefaultLayout title = "Edit Page">
                <link rel="stylesheet" href="/css/app.css"/>
                {/* Layout tag takes property 'title' we pass title to it, also note that comments cannot be first or last in jsx files */}
                {/* form here */}
                <form action = {`/fruits/${this.props.fruit._id}?_method=PUT`} method = "POST">
                    Name: <input type = "text" name = "name" defaultValue = {this.props.fruit.name}/><br/>
                    Color: <input type = "text" name = "color" defaultValue = {this.props.fruit.color}/><br/>
                    Is Ready To Eat: {this.props.fruit.readyToEat? <input type = "checkbox" name = "readyToEat" defaultChecked/>: <input type = "checkbox" name = "readyToEat"/>}<br/>
                    <input type = "submit" value = "Submit Changes"/>
                </form>
            </DefaultLayout>
        )
    }
}
module.exports = Edit