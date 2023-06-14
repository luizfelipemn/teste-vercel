import styles from "./ButtonGreen.css"

var container = document.getElementById( "root" );

function ButtonGreen ( props )
{
    return (
        <>
            <button className="buttonGreen">
                <span>
                    { props.content }
                </span>
            </button>
        </>
    )
}

ReactDOM.createRoot( container ).render( <ButtonGreen content ="qualquercoisa" /> );