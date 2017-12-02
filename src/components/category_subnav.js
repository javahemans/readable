import React from 'react';
import { Link } from 'react-router-dom';

const CategorySubnav = (props) => {

  if(!props.categories) {
    return(
      <div className="container has-text-centered">
        <h1>LOADING NAV</h1>
      </div>
    )
  }

  return (
    <section>
      <div className="container">
        <nav className="level">
          <div className="level-item has-text-centered">
            <p className="level-item tag is-primary"><Link to="/">ALL</Link></p>
          </div>
        {props.categories.map(cat => {
          return (
            <div key={cat.path} className="level-item has-text-centered">
              <div className="level-item tag is-light"><Link to={`/category/${cat.path}`}>{cat.name}</Link></div>
            </div>
          )
        })}
        </nav>
        <hr />
      </div>
    </section>  
  );
}

export default CategorySubnav;