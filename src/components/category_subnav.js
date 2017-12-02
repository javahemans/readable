import React from 'react';
import { Link } from 'react-router-dom';


const CategorySubnav = (props) => {

  // console.log(props);

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