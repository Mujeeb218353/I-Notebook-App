import React from 'react';
function Alert(props) {
    const capitalize = (word) => {
        if(word=== 'danger'){
            word = 'Error';
        }
        let newText1 = word.toLowerCase();
        return newText1.charAt(0).toUpperCase()+ newText1.slice(1);
    }
    const hideParent = () => {
        const parentElement = document.getElementById('parentElement');
        if (parentElement) {
            parentElement.style.display = 'none';
        }
    }
    return (
        <div style={ {height: '45px'} } className={'my-4 mx-5'}>
            {props.alert && (
                <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert" style={{backgroundColor:props.mode==='dark'?'#31577a':'#FFF3CD'}} id='parentElement'>
                    <strong>{capitalize(props.alert.typ)}</strong>: {props.alert.msg}
                    <button type="button" className="btn-close" onClick={hideParent} aria-label="Close"></button>
                </div>
            )}
        </div>
    );
}
export default Alert;