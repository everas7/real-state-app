import Sequelize from 'sequelize';
const wkx = require('wkx');

export function sequelizeGeoFix() {
  Sequelize.GEOMETRY.prototype._stringify = function _stringify(
    value: any,
    options: { escape: (arg0: any) => any }
  ) {
    return `ST_GeomFromText(${options.escape(
      wkx.Geometry.parseGeoJSON(value).toWkt()
    )})`;
  };
  Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(
    value: any,
    options: { bindParam: (arg0: any) => any }
  ) {
    return `ST_GeomFromText(${options.bindParam(
      wkx.Geometry.parseGeoJSON(value).toWkt()
    )})`;
  };
  Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(
    value: any,
    options: { escape: (arg0: any) => any }
  ) {
    return `ST_GeomFromText(${options.escape(
      wkx.Geometry.parseGeoJSON(value).toWkt()
    )})`;
  };
  Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(
    value: any,
    options: { bindParam: (arg0: any) => any }
  ) {
    return `ST_GeomFromText(${options.bindParam(
      wkx.Geometry.parseGeoJSON(value).toWkt()
    )})`;
  };
}
