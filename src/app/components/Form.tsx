/** LOOK ON SLIDES AND FIGURE OUT HOW PATH WORKS */
import styles from './Form.module.css';

export default function Form() {
    return (
        <div className="form-container">
          <h2 className="form-title">Add a New Item</h2>
          <input type="text" className="form-input" placeholder="Item Name" />
          <input type="text" className="form-input" placeholder="Item Description" />
          <input type="number" className="form-input" placeholder="Price" />
          <button className="form-button">Submit</button>
        </div>
      );
}