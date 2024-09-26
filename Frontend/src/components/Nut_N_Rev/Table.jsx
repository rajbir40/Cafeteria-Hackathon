import React from "react";

function Table({Nutrients}) {
  return (
    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto mt-16">
      <table className="w-full text-sm leading-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-medium text-gray-600">
              Nutrient
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-600">
              Amount per Serving (100g)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 px-4 text-left font-medium text-gray-600">
              Calories
            </td>
            <td className="py-3 px-4 text-left">{
              Nutrients ? (<>
              {Nutrients.calories}
              </>) : (<>No Data Available</>)
              }</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-3 px-4 text-left font-medium text-gray-600">
              Total Fat
            </td>
            <td className="py-3 px-4 text-left">{
              Nutrients ? (<>
              {Nutrients.fat}
              </>) : (<>No Data Available</>)
              }</td>
          </tr>
          
          
          <tr>
            <td className="py-3 px-4 text-left font-medium text-gray-600">
              Cholesterol
            </td>
            <td className="py-3 px-4 text-left">{
              Nutrients ? (<>
              {Nutrients.cholestrol}
              </>) : (<>No Data Available</>)
              }</td>
          </tr>
          
          <tr>
            <td className="py-3 px-4 text-left font-medium text-gray-600">
              Total Carbohydrate
            </td>
            <td className="py-3 px-4 text-left">{
              Nutrients ? (<>
              {Nutrients.carbohydrates}
              </>) : (<>No Data Available</>)
              }</td>
          </tr>
          
          
          <tr className="bg-gray-50">
            <td className="py-3 px-4 text-left font-medium text-gray-600">
              Protein
            </td>
            <td className="py-3 px-4 text-left">{
              Nutrients ? (<>
              {Nutrients.protein}
              </>) : (<>No Data Available</>)
              }</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
