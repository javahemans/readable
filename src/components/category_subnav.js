import React from 'react';
import { Link } from 'react-router-dom';

const CategorySubnav = (props) => {

  // console.log(props);

  // If this code is missing - When I reload from the URL direct, eg: /posts/postID I'll get an error
  // If I put something like "Loading" here, I'll end up with both the view and that
  // message?

  if(!props.categories) {
    return null;
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