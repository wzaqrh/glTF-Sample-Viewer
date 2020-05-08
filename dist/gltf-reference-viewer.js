'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create() {
  var out = new ARRAY_TYPE(9);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create$1() {
  var out = new ARRAY_TYPE(16);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function multiply$1(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply$1;

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$2() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone$1(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create$2();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$3() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues$1(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize$1(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$1 = function () {
  var vec = create$3();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create$4() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues$2 = fromValues$1;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize$2 = normalize$1;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = create$2();
  var xUnitVec3 = fromValues(1, 0, 0);
  var yUnitVec3 = fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot$1 = dot(a, b);

    if (dot$1 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot$1 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot$1;
      return normalize$2(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create$4();
  var temp2 = create$4();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = create();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize$2(out, fromMat3(out, matr));
  };
}();

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create$5() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues$3(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$2 = function () {
  var vec = create$5();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var axios_min = createCommonjsModule(function (module, exports) {
/* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1);},function(e,t,n){function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a;},function(e,t,n){function r(e){return "[object Array]"===R.call(e)}function o(e){return "[object ArrayBuffer]"===R.call(e)}function i(e){return "undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return "string"==typeof e}function a(e){return "number"==typeof e}function c(e){return "undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return "[object Date]"===R.call(e)}function d(e){return "[object File]"===R.call(e)}function l(e){return "[object Blob]"===R.call(e)}function h(e){return "[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return "undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return ("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e);}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e;}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t;}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:v,merge:x,extend:b,trim:w};},function(e,t){e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}};},function(e,t){function n(e){return !!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return "function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)};},function(e,t,n){function r(e){this.defaults=e,this.interceptors={request:new s,response:new s};}var o=n(6),i=n(2),s=n(17),u=n(18);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected);}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected);});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))};}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))};}),e.exports=r;},function(e,t,n){function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t);}function o(){var e;return "undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e);}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={};}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u);}),e.exports=a;},function(e,t,n){var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r]);});};},function(e,t,n){var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w);}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null;}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null;},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null;},r.isStandardBrowserEnv()){var g=n(16),v=(e.withCredentials||u(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v);}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e);}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType;}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null);}),void 0===p&&(p=null),l.send(p);})};},function(e,t,n){var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n);};},function(e,t,n){var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)};},function(e,t){e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e};},function(e,t,n){function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e));}));}),i=s.join("&");}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e};},function(e,t,n){var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n;}}),s):s};},function(e,t,n){var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return !0}}();},function(e,t){function n(){this.message="String contains an invalid character";}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r;}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r;},function(e,t,n){var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return {write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ");},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5);}}}():function(){return {write:function(){},read:function(){return null},remove:function(){}}}();},function(e,t,n){function r(){this.handlers=[];}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null);},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t);});},e.exports=r;},function(e,t,n){function r(e){e.cancelToken&&e.cancelToken.throwIfRequested();}var o=n(2),i=n(19),s=n(20),u=n(6),a=n(21),c=n(22);e.exports=function(e){r(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t];});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})};},function(e,t,n){var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t);}),e};},function(e,t){e.exports=function(e){return !(!e||!e.__CANCEL__)};},function(e,t){e.exports=function(e){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)};},function(e,t){e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e};},function(e,t){function n(e){this.message=e;}n.prototype.toString=function(){return "Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n;},function(e,t,n){function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e;});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason));});}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t;});return {token:t,cancel:e}},e.exports=r;},function(e,t){e.exports=function(e){return function(t){return e.apply(null,t)}};}])});
});
var axios_min_1 = axios_min.axios;

class gltfWebGl
{
    constructor()
    {
        this.context = undefined;
    }

    loadWebGlExtensions(webglExtensions)
    {
        for (let extension of webglExtensions)
        {
            if (WebGl.context.getExtension(extension) === null)
            {
                console.warn("Extension " + extension + " not supported!");
            }
        }

        let EXT_texture_filter_anisotropic = WebGl.context.getExtension("EXT_texture_filter_anisotropic");

        if (EXT_texture_filter_anisotropic)
        {
            WebGl.context.anisotropy = EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT;
            WebGl.context.maxAnisotropy = WebGl.context.getParameter(EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            WebGl.context.supports_EXT_texture_filter_anisotropic = true;
        }
        else
        {
            WebGl.context.supports_EXT_texture_filter_anisotropic = false;
        }
    }

    setTexture(loc, gltf, textureInfo, texSlot)
    {
        if (loc === -1)
        {
            return false;
        }

        let gltfTex = gltf.textures[textureInfo.index];

        if (gltfTex === undefined)
        {
            console.warn("Texture is undefined: " + textureInfo.index);
            return false;
        }

        if (gltfTex.glTexture === undefined)
        {
            gltfTex.glTexture = WebGl.context.createTexture();
        }

        WebGl.context.activeTexture(WebGl.context.TEXTURE0 + texSlot);
        WebGl.context.bindTexture(gltfTex.type, gltfTex.glTexture);

        WebGl.context.uniform1i(loc, texSlot);

        if (!gltfTex.initialized)
        {
            const gltfSampler = gltf.samplers[gltfTex.sampler];

            if (gltfSampler === undefined)
            {
                console.warn("Sampler is undefined for texture: " + textureInfo.index);
                return false;
            }

            WebGl.context.pixelStorei(WebGl.context.UNPACK_FLIP_Y_WEBGL, false);

            let images = [];

            if (gltfTex.source.length !== undefined)
            {
                // assume we have an array of images (this is an unofficial extension to what glTF json can represent)
                images = gltfTex.source;
            }
            else
            {
                images = [gltfTex.source];
            }

            let generateMips = true;

            for (const src of images)
            {
                const image = gltf.images[src];

                if (image === undefined)
                {
                    console.warn("Image is undefined for texture: " + gltfTex.source);
                    return false;
                }

                if (image.type === WebGl.context.TEXTURE_CUBE_MAP)
                {
                    const ktxImage = image.image;

                    for (const level of ktxImage.levels)
                    {
                        let faceType = WebGl.context.TEXTURE_CUBE_MAP_POSITIVE_X;
                        for (const face of level.faces)
                        {
                            WebGl.context.texImage2D(faceType, level.miplevel, ktxImage.glInternalFormat, level.width, level.height, 0, ktxImage.glFormat, ktxImage.glType, face.data);

                            faceType++;
                        }
                    }
                }
                else
                {
                    WebGl.context.texImage2D(image.type, image.miplevel, WebGl.context.RGBA, WebGl.context.RGBA, WebGl.context.UNSIGNED_BYTE, image.image);
                }

                generateMips = image.shouldGenerateMips();
            }

            this.setSampler(gltfSampler, gltfTex.type, generateMips);

            if (textureInfo.generateMips && generateMips)
            {
                // Until this point, images can be assumed to be power of two.
                switch (gltfSampler.minFilter)
                {
                case WebGl.context.NEAREST_MIPMAP_NEAREST:
                case WebGl.context.NEAREST_MIPMAP_LINEAR:
                case WebGl.context.LINEAR_MIPMAP_NEAREST:
                case WebGl.context.LINEAR_MIPMAP_LINEAR:
                    WebGl.context.generateMipmap(gltfTex.type);
                    break;
                }
            }

            gltfTex.initialized = true;
        }

        return gltfTex.initialized;
    }

    setIndices(gltf, accessorIndex)
    {
        let gltfAccessor = gltf.accessors[accessorIndex];

        if (gltfAccessor.glBuffer === undefined)
        {
            gltfAccessor.glBuffer = WebGl.context.createBuffer();

            let data = gltfAccessor.getTypedView(gltf);

            if (data === undefined)
            {
                return false;
            }

            WebGl.context.bindBuffer(WebGl.context.ELEMENT_ARRAY_BUFFER, gltfAccessor.glBuffer);
            WebGl.context.bufferData(WebGl.context.ELEMENT_ARRAY_BUFFER, data, WebGl.context.STATIC_DRAW);
        }
        else
        {
            WebGl.context.bindBuffer(WebGl.context.ELEMENT_ARRAY_BUFFER, gltfAccessor.glBuffer);
        }

        return true;
    }

    enableAttribute(gltf, attributeLocation, gltfAccessor)
    {
        if (attributeLocation === -1)
        {
            console.warn("Tried to access unknown attribute");
            return false;
        }

        let gltfBufferView = gltf.bufferViews[gltfAccessor.bufferView];

        if (gltfAccessor.glBuffer === undefined)
        {
            gltfAccessor.glBuffer = WebGl.context.createBuffer();

            let data = gltfAccessor.getTypedView(gltf);

            if (data === undefined)
            {
                return false;
            }

            WebGl.context.bindBuffer(WebGl.context.ARRAY_BUFFER, gltfAccessor.glBuffer);
            WebGl.context.bufferData(WebGl.context.ARRAY_BUFFER, data, WebGl.context.STATIC_DRAW);
        }
        else
        {
            WebGl.context.bindBuffer(WebGl.context.ARRAY_BUFFER, gltfAccessor.glBuffer);
        }

        WebGl.context.vertexAttribPointer(attributeLocation, gltfAccessor.getComponentCount(gltfAccessor.type), gltfAccessor.componentType, gltfAccessor.normalized, gltfBufferView.byteStride, 0);
        WebGl.context.enableVertexAttribArray(attributeLocation);

        return true;
    }

    compileShader(shaderIdentifier, isVert, shaderSource)
    {
        const shader = WebGl.context.createShader(isVert ? WebGl.context.VERTEX_SHADER : WebGl.context.FRAGMENT_SHADER);
        WebGl.context.shaderSource(shader, shaderSource);
        WebGl.context.compileShader(shader);
        const compiled = WebGl.context.getShaderParameter(shader, WebGl.context.COMPILE_STATUS);

        if (!compiled)
        {
            // output surrounding source code
            let info = "";
            const messages = WebGl.context.getShaderInfoLog(shader).split("\n");
            for(const message of messages)
            {
                info += message + "\n";
                const matches = message.match(/(?:(?:WARNING)|(?:ERROR)): [0-9]*:([0-9]*).*/i);
                if (matches && matches.length > 1)
                {
                    const lineNumber = parseInt(matches[1]) - 1;
                    const lines = shaderSource.split("\n");

                    for(let i = Math.max(0, lineNumber - 2); i < Math.min(lines.length, lineNumber + 3); i++)
                    {
                        if (lineNumber === i)
                        {
                            info += "->";
                        }
                        info += "\t" + lines[i] + "\n";
                    }
                }
            }

            throw new Error("Could not compile WebGL program '" + shaderIdentifier + "'. \n\n" + info);
        }

        return shader;
    }

    linkProgram(vertex, fragment)
    {
        let program = WebGl.context.createProgram();
        WebGl.context.attachShader(program, vertex);
        WebGl.context.attachShader(program, fragment);
        WebGl.context.linkProgram(program);

        if (!WebGl.context.getProgramParameter(program, WebGl.context.LINK_STATUS))
        {
            var info = WebGl.context.getProgramInfoLog(program);
            throw new Error('Could not link WebGL program. \n\n' + info);
        }

        return program;
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
    setSampler(gltfSamplerObj, type, generateMipmaps) // TEXTURE_2D
    {
        if (generateMipmaps)
        {
            WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_S, gltfSamplerObj.wrapS);
            WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_T, gltfSamplerObj.wrapT);
        }
        else
        {
            WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_S, WebGl.context.CLAMP_TO_EDGE);
            WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_T, WebGl.context.CLAMP_TO_EDGE);
        }

        // If not mip-mapped, force to non-mip-mapped sampler.
        if (!generateMipmaps && (gltfSamplerObj.minFilter != WebGl.context.NEAREST) && (gltfSamplerObj.minFilter != WebGl.context.LINEAR))
        {
            if ((gltfSamplerObj.minFilter == WebGl.context.NEAREST_MIPMAP_NEAREST) || (gltfSamplerObj.minFilter == WebGl.context.NEAREST_MIPMAP_LINEAR))
            {
                WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MIN_FILTER, WebGl.context.NEAREST);
            }
            else
            {
                WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MIN_FILTER, WebGl.context.LINEAR);
            }
        }
        else
        {
            WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MIN_FILTER, gltfSamplerObj.minFilter);
        }
        WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MAG_FILTER, gltfSamplerObj.magFilter);

        if (WebGl.context.supports_EXT_texture_filter_anisotropic)
        {
            WebGl.context.texParameterf(type, WebGl.context.anisotropy, WebGl.context.maxAnisotropy); // => 16xAF
        }
    }
}

const WebGl = new gltfWebGl();

function jsToGl(array)
{
    let tensor = new ARRAY_TYPE(array.length);

    for (let i = 0; i < array.length; ++i)
    {
        tensor[i] = array[i];
    }

    return tensor;
}

function jsToGlSlice(array, offset, stride)
{
    let tensor = new ARRAY_TYPE(stride);

    for (let i = 0; i < stride; ++i)
    {
        tensor[i] = array[offset + i];
    }

    return tensor;
}

function initGlForMembers(gltfObj, gltf)
{
    for (const name of Object.keys(gltfObj))
    {
        const member = gltfObj[name];

        if (member === undefined)
        {
            continue;
        }
        if (member.initGl !== undefined)
        {
            member.initGl(gltf);
        }
        if (Array.isArray(member))
        {
            for (const element of member)
            {
                if (element !== null && element !== undefined && element.initGl !== undefined)
                {
                    element.initGl(gltf);
                }
            }
        }
    }
}

function objectsFromJsons(jsonObjects, GltfType)
{
    if (jsonObjects === undefined)
    {
        return [];
    }

    const objects = [];
    for (const jsonObject of jsonObjects)
    {
        objects.push(objectFromJson(jsonObject, GltfType));
    }
    return objects;
}

function objectFromJson(jsonObject, GltfType)
{
    const object = new GltfType();
    object.fromJson(jsonObject);
    return object;
}

function fromKeys(target, jsonObj, ignore = [])
{
    for(let k of Object.keys(target))
    {
        if (ignore && ignore.find(function(elem){return elem == k;}) !== undefined)
        {
            continue; // skip
        }
        if (jsonObj[k] !== undefined)
        {
            target[k] = jsonObj[k];
        }
    }
}

function stringHash(str, seed = 0)
{
    for(var i = 0; i < str.length; ++i)
    {
        seed = Math.imul(31, seed) + str.charCodeAt(i) | 0;
    }

    return seed;
}

function combineHashes(hash1, hash2)
{
    return hash1 ^ (hash1 + 0x9e3779b9 + (hash2 << 6) + (hash2 >> 2));
}

function clamp(number, min, max)
{
    return Math.min(Math.max(number, min), max);
}

function getIsGlb(filename)
{
    return getExtension(filename) == "glb";
}

function getIsGltf(filename)
{
    return getExtension(filename) == "gltf";
}

function getExtension(filename)
{
    const split = filename.toLowerCase().split(".");
    if (split.length == 1)
    {
        return undefined;
    }
    return split[split.length - 1];
}

function getFileName(filePath)
{
    const split = filePath.split("/");
    return split[split.length - 1];
}

function getFileNameWithoutExtension(filePath)
{
    const filename = getFileName(filePath);
    const index = filename.lastIndexOf(".");
    return filename.slice(0, index);
}

function getContainingFolder(filePath)
{
    return filePath.substring(0, filePath.lastIndexOf("/") + 1);
}

function combinePaths()
{
    const parts = Array.from(arguments);
    return parts.join("/");
}

// marker interface used to for parsing the uniforms
class UniformStruct { }

class Timer
{
    constructor()
    {
        this.startTime = undefined;
        this.endTime = undefined;
        this.seconds = undefined;
    }

    start()
    {
        this.startTime = new Date().getTime() / 1000;
        this.endTime = undefined;
        this.seconds = undefined;
    }

    stop()
    {
        this.endTime = new Date().getTime() / 1000;
        this.seconds = this.endTime - this.startTime;
    }
}

class AnimationTimer
{
    constructor()
    {
        this.startTime = 0;
        this.paused = true;
        this.fixedTime = null;
        this.pausedTime = 0;
    }

    elapsedSec()
    {
        if(this.paused)
        {
            return this.pausedTime / 1000;
        }
        else
        {
            return this.fixedTime || (new Date().getTime() - this.startTime) / 1000;
        }
    }

    toggle()
    {
        if(this.paused)
        {
            this.unpause();
        }
        else
        {
            this.pause();
        }
    }

    start()
    {
        this.startTime = new Date().getTime();
        this.paused = false;
    }

    pause()
    {
        this.pausedTime = new Date().getTime() - this.startTime;
        this.paused = true;
    }

    unpause()
    {
        this.startTime += new Date().getTime() - this.startTime - this.pausedTime;
        this.paused = false;
    }

    reset()
    {
        if(!this.paused) {
            // Animation is running.
            this.startTime = new Date().getTime();
        }
        else {
            this.startTime = 0;
        }
        this.pausedTime = 0;
    }

    setFixedTime(timeInSec)
    {
        this.paused = false;
        this.fixedTime = timeInSec;
    }
}

// base class for all gltf objects
class GltfObject
{
    constructor()
    {
        this.extensions = undefined;
        this.extras = undefined;
    }

    fromJson(json)
    {
        fromKeys(this, json);
    }

    initGl(gltf)
    {
        initGlForMembers(this, gltf);
    }
}

class gltfAccessor extends GltfObject
{
    constructor()
    {
        super();
        this.bufferView = undefined;
        this.byteOffset = 0;
        this.componentType = undefined;
        this.normalized = false;
        this.count = undefined;
        this.type = undefined;
        this.max = undefined;
        this.min = undefined;
        this.sparse = undefined;
        this.name = undefined;

        // non gltf
        this.glBuffer = undefined;
        this.typedView = undefined;
        this.filteredView = undefined;
    }

    getTypedView(gltf)
    {
        if (this.typedView !== undefined)
        {
            return this.typedView;
        }

        if (this.bufferView !== undefined)
        {
            const bufferView = gltf.bufferViews[this.bufferView];
            const buffer = gltf.buffers[bufferView.buffer];
            const byteOffset = this.byteOffset + bufferView.byteOffset;

            const componentSize = this.getComponentSize(this.componentType);
            let componentCount = this.getComponentCount(this.type);

            if(bufferView.byteStride !== 0)
            {
                componentCount = bufferView.byteStride / componentSize;
            }

            const arrayLength = this.count * componentCount;

            switch (this.componentType)
            {
            case WebGl.context.BYTE:
                this.typedView = new Int8Array(buffer.buffer, byteOffset, arrayLength);
                break;
            case WebGl.context.UNSIGNED_BYTE:
                this.typedView = new Uint8Array(buffer.buffer, byteOffset, arrayLength);
                break;
            case WebGl.context.SHORT:
                this.typedView = new Int16Array(buffer.buffer, byteOffset, arrayLength);
                break;
            case WebGl.context.UNSIGNED_SHORT:
                this.typedView = new Uint16Array(buffer.buffer, byteOffset, arrayLength);
                break;
            case WebGl.context.UNSIGNED_INT:
                this.typedView = new Uint32Array(buffer.buffer, byteOffset, arrayLength);
                break;
            case WebGl.context.FLOAT:
                this.typedView = new Float32Array(buffer.buffer, byteOffset, arrayLength);
                break;
            }
        }

        if (this.typedView === undefined)
        {
            console.warn("Failed to convert buffer view to typed view!: " + this.bufferView);
        }
        else if (this.sparse !== undefined)
        {
            this.applySparse(gltf, this.typedView);
        }

        return this.typedView;
    }

    getDeinterlacedView(gltf)
    {
        if (this.filteredView !== undefined)
        {
            return this.filteredView;
        }

        if (this.bufferView !== undefined)
        {
            const bufferView = gltf.bufferViews[this.bufferView];
            const buffer = gltf.buffers[bufferView.buffer];
            const byteOffset = this.byteOffset + bufferView.byteOffset;

            const componentSize = this.getComponentSize(this.componentType);
            const componentCount = this.getComponentCount(this.type);
            const arrayLength = this.count * componentCount;

            let stride = bufferView.byteStride !== 0 ? bufferView.byteStride : componentCount * componentSize;
            let dv = new DataView(buffer.buffer, byteOffset, this.count * stride);

            let func = 'getFloat32';
            switch (this.componentType)
            {
            case WebGl.context.BYTE:
                this.filteredView = new Int8Array(arrayLength);
                func = 'getInt8';
                break;
            case WebGl.context.UNSIGNED_BYTE:
                this.filteredView = new Uint8Array(arrayLength);
                func = 'getUint8';
                break;
            case WebGl.context.SHORT:
                this.filteredView = new Int16Array(arrayLength);
                func = 'getInt16';
                break;
            case WebGl.context.UNSIGNED_SHORT:
                this.filteredView = new Uint16Array(arrayLength);
                func = 'getUint16';
                break;
            case WebGl.context.UNSIGNED_INT:
                this.filteredView = new Uint32Array(arrayLength);
                func = 'getUint32';
                break;
            case WebGl.context.FLOAT:
                this.filteredView = new Float32Array(arrayLength);
                func = 'getFloat32';
                break;
            }

            for(let i = 0; i < arrayLength; ++i)
            {
                let offset = Math.floor(i/componentCount) * stride + (i % componentCount) * componentSize;
                this.filteredView[i] = dv[func](offset, true);
            }
        }

        if (this.filteredView === undefined)
        {
            console.warn("Failed to convert buffer view to filtered view!: " + this.bufferView);
        }
        else if (this.sparse !== undefined)
        {
            this.applySparse(gltf, this.filteredView);
        }

        return this.filteredView;
    }

    applySparse(gltf, view)
    {
        // Gather indices.

        const indicesBufferView = gltf.bufferViews[this.sparse.indices.bufferView];
        const indicesBuffer = gltf.buffers[indicesBufferView.buffer];
        const indicesByteOffset = this.sparse.indices.byteOffset + indicesBufferView.byteOffset;

        const indicesComponentSize = this.getComponentSize(this.sparse.indices.componentType);
        let indicesComponentCount = 1;

        if(indicesBufferView.byteStride !== 0)
        {
            indicesComponentCount = indicesBufferView.byteStride / indicesComponentSize;
        }

        const indicesArrayLength = this.sparse.count * indicesComponentCount;

        let indicesTypedView;
        switch (this.sparse.indices.componentType)
        {
        case WebGl.context.UNSIGNED_BYTE:
            indicesTypedView = new Uint8Array(indicesBuffer.buffer, indicesByteOffset, indicesArrayLength);
            break;
        case WebGl.context.UNSIGNED_SHORT:
            indicesTypedView = new Uint16Array(indicesBuffer.buffer, indicesByteOffset, indicesArrayLength);
            break;
        case WebGl.context.UNSIGNED_INT:
            indicesTypedView = new Uint32Array(indicesBuffer.buffer, indicesByteOffset, indicesArrayLength);
            break;
        }

        // Gather values.

        const valuesBufferView = gltf.bufferViews[this.sparse.values.bufferView];
        const valuesBuffer = gltf.buffers[valuesBufferView.buffer];
        const valuesByteOffset = this.sparse.values.byteOffset + valuesBufferView.byteOffset;

        const valuesComponentSize = this.getComponentSize(this.componentType);
        let valuesComponentCount = this.getComponentCount(this.type);

        if(valuesBufferView.byteStride !== 0)
        {
            valuesComponentCount = valuesBufferView.byteStride / valuesComponentSize;
        }

        const valuesArrayLength = this.sparse.count * valuesComponentCount;

        let valuesTypedView;
        switch (this.componentType)
        {
        case WebGl.context.BYTE:
            valuesTypedView = new Int8Array(valuesBuffer.buffer, valuesByteOffset, valuesArrayLength);
            break;
        case WebGl.context.UNSIGNED_BYTE:
            valuesTypedView = new Uint8Array(valuesBuffer.buffer, valuesByteOffset, valuesArrayLength);
            break;
        case WebGl.context.SHORT:
            valuesTypedView = new Int16Array(valuesBuffer.buffer, valuesByteOffset, valuesArrayLength);
            break;
        case WebGl.context.UNSIGNED_SHORT:
            valuesTypedView = new Uint16Array(valuesBuffer.buffer, valuesByteOffset, valuesArrayLength);
            break;
        case WebGl.context.UNSIGNED_INT:
            valuesTypedView = new Uint32Array(valuesBuffer.buffer, valuesByteOffset, valuesArrayLength);
            break;
        case WebGl.context.FLOAT:
            valuesTypedView = new Float32Array(valuesBuffer.buffer, valuesByteOffset, valuesArrayLength);
            break;
        }

        // Overwrite values.

        for(let i = 0; i < this.sparse.count; ++i)
        {
            for(let k = 0; k < valuesComponentCount; ++k)
            {
                view[indicesTypedView[i] * valuesComponentCount + k] = valuesTypedView[i * valuesComponentCount + k];
            }
        }
    }

    getComponentCount(type)
    {
        return CompononentCount.get(type);
    }

    getComponentSize(componentType)
    {
        switch (componentType)
        {
        case WebGl.context.BYTE:
        case WebGl.context.UNSIGNED_BYTE:
            return 1;
        case WebGl.context.SHORT:
        case WebGl.context.UNSIGNED_SHORT:
            return 2;
        case WebGl.context.UNSIGNED_INT:
        case WebGl.context.FLOAT:
            return 4;
        default:
            return 0;
        }
    }

    destroy()
    {
        if (this.glBuffer !== undefined)
        {
            WebGl.context.deleteBuffer(this.glBuffer);
        }

        this.glBuffer = undefined;
    }
}

const CompononentCount = new Map(
    [
        ["SCALAR", 1],
        ["VEC2", 2],
        ["VEC3", 3],
        ["VEC4", 4],
        ["MAT2", 4],
        ["MAT3", 9],
        ["MAT4", 16]
    ]
);

class gltfBuffer extends GltfObject
{
    constructor()
    {
        super();
        this.uri = undefined;
        this.byteLength = undefined;
        this.name = undefined;

        // non gltf
        this.buffer = undefined; // raw data blob
    }

    load(gltf, additionalFiles = undefined)
    {
        if (this.buffer !== undefined)
        {
            console.error("buffer has already been loaded");
            return;
        }

        const self = this;
        return new Promise(function(resolve)
        {
            if (!self.setBufferFromFiles(additionalFiles, resolve) &&
                !self.sefBufferFromUri(gltf, resolve))
            {
                console.error("Was not able to resolve buffer with uri '%s'", self.uri);
                resolve();
            }
        });
    }

    sefBufferFromUri(gltf, callback)
    {
        if (this.uri === undefined)
        {
            return false;
        }

        const self = this;
        axios_min.get(getContainingFolder(gltf.path) + this.uri, { responseType: 'arraybuffer'})
            .then(function(response)
            {
                self.buffer = response.data;
                callback();
            });
        return true;
    }

    setBufferFromFiles(files, callback)
    {
        if (this.uri === undefined || files === undefined)
        {
            return false;
        }

        const foundFile = files.find(function(file)
        {
            if (file.name === this.uri || file.fullPath === this.uri)
            {
                return true;
            }
        }, this);

        if (foundFile === undefined)
        {
            return false;
        }

        const self = this;
        const reader = new FileReader();
        reader.onloadend = function(event)
        {
            self.buffer = event.target.result;
            callback();
        };
        reader.readAsArrayBuffer(foundFile);

        return true;
    }
}

class gltfBufferView extends GltfObject
{
    constructor()
    {
        super();
        this.buffer = undefined;
        this.byteOffset = 0;
        this.byteLength = undefined;
        this.byteStride = 0;
        this.target = undefined;
        this.name = undefined;
    }
}

class gltfCamera extends GltfObject
{
    constructor(
        type = "perspective",
        znear = 0.01,
        zfar = 10000.0,
        yfov = 45.0 * Math.PI / 180.0,
        aspectRatio = 16.0 / 9.0,
        xmag = 1.0,
        ymag = 1.0,
        name = undefined,
        nodeIndex = undefined)
    {
        super();
        this.type = type;
        this.znear = znear;
        this.zfar = zfar;
        this.yfov = yfov; // radians
        this.xmag = xmag;
        this.ymag = ymag;
        this.aspectRatio = aspectRatio;
        this.name = name;
        this.node = nodeIndex;
    }

    initGl(gltf)
    {
        super.initGl(gltf);

        let cameraIndex = undefined;
        for (let i = 0; i < gltf.nodes.length; i++)
        {
            cameraIndex = gltf.nodes[i].camera;
            if (cameraIndex === undefined)
            {
                continue;
            }

            if (gltf.cameras[cameraIndex] === this)
            {
                this.node = i;
                break;
            }
        }

        if(this.node === undefined)
        {
            console.error("Invalid node for camera " + cameraIndex);
        }
    }

    fromJson(jsonCamera)
    {
        this.name = name;
        if(jsonCamera.perspective !== undefined)
        {
            this.type = "perspective";
            fromKeys(this, jsonCamera.perspective);
        }
        else if(jsonCamera.orthographic !== undefined)
        {
            this.type = "orthographic";
            fromKeys(this, jsonCamera.orthographic);
        }
    }

    sortPrimitivesByDepth(gltf, nodes)
    {
        // Precompute the distances to avoid their computation during sorting.
        const sortedPrimitives = [];
        for (const node of nodes.filter(node => node.mesh !== undefined))
        {
            const modelView = create$1();
            multiply$1(modelView, this.getViewMatrix(gltf), node.worldTransform);

            for(const primitive of gltf.meshes[node.mesh].primitives)
            {
                // Transform primitive centroid to find the primitive's depth.
                const pos = transformMat4(create$2(), clone$1(primitive.centroid), modelView);

                sortedPrimitives.push({depth: pos[2], primitive, node});
            }
        }

        // 1. Remove primitives that are behind the camera.
        //    --> They will never be visible and it is cheap to discard them here.
        // 2. Sort primitives so that the furthest nodes are rendered first.
        //    This is required for correct transparency rendering.
        return sortedPrimitives
            .filter((a) => a.depth <= 0)
            .sort((a, b) => a.depth - b.depth);
    }

    getProjectionMatrix()
    {
        const projection = create$1();

        if (this.type === "perspective")
        {
            perspective(projection, this.yfov, this.aspectRatio, this.znear, this.zfar);
        }
        else if (this.type === "orthographic")
        {
            projection[0]  = 1.0 / this.xmag;
            projection[5]  = 1.0 / this.ymag;
            projection[10] = 2.0 / (this.znear - this.zfar);
            projection[14] = (this.zfar + this.znear) / (this.znear - this.zfar);
        }

        return projection;
    }

    getViewMatrix(gltf)
    {
        const view = create$1();
        const position = this.getPosition(gltf);
        const target = this.getLookAtTarget(gltf);
        lookAt(view, position, target, fromValues(0, 1, 0));
        return view;
    }

    getLookAtTarget(gltf)
    {
        const target = create$2();
        const position = this.getPosition(gltf);
        const lookDirection = this.getLookDirection(gltf);
        add(target, lookDirection, position);
        return target;
    }

    getPosition(gltf)
    {
        const position = create$2();
        const node = this.getNode(gltf);
        getTranslation(position, node.worldTransform);
        return position;
    }

    getLookDirection(gltf)
    {
        const direction = create$2();
        const rotation = this.getRotation(gltf);
        transformQuat(direction, fromValues(0, 0, -1), rotation);
        return direction;
    }

    getRotation(gltf)
    {
        const rotation = create$4();
        const node = this.getNode(gltf);
        getRotation(rotation, node.worldTransform);
        return rotation;
    }

    clone()
    {
        return new gltfCamera(
            this.type,
            this.znear,
            this.zfar,
            this.yfov,
            this.aspectRatio,
            this.xmag,
            this.ymag,
            this.name,
            this.node);
    }

    getNode(gltf)
    {
        return gltf.nodes[this.node];
    }
}

/**
 * hdrpng.js - Original code from Enki https://enkimute.github.io/hdrpng.js/
 * 
 * Refactored and simplified.
 */

function HDRImage() {
    var res = document.createElement('canvas'), HDRdata=null;
    res.__defineGetter__('dataFloat',function(){ return rgbeToFloat(HDRdata); });
    res.__defineGetter__('dataRGBE',function(){ return HDRdata; });
    res.__defineSetter__('src',function(val){
        if (val.match(/\.hdr$/i)) loadHDR(val,function(img, width, height) {
            HDRdata = img;
            this.width  = this.style.width  = width;
            this.height = this.style.height = height;
            this.onload && this.onload();
        }.bind(res));
    });
    return res;
}

function m(a,b) {
    for (var i in b) a[i]=b[i];
    return a;
}

/** 
 * Load and parse a Radiance .HDR file. It completes with a 32bit RGBE buffer.
 * @param {URL}      url        location of .HDR file to load.
 * @param {function} completion completion callback.
 * 
 * @returns {XMLHttpRequest}    the XMLHttpRequest used to download the file.
 */
function loadHDR(url, completion ) {
    var req = m(new XMLHttpRequest(),{responseType:"arraybuffer"});
    req.onerror = completion.bind(req,false);
    req.onload  = function() {
        if (this.status>=400) return this.onerror();
        var header='',pos=0,d8=new Uint8Array(this.response),format;
        // read header.
        while (!header.match(/\n\n[^\n]+\n/g)) header += String.fromCharCode(d8[pos++]);
        // check format.
        format = header.match(/FORMAT=(.*)$/m)[1];
        if (format!='32-bit_rle_rgbe') return console.warn('unknown format : '+format),this.onerror();
        // parse resolution
        var rez=header.split(/\n/).reverse()[1].split(' '), width=rez[3]*1, height=rez[1]*1;
        // Create image.
        var img=new Uint8Array(width*height*4),ipos=0;
        // Read all scanlines
        for (var j=0; j<height; j++) {
            var scanline = [];

            var rgbe = d8.slice(pos, pos+=4);
            const isNewRLE = (rgbe[0] == 2 && rgbe[1] == 2 && rgbe[2] == ((width >> 8) & 0xFF) && rgbe[3] == (width & 0xFF));

            if (isNewRLE && (width >= 8) && (width < 32768))
            {
                for (var i=0; i < 4; i++)
                {
                    var ptr = i*width, ptr_end = (i+1)*width, buf, count;
                    while (ptr<ptr_end)
                    {
                        buf = d8.slice(pos, pos+=2);
                        if (buf[0] > 128)
                        {
                            count = buf[0]-128;
                            while(count-- > 0) scanline[ptr++] = buf[1];
                        }
                        else
                        {
                            count = buf[0]-1;
                            scanline[ptr++]=buf[1];
                            while(count-- > 0) scanline[ptr++] = d8[pos++];
                        }
                    }
                }

                for (var i=0;i<width;i++)
                {
                    img[ipos++] = scanline[i+0*width];
                    img[ipos++] = scanline[i+1*width];
                    img[ipos++] = scanline[i+2*width];
                    img[ipos++] = scanline[i+3*width];
                }
            }
            else
            {
                pos -= 4;

                for (var i = 0; i < width; i++)
                {
                    rgbe = d8.slice(pos, pos += 4);

                    img[ipos++] = rgbe[0];
                    img[ipos++] = rgbe[1];
                    img[ipos++] = rgbe[2];
                    img[ipos++] = rgbe[3];
                }
            }
        }
        completion && completion(img,width,height);
    };
    req.open("GET",url,true);
    req.send(null);
    return req;
}

/** Convert a float buffer to a RGBE buffer.
  * @param {Float32Array} buffer Floating point input buffer (96 bits/pixel).
  * @param {Uint8Array}   [res]  Optional output buffer with 32 bit RGBE per pixel.
  * 
  * @returns {Uint8Array}        A 32bit uint8 array in RGBE
  */
function floatToRgbe(buffer, res) {
    var r,g,b,v,s,l=(buffer.byteLength/12)|0, res=res||new Uint8Array(l*4);
    for (var i=0; i<l; i++) {
        r = buffer[i*3];
        g = buffer[i*3+1];
        b = buffer[i*3+2];

        v = Math.max(Math.max(r,g),b);

        var e = Math.ceil(Math.log2(v));
        s = Math.pow(2,e-8);
        
        res[i*4]   = (r/s)|0;
        res[i*4+1] = (g/s)|0;
        res[i*4+2] = (b/s)|0;
        res[i*4+3] = (e+128);
    }
    return res;
}

/** Convert an RGBE buffer to a Float buffer.
  * @param {Uint8Array}     buffer The input buffer in RGBE format. (as returned from loadHDR)
  * @param {Float32Array}   [res]  Optional result buffer containing 3 floats per pixel.
  * 
  * @returns {Float32Array}        A floating point buffer with 96 bits per pixel (32 per channel, 3 channels).
  */
function rgbeToFloat(buffer, res) {
    var s,l=buffer.byteLength>>2, res=res||new Float32Array(l*3);
    for (var i=0; i<l; i++) {
        s = Math.pow(2,buffer[i*4+3]-(128+8));
        
        res[i*3]   = buffer[i*4]*s;
        res[i*3+1] = buffer[i*4+1]*s;
        res[i*3+2] = buffer[i*4+2]*s;
    }
    return res;
}

// Float/RGBE conversions.
HDRImage.floatToRgbe = floatToRgbe;
HDRImage.rgbeToFloat = rgbeToFloat;

// https://github.khronos.org/KTX-Specification

const VERSION = [ 0xAB, 0x4B, 0x54, 0x58, 0x20, 0x32, 0x30, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A ];
const VERSION_OFFSET = 0;
const VERSION_LENGTH = VERSION.length;
const HEADER_OFFSET = VERSION_OFFSET + VERSION_LENGTH;
const HEADER_LENGTH = 9 * 4; // 9 uint32s
const INDEX_OFFSET = HEADER_OFFSET + HEADER_LENGTH;
const INDEX_LENGTH = 4 * 4 + 2 * 8; // 4 uint32s and 2 uint64s
const LEVEL_INDEX_OFFSET = INDEX_OFFSET + INDEX_LENGTH;

class Ktx2Image
{
    constructor()
    {
        this.vkFormat = 0;
        this.typeSize = 0;
        this.width = 0;
        this.height = 0;
        this.pixelDepth = 0;
        this.layerCount = 0;
        this.faceCount = 0;
        this.levelCount = 0;
        this.supercompressionScheme = 0;

        this.dfdByteOffset = 0;
        this.dfdByteLength = 0;
        this.kvdByteOffset = 0;
        this.kvdByteLength = 0;
        this.sgdByteOffset = 0;
        this.sgdByteLength = 0;

        this.levels = [];

        // for usage in GL
        this.glInternalFormat = 0;
        this.glFormat = 0;
        this.glType = 0;

        this.onload = () => { };
        this.onerror = () => { };
    }

    initialize(arrayBuffer)
    {
        const version = new DataView(arrayBuffer, VERSION_OFFSET, VERSION_LENGTH);
        if (! this.checkVersion(version))
        {
            console.error("Invalid KTX2 version identifier");
            this.onerror();
            return;
        }

        const header = new DataView(arrayBuffer, HEADER_OFFSET, HEADER_LENGTH);
        this.parseHeader(header);

        const fileIndex = new DataView(arrayBuffer, INDEX_OFFSET, INDEX_LENGTH);
        this.parseIndex(fileIndex);

        const levelIndexLength = this.levelCount * 3 * 8; // 3 uint64s per level
        const levelIndex = new DataView(arrayBuffer, LEVEL_INDEX_OFFSET, levelIndexLength);
        this.parseLevelIndex(levelIndex);

        this.parseLevelData(arrayBuffer);

        this.onload();
    }

    checkVersion(version)
    {
        for (let i = 0; i < VERSION_LENGTH; i++)
        {
            if (version.getUint8(i) != VERSION[i])
            {
                return false;
            }
        }

        return true;
    }

    parseHeader(header)
    {
        let offset = 0;
        const getNext = () =>
        {
            const result = header.getUint32(offset, true);
            offset += 4;
            return result;
        };

        this.vkFormat = getNext();
        this.typeSize = getNext();
        this.width = getNext();
        this.height = getNext();
        this.pixelDepth = getNext();
        this.layerCount = getNext();
        this.faceCount = getNext();
        this.levelCount = getNext();
        this.supercompressionScheme = getNext();

        if (Object.values(VK_FORMAT).includes(this.vkFormat))
        {
            this.glInternalFormat = VK_TO_GL[this.vkFormat].glInternalFormat;
            this.glFormat = VK_TO_GL[this.vkFormat].glFormat;
            this.glType = VK_TO_GL[this.vkFormat].glType;
        }
        else
        {
            console.error("Unsupported vkFormat: " + this.vkFormat + ". Pixel data will not be parsed.");
        }
        if (this.supercompressionScheme > 0)
        {
            console.error("Supercompression currently not supported. Image data will not be parsed.");
        }
        if (this.layerCount > 0)
        {
            console.error("Layers currently not supported. Image data will not be parsed.");
        }
    }

    parseIndex(fileIndex)
    {
        let offset = 0;
        const getNext32 = () =>
        {
            const result = fileIndex.getUint32(offset, true);
            offset += 4;
            return result;
        };
        const getNext64 = () =>
        {
            const result = this.getUint64(fileIndex, offset, true);
            offset += 8;
            return result;
        };

        this.dfdByteOffset = getNext32();
        this.dfdByteLength = getNext32();
        this.kvdByteOffset = getNext32();
        this.kvdByteLength = getNext32();
        this.sgdByteOffset = getNext64();
        this.sgdByteLength = getNext64();
    }

    parseLevelIndex(levelIndex)
    {
        let offset = 0;
        const getNext = () =>
        {
            const result = this.getUint64(levelIndex, offset, true);
            offset += 8;
            return result;
        };

        for (let i = 0; i < this.levelCount; i++)
        {
            const level = {};
            level.byteOffset = getNext();
            level.byteLength = getNext();
            level.uncompressedByteLength = getNext();

            this.levels.push(level);
        }
    }

    parseLevelData(arrayBuffer)
    {
        if (this.layerCount > 0 || this.supercompressionScheme > 0)
        {
            return;
        }

        let miplevel = 0;
        for (let level of this.levels)
        {
            const divisor = Math.pow(2, miplevel);

            level.miplevel = miplevel++;
            level.width = this.width / divisor;
            level.height = this.height / divisor;

            level.faces = [];
            for (let i = 0; i < this.faceCount; i++)
            {
                const face = {};

                const faceLength = level.byteLength / this.faceCount;
                const faceOffset = level.byteOffset + faceLength * i;

                if (this.vkFormat == VK_FORMAT.R16G16B16A16_SFLOAT)
                {
                    face.data = new Uint16Array(arrayBuffer, faceOffset, faceLength / this.typeSize);
                }
                else if (this.vkFormat == VK_FORMAT.R32G32B32A32_SFLOAT)
                {
                    face.data = new Float32Array(arrayBuffer, faceOffset, faceLength / this.typeSize);
                }

                level.faces.push(face);
            }
        }
    }

    // https://stackoverflow.com/questions/53103695
    getUint64(view, byteOffset, littleEndian)
    {
        // we should actually be able to use BigInt, but we can't create a Uint8Array with BigInt offset/length

        const left =  view.getUint32(byteOffset, littleEndian);
        const right = view.getUint32(byteOffset + 4, littleEndian);
        const combined = littleEndian ? left + (2 ** 32 * right) : (2 ** 32 * left) + right;

        if (! Number.isSafeInteger(combined))
        {
            console.warn("ktx2image: " + combined + " exceeds MAX_SAFE_INTEGER. Precision may be lost.");
        }

        return combined;
    }
}

// https://www.khronos.org/registry/vulkan/specs/1.1-extensions/man/html/VkFormat.html
const VK_FORMAT =
{
    R16G16B16A16_SFLOAT: 97,
    R32G32B32A32_SFLOAT: 109
};

const GL_INTERNAL_FORMAT =
{
    RGBA16F: 34842,
    RGBA32F: 34836
};

const GL_FORMAT =
{
    RGBA: 6408
};

const GL_TYPE =
{
    HALF_FLOAT: 5131,
    FLOAT: 5126
};

const VK_TO_GL = {};
VK_TO_GL[VK_FORMAT.R16G16B16A16_SFLOAT] =
{
    glInternalFormat: GL_INTERNAL_FORMAT.RGBA16F,
    glFormat: GL_FORMAT.RGBA,
    glType: GL_TYPE.HALF_FLOAT
};
VK_TO_GL[VK_FORMAT.R32G32B32A32_SFLOAT] =
{
    glInternalFormat: GL_INTERNAL_FORMAT.RGBA32F,
    glFormat: GL_FORMAT.RGBA,
    glType: GL_TYPE.FLOAT
};

function nearestPowerOf2(n)
{
    if (isPowerOf2(n))
    {
        return n;
    }
    return Math.pow(2.0, Math.round(Math.log(n) / Math.log(2.0)));
}

function isPowerOf2(n)
{
    return n && (n & (n - 1)) === 0;
}

function makeEven(n)
{
    if (n % 2 === 1)
    {
        return n + 1;
    }
    return n;
}

const ImageMimeType = {JPEG: "image/jpeg", PNG: "image/png", HDR: "image/vnd.radiance", KTX2: "image/ktx2"};

class gltfImage extends GltfObject
{
    constructor(
        uri = undefined,
        type = WebGl.context.TEXTURE_2D, miplevel = 0,
        bufferView = undefined,
        name = undefined,
        mimeType = ImageMimeType.JPEG,
        image = undefined)
    {
        super();
        this.uri = uri;
        this.bufferView = bufferView;
        this.mimeType = mimeType;
        this.image = image; // javascript image
        if (this.image !== undefined)
        {
            this.image.crossOrigin = "";
        }
        this.name = name;
        this.type = type; // nonstandard
        this.miplevel = miplevel; // nonstandard
    }

    resolveRelativePath(basePath)
    {
        if (this.uri !== undefined)
        {
            if (this.uri.startsWith('./'))
            {
                // Remove preceding './' from URI.
                this.uri = this.uri.substr(2);
            }
            this.uri = basePath + this.uri;
        }
    }

    load(gltf, additionalFiles = undefined)
    {
        if (this.image !== undefined)
        {
            console.error("image has already been loaded");
            return;
        }

        if (this.mimeType === ImageMimeType.HDR)
        {
            this.image = new HDRImage();
        }
        else if (this.mimeType === ImageMimeType.KTX2)
        {
            this.image = new Ktx2Image();
        }
        else
        {
            this.image = new Image();
        }

        this.image.crossOrigin = "";
        const self = this;
        const promise = new Promise(resolve =>
        {
            self.image.onload = resolve;
            self.image.onerror = resolve;

            if (!self.setImageFromBufferView(gltf) &&
                !self.setImageFromFiles(additionalFiles) &&
                !self.setImageFromUri())
            {
                console.error("Was not able to resolve image with uri '%s'", self.uri);
                resolve();
            }
        });

        return promise;
    }

    setImageFromUri()
    {
        if (this.uri === undefined)
        {
            return false;
        }

        if (this.image instanceof Ktx2Image)
        {
            axios_min.get(this.uri, { responseType: 'arraybuffer'})
                .then(response =>
                {
                    this.image.initialize(response.data);
                });
        }
        else
        {
            this.image.src = this.uri;
        }

        return true;
    }

    setImageFromBufferView(gltf)
    {
        const view = gltf.bufferViews[this.bufferView];
        if (view === undefined)
        {
            return false;
        }

        const buffer = gltf.buffers[view.buffer].buffer;
        const array = new Uint8Array(buffer, view.byteOffset, view.byteLength);
        const blob = new Blob([array], { "type": this.mimeType });
        this.image.src = URL.createObjectURL(blob);
        return true;
    }

    setImageFromFiles(files)
    {
        if (this.uri === undefined || files === undefined)
        {
            return false;
        }

        let foundFile = files.find(function(file)
        {
            if (file.name === this.uri || file.fullPath === this.uri)
            {
                return true;
            }
        }, this);

        if (foundFile === undefined)
        {
            return false;
        }

        const reader = new FileReader();
        const self = this;

        if (this.image instanceof Ktx2Image)
        {
            reader.onloadend = function(event)
            {
                self.image.initialize(event.target.result);
            };
            reader.readAsArrayBuffer(foundFile);
        }
        else
        {
            reader.onloadend = function(event)
            {
                self.image.src = event.target.result;
            };
            reader.readAsDataURL(foundFile);
        }

        return true;
    }

    shouldGenerateMips()
    {
        return (isPowerOf2(this.image.width) && isPowerOf2(this.image.height));
    }
}

class gltfLight extends GltfObject
{
    constructor(
        type = "directional",
        color = [1, 1, 1],
        intensity = 1,
        innerConeAngle = 0,
        outerConeAngle = Math.PI / 4,
        range = -1,
        name = undefined,
        node = undefined)
    {
        super();
        this.type = type;
        this.color = color;
        this.intensity = intensity;
        this.innerConeAngle = innerConeAngle;
        this.outerConeAngle = outerConeAngle;
        this.range = range;
        this.name = name;
        // non gltf
        this.node = node;
    }

    initGl(gltf)
    {
        super.initGl(gltf);

        for (let i = 0; i < gltf.nodes.length; i++)
        {
            const nodeExtensions = gltf.nodes[i].extensions;
            if (nodeExtensions === undefined)
            {
                continue;
            }

            const lightsExtension = nodeExtensions.KHR_lights_punctual;
            if (lightsExtension === undefined)
            {
                continue;
            }

            const lightIndex = lightsExtension.light;
            if (gltf.lights[lightIndex] === this)
            {
                this.node = i;
                break;
            }
        }
    }
    
    fromJson(jsonLight)
    {
        super.fromJson(jsonLight);

        if(jsonLight.spot !== undefined)
        {
            fromKeys(this, jsonLight.spot);
        }
    }

    toUniform(gltf)
    {
        const uLight = new UniformLight();

        if (this.node !== undefined)
        {
            const matrix = gltf.nodes[this.node].worldTransform;

            var scale = fromValues(1, 1, 1);
            getScaling(scale, matrix);
        
            // To extract a correct rotation, the scaling component must be eliminated.
            const mn = create$1();
            for(const col of [0, 1, 2])
            {
                mn[col] = matrix[col] / scale[0];
                mn[col + 4] = matrix[col + 4] / scale[1];
                mn[col + 8] = matrix[col + 8] / scale[2];
            }
            var rotation = create$4();
            getRotation(rotation, mn);
            normalize$2(rotation, rotation);

            const alongNegativeZ = fromValues(0, 0, -1);
            transformQuat(uLight.direction, alongNegativeZ, rotation);

            var translation = fromValues(0, 0, 0);
            getTranslation(translation, matrix);
            uLight.position = translation;
        }

        uLight.range = this.range;
        uLight.color = jsToGl(this.color);
        uLight.intensity = this.intensity;

        uLight.innerConeCos = Math.cos(this.innerConeAngle);
        uLight.outerConeCos = Math.cos(this.outerConeAngle);

        switch(this.type)
        {
        case "spot":
            uLight.type = Type_Spot;
            break;
        case "point":
            uLight.type = Type_Point;
            break;
        case "directional":
        default:
            uLight.type = Type_Directional;
            break;
        }

        return uLight;
    }
}

const Type_Directional = 0;
const Type_Point = 1;
const Type_Spot = 2;

class UniformLight extends UniformStruct
{
    constructor()
    {
        super();

        const defaultDirection = fromValues(-0.7399, -0.6428, -0.1983);
        this.direction = defaultDirection;
        this.range = -1;

        this.color = jsToGl([1, 1, 1]);
        this.intensity = 1;

        this.position = jsToGl([0, 0, 0]);
        this.innerConeCos = 0.0;

        this.outerConeCos = Math.PI / 4;
        this.type = Type_Directional;
        this.padding = create$5();
    }
}

// https://github.com/KhronosGroup/glTF/blob/khr_ktx2_ibl/extensions/2.0/Khronos/KHR_lights_image_based/schema/imageBasedLight.schema.json

class ImageBasedLight extends GltfObject
{
    constructor()
    {
        super();
        this.rotation = jsToGl([0, 0, 0, 1]);
        this.brightnessFactor = 1;
        this.brightnessOffset = 0;
        this.specularEnvironmentTexture = undefined;
        this.diffuseEnvironmentTexture = undefined;
        this.sheenEnvironmentTexture = undefined;

        // non-gltf
        this.levelCount = 1;
    }

    fromJson(jsonIBL)
    {
        super.fromJson(jsonIBL);

        if(jsonIBL.extensions !== undefined)
        {
            this.fromJsonExtensions(jsonIBL.extensions);
        }
    }

    fromJsonExtensions(extensions)
    {
        if (extensions.KHR_materials_sheen !== undefined)
        {
            this.sheenEnvironmentTexture = extensions.KHR_materials_sheen.sheenEnvironmentTexture;
        }
    }

    initGl(gltf)
    {
        if (this.diffuseEnvironmentTexture !== undefined)
        {
            const textureObject = gltf.textures[this.diffuseEnvironmentTexture];
            textureObject.type = WebGl.context.TEXTURE_CUBE_MAP;
        }
        if (this.specularEnvironmentTexture !== undefined)
        {
            const textureObject = gltf.textures[this.specularEnvironmentTexture];
            textureObject.type = WebGl.context.TEXTURE_CUBE_MAP;

            const imageObject = gltf.images[textureObject.source];
            this.levelCount = imageObject.image.levelCount;
        }
        if(this.sheenEnvironmentTexture !== undefined)
        {
            const textureObject = gltf.textures[this.sheenEnvironmentTexture];
            textureObject.type = WebGl.context.TEXTURE_CUBE_MAP;

            const imageObject = gltf.images[textureObject.source];
            if (this.levelCount !== imageObject.image.levelCount)
            {
                console.error("Specular and sheen do not have same level count");
            }
        }
    }
}

class gltfTexture extends GltfObject
{
    constructor(sampler = undefined, source = undefined, type = WebGl.context.TEXTURE_2D, texture = undefined)
    {
        super();
        this.sampler = sampler; // index to gltfSampler, default sampler ?
        this.source = source; // index to gltfImage

        // non gltf
        this.glTexture = texture;
        this.type = type;
        this.initialized = false;
    }

    initGl(gltf)
    {
        if (this.sampler === undefined)
        {
            this.sampler = gltf.samplers.length - 1;
        }

        initGlForMembers(this, gltf);
    }

    destroy()
    {
        if (this.glTexture !== undefined)
        {
            WebGl.context.deleteTexture(this.glTexture);
        }

        this.glTexture = undefined;
    }
}

class gltfTextureInfo
{
    constructor(index = undefined, texCoord = 0, linear = true, samplerName = "", generateMips = true) // linear by default
    {
        this.index = index; // reference to gltfTexture
        this.texCoord = texCoord; // which UV set to use
        this.linear = linear;
        this.samplerName = samplerName;
        this.strength = 1.0; // occlusion
        this.scale = 1.0; // normal
        this.generateMips = generateMips;

        this.extensions = undefined;
    }

    initGl(gltf)
    {
        initGlForMembers(this, gltf);
    }

    fromJson(jsonTextureInfo)
    {
        fromKeys(this, jsonTextureInfo);
    }
}

class gltfMaterial extends GltfObject
{
    constructor()
    {
        super();
        this.name = undefined;
        this.pbrMetallicRoughness = undefined;
        this.normalTexture = undefined;
        this.occlusionTexture = undefined;
        this.emissiveTexture = undefined;
        this.emissiveFactor = fromValues(0, 0, 0);
        this.alphaMode = "OPAQUE";
        this.alphaCutoff = 0.5;
        this.doubleSided = false;

        // non gltf properties
        this.type = "unlit";
        this.textures = [];
        this.properties = new Map();
        this.defines = [];
    }

    static createDefault()
    {
        const defaultMaterial = new gltfMaterial();
        defaultMaterial.type = "MR";
        defaultMaterial.name = "Default Material";
        defaultMaterial.defines.push("MATERIAL_METALLICROUGHNESS 1");
        const baseColorFactor = fromValues$1(1, 1, 1, 1);
        const metallicFactor = 1;
        const roughnessFactor = 1;
        defaultMaterial.properties.set("u_BaseColorFactor", baseColorFactor);
        defaultMaterial.properties.set("u_MetallicFactor", metallicFactor);
        defaultMaterial.properties.set("u_RoughnessFactor", roughnessFactor);

        return defaultMaterial;
    }

    getShaderIdentifier()
    {
        switch (this.type)
        {
        default:
        case "SG": // fall through till we sparate shaders
        case "MR": return "pbr.frag";
            //case "SG": return "specular-glossiness.frag" ;
        }
    }

    getDefines()
    {
        return this.defines;
    }

    getProperties()
    {
        return this.properties;
    }

    getTextures()
    {
        return this.textures;
    }

    parseTextureInfoExtensions(textureInfo, textureKey)
    {
        if(textureInfo.extensions === undefined)
        {
            return;
        }

        if(textureInfo.extensions.KHR_texture_transform !== undefined)
        {
            const uvTransform = textureInfo.extensions.KHR_texture_transform;

            // override uvset
            if(uvTransform.texCoord !== undefined)
            {
                textureInfo.texCoord = uvTransform.texCoord;
            }

            let rotation = create();
            let scale = create();
            let translation = create();

            if(uvTransform.rotation !== undefined)
            {
                const s =  Math.sin(uvTransform.rotation);
                const c =  Math.cos(uvTransform.rotation);

                rotation = jsToGl([
                    c, s, 0.0,
                    -s, c, 0.0,
                    0.0, 0.0, 1.0]);
            }

            if(uvTransform.scale !== undefined)
            {
                scale = jsToGl([uvTransform.scale[0],0,0, 0,uvTransform.scale[1],0, 0,0,1]);
            }

            if(uvTransform.offset !== undefined)
            {
                translation = jsToGl([1,0,uvTransform.offset[0], 0,1,uvTransform.offset[1], 0, 0, 1]);
            }

            let uvMatrix = create();
            multiply(uvMatrix, rotation, scale);
            multiply(uvMatrix, uvMatrix, translation);

            this.defines.push("HAS_" + textureKey.toUpperCase() + "_UV_TRANSFORM 1");
            this.properties.set("u_" + textureKey + "UVTransform", uvMatrix);
        }
    }

    initGl(gltf)
    {
        if (this.normalTexture !== undefined)
        {
            this.normalTexture.samplerName = "u_NormalSampler";
            this.parseTextureInfoExtensions(this.normalTexture, "Normal");
            this.textures.push(this.normalTexture);
            this.defines.push("HAS_NORMAL_MAP 1");
            this.properties.set("u_NormalScale", this.normalTexture.scale);
            this.properties.set("u_NormalUVSet", this.normalTexture.texCoord);
        }

        if (this.occlusionTexture !== undefined)
        {
            this.occlusionTexture.samplerName = "u_OcclusionSampler";
            this.parseTextureInfoExtensions(this.occlusionTexture, "Occlusion");
            this.textures.push(this.occlusionTexture);
            this.defines.push("HAS_OCCLUSION_MAP 1");
            this.properties.set("u_OcclusionStrength", this.occlusionTexture.strength);
            this.properties.set("u_OcclusionUVSet", this.occlusionTexture.texCoord);
        }

        this.properties.set("u_EmissiveFactor", this.emissiveFactor);
        if (this.emissiveTexture !== undefined)
        {
            this.emissiveTexture.samplerName = "u_EmissiveSampler";
            this.parseTextureInfoExtensions(this.emissiveTexture, "Emissive");
            this.textures.push(this.emissiveTexture);
            this.defines.push("HAS_EMISSIVE_MAP 1");
            this.properties.set("u_EmissiveUVSet", this.emissiveTexture.texCoord);
        }

        if (this.baseColorTexture !== undefined)
        {
            this.baseColorTexture.samplerName = "u_BaseColorSampler";
            this.parseTextureInfoExtensions(this.baseColorTexture, "BaseColor");
            this.textures.push(this.baseColorTexture);
            this.defines.push("HAS_BASE_COLOR_MAP 1");
            this.properties.set("u_BaseColorUVSet", this.baseColorTexture.texCoord);
        }

        if (this.metallicRoughnessTexture !== undefined)
        {
            this.metallicRoughnessTexture.samplerName = "u_MetallicRoughnessSampler";
            this.parseTextureInfoExtensions(this.metallicRoughnessTexture, "MetallicRoughness");
            this.textures.push(this.metallicRoughnessTexture);
            this.defines.push("HAS_METALLIC_ROUGHNESS_MAP 1");
            this.properties.set("u_MetallicRoughnessUVSet", this.metallicRoughnessTexture.texCoord);
        }

        if (this.diffuseTexture !== undefined)
        {
            this.diffuseTexture.samplerName = "u_DiffuseSampler";
            this.parseTextureInfoExtensions(this.diffuseTexture, "Diffuse");
            this.textures.push(this.diffuseTexture);
            this.defines.push("HAS_DIFFUSE_MAP 1");
            this.properties.set("u_DiffuseUVSet", this.diffuseTexture.texCoord);
        }

        if (this.specularGlossinessTexture !== undefined)
        {
            this.specularGlossinessTexture.samplerName = "u_SpecularGlossinessSampler";
            this.parseTextureInfoExtensions(this.specularGlossinessTexture, "SpecularGlossiness");
            this.textures.push(this.specularGlossinessTexture);
            this.defines.push("HAS_SPECULAR_GLOSSINESS_MAP 1");
            this.properties.set("u_SpecularGlossinessUVSet", this.specularGlossinessTexture.texCoord);
        }

        if(this.alphaMode === 'MASK') // only set cutoff value for mask material
        {
            this.defines.push("ALPHAMODE_MASK 1");
            this.properties.set("u_AlphaCutoff", this.alphaCutoff);
        }
        else if (this.alphaMode === 'OPAQUE')
        {
            this.defines.push("ALPHAMODE_OPAQUE 1");
        }

        if (this.pbrMetallicRoughness !== undefined && this.type !== "SG")
        {
            this.defines.push("MATERIAL_METALLICROUGHNESS 1");

            let baseColorFactor = fromValues$1(1, 1, 1, 1);
            let metallicFactor = 1;
            let roughnessFactor = 1;

            if (this.pbrMetallicRoughness.baseColorFactor !== undefined)
            {
                baseColorFactor = jsToGl(this.pbrMetallicRoughness.baseColorFactor);
            }

            if (this.pbrMetallicRoughness.metallicFactor !== undefined)
            {
                metallicFactor = this.pbrMetallicRoughness.metallicFactor;
            }

            if (this.pbrMetallicRoughness.roughnessFactor !== undefined)
            {
                roughnessFactor = this.pbrMetallicRoughness.roughnessFactor;
            }

            this.properties.set("u_BaseColorFactor", baseColorFactor);
            this.properties.set("u_MetallicFactor", metallicFactor);
            this.properties.set("u_RoughnessFactor", roughnessFactor);
        }

        if (this.extensions !== undefined)
        {
            if (this.extensions.KHR_materials_unlit !== undefined)
            {
                this.defines.push("MATERIAL_UNLIT 1");
            }

            if (this.extensions.KHR_materials_pbrSpecularGlossiness !== undefined)
            {
                this.defines.push("MATERIAL_SPECULARGLOSSINESS 1");

                let diffuseFactor = fromValues$1(1, 1, 1, 1);
                let specularFactor = fromValues(1, 1, 1);
                let glossinessFactor = 1;

                if (this.extensions.KHR_materials_pbrSpecularGlossiness.diffuseFactor !== undefined)
                {
                    diffuseFactor = jsToGl(this.extensions.KHR_materials_pbrSpecularGlossiness.diffuseFactor);
                }

                if (this.extensions.KHR_materials_pbrSpecularGlossiness.specularFactor !== undefined)
                {
                    specularFactor = jsToGl(this.extensions.KHR_materials_pbrSpecularGlossiness.specularFactor);
                }

                if (this.extensions.KHR_materials_pbrSpecularGlossiness.glossinessFactor !== undefined)
                {
                    glossinessFactor = this.extensions.KHR_materials_pbrSpecularGlossiness.glossinessFactor;
                }

                this.properties.set("u_DiffuseFactor", diffuseFactor);
                this.properties.set("u_SpecularFactor", specularFactor);
                this.properties.set("u_GlossinessFactor", glossinessFactor);
            }

            //Clearcoat is part of the default metallic-roughness shader
            if(this.extensions.KHR_materials_clearcoat !== undefined)
            {
                let clearcoatFactor = 0.0;
                let clearcoatRoughnessFactor = 0.0;

                this.defines.push("MATERIAL_CLEARCOAT 1");

                if(this.extensions.KHR_materials_clearcoat.clearcoatFactor !== undefined)
                {
                    clearcoatFactor = this.extensions.KHR_materials_clearcoat.clearcoatFactor;
                }
                if(this.extensions.KHR_materials_clearcoat !== undefined)
                {
                    clearcoatRoughnessFactor = this.extensions.KHR_materials_clearcoat.clearcoatRoughnessFactor;
                }

                if (this.clearcoatTexture !== undefined)
                {
                    this.clearcoatTexture.samplerName = "u_ClearcoatSampler";
                    this.parseTextureInfoExtensions(this.clearcoatTexture, "Clearcoat");
                    this.textures.push(this.clearcoatTexture);
                    this.defines.push("HAS_CLEARCOAT_TEXTURE_MAP 1");
                    this.properties.set("u_ClearcoatUVSet", this.clearcoatTexture.texCoord);
                }
                if (this.clearcoatRoughnessTexture !== undefined)
                {
                    this.clearcoatRoughnessTexture.samplerName = "u_ClearcoatRoughnessSampler";
                    this.parseTextureInfoExtensions(this.clearcoatRoughnessTexture, "ClearcoatRoughness");
                    this.textures.push(this.clearcoatRoughnessTexture);
                    this.defines.push("HAS_CLEARCOAT_ROUGHNESS_MAP 1");
                    this.properties.set("u_ClearcoatRoughnessUVSet", this.clearcoatRoughnessTexture.texCoord);
                }
                if (this.clearcoatNormalTexture !== undefined)
                {
                    this.clearcoatNormalTexture.samplerName = "u_ClearcoatNormalSampler";
                    this.parseTextureInfoExtensions(this.clearcoatNormalTexture, "ClearcoatNormal");
                    this.textures.push(this.clearcoatNormalTexture);
                    this.defines.push("HAS_CLEARCOAT_NORMAL_MAP 1");
                    this.properties.set("u_ClearcoatNormalUVSet", this.clearcoatNormalTexture.texCoord);
                }
                this.properties.set("u_ClearcoatFactor", clearcoatFactor);
                this.properties.set("u_ClearcoatRoughnessFactor", clearcoatRoughnessFactor);
            }

            //Sheen material extension
            // https://github.com/sebavan/glTF/tree/KHR_materials_sheen/extensions/2.0/Khronos/KHR_materials_sheen
            if(this.extensions.KHR_materials_sheen !== undefined)
            {
                let sheenFactor = 0.0;
                let sheenColor =  fromValues(1.0, 1.0, 1.0);
                let sheenRoughness = this.properties.get("u_RoughnessFactor");

                this.defines.push("MATERIAL_SHEEN 1");

                if(this.extensions.KHR_materials_sheen.intensityFactor !== undefined)
                {
                    sheenFactor = this.extensions.KHR_materials_sheen.intensityFactor;
                }
                if(this.extensions.KHR_materials_sheen.colorFactor !== undefined)
                {
                    sheenColor = jsToGl(this.extensions.KHR_materials_sheen.colorFactor);
                }
                if (this.colorIntensityTexture !== undefined)
                {
                    this.colorIntensityTexture.samplerName = "u_sheenColorIntensitySampler";
                    this.parseTextureInfoExtensions(this.colorIntensityTexture, "SheenColorIntensity");
                    this.textures.push(this.colorIntensityTexture);
                    this.defines.push("HAS_SHEEN_COLOR_INTENSITY_MAP 1");
                    this.properties.set("u_sheenColorIntensityUVSet", this.colorIntensityTexture.texCoord);
                }

                this.properties.set("u_SheenIntensityFactor", sheenFactor);
                this.properties.set("u_SheenColorFactor", sheenColor);
                this.properties.set("u_SheenRoughness", sheenRoughness);
            }

            //KHR Extension Specular
            // See https://github.com/ux3d/glTF/tree/KHR_materials_pbrClearcoat/extensions/2.0/Khronos/KHR_materials_specular
            // We call the specular extension and its members 'MetallicRoughnessSpecular' instead to avoid confusion with SpecularGlossiness
            if(this.extensions.KHR_materials_specular !== undefined)
            {
                let specularFactor = 0.5;

                this.defines.push("MATERIAL_METALLICROUGHNESS_SPECULAROVERRIDE 1");

                if(this.extensions.KHR_materials_specular.specularFactor !== undefined)
                {
                    specularFactor = this.extensions.KHR_materials_specular.specularFactor;
                }
                if (this.metallicRoughnessSpecularTexture !== undefined)
                {
                    this.metallicRoughnessSpecularTexture.samplerName = "u_MetallicRoughnessSpecularSampler";
                    this.parseTextureInfoExtensions(this.metallicRoughnessSpecularTexture, "MetallicRoughnessSpecular");
                    this.textures.push(this.metallicRoughnessSpecularTexture);
                    this.defines.push("HAS_METALLICROUGHNESS_SPECULAROVERRIDE_MAP 1");
                    this.properties.set("u_MetallicRougnessSpecularTextureUVSet", this.metallicRoughnessSpecularTexture.texCoord);
                }
                this.properties.set("u_MetallicRoughnessSpecularFactor", specularFactor);
            }

            //KHR Extension Subsurface
            // See https://github.com/KhronosGroup/glTF/pull/1766
            // We call the specular extension and its members 'MetallicRoughnessSpecular' instead to avoid confusion with SpecularGlossiness
            if(this.extensions.KHR_materials_subsurface !== undefined)
            {
                let scale = 1.0;
                let distortion = 0.0;
                let power = 1.0;
                let colorFactor = fromValues(1.0, 1.0, 1.0);
                let thicknessFactor = 1.0;

                this.defines.push("MATERIAL_SUBSURFACE 1");

                if(this.extensions.KHR_materials_subsurface.scale !== undefined)
                {
                    scale = this.extensions.KHR_materials_subsurface.scale;
                }
                if(this.extensions.KHR_materials_subsurface.distortion !== undefined)
                {
                    distortion = this.extensions.KHR_materials_subsurface.distortion;
                }
                if(this.extensions.KHR_materials_subsurface.power !== undefined)
                {
                    power = this.extensions.KHR_materials_subsurface.power;
                }
                if(this.extensions.KHR_materials_subsurface.colorFactor !== undefined)
                {
                    colorFactor = jsToGl(this.extensions.KHR_materials_subsurface.colorFactor);
                }
                if(this.extensions.KHR_materials_subsurface.thicknessFactor !== undefined)
                {
                    thicknessFactor = this.extensions.KHR_materials_subsurface.thicknessFactor;
                }
                if (this.subsurfaceColorTexture !== undefined)
                {
                    this.subsurfaceColorTexture.samplerName = "u_SubsurfaceColorSampler";
                    this.parseTextureInfoExtensions(this.subsurfaceColorTexture, "SubsurfaceColor");
                    this.textures.push(this.subsurfaceColorTexture);
                    this.defines.push("HAS_SUBSURFACE_COLOR_MAP 1");
                    this.properties.set("u_SubsurfaceColorUVSet", this.subsurfaceColorTexture.texCoord);
                }
                if (this.subsurfaceThicknessTexture !== undefined)
                {
                    this.subsurfaceThicknessTexture.samplerName = "u_SubsurfaceThicknessSampler";
                    this.parseTextureInfoExtensions(this.subsurfaceThicknessTexture, "SubsurfaceThickness");
                    this.textures.push(this.subsurfaceThicknessTexture);
                    this.defines.push("HAS_SUBSURFACE_THICKNESS_MAP 1");
                    this.properties.set("u_SubsurfaceThicknessUVSet", this.subsurfaceThicknessTexture.texCoord);
                }
                this.properties.set("u_SubsurfaceScale", scale);
                this.properties.set("u_SubsurfaceDistortion", distortion);
                this.properties.set("u_SubsurfacePower", power);
                this.properties.set("u_SubsurfaceColorFactor", colorFactor);
                this.properties.set("u_SubsurfaceThicknessFactor", thicknessFactor);
            }

            // Extension: Anisotropy
            if(this.extensions.KHR_materials_anisotropy !== undefined)
            {
                let anisotropy = this.extensions.KHR_materials_anisotropy.anisotropy;
                let anisotropyDirection = fromValues(1.0, 0.0, 0.0);

                if(anisotropy === undefined)
                {
                    anisotropy = 0.0;
                }
                if(this.extensions.KHR_materials_anisotropy.anisotropyDirection !== undefined)
                {
                    anisotropyDirection = jsToGl(this.extensions.KHR_materials_anisotropy.anisotropyDirection);
                }
                if (this.anisotropyTexture !== undefined)
                {
                    this.anisotropyTexture.samplerName = "u_AnisotropySampler";
                    this.parseTextureInfoExtensions(this.anisotropyTexture, "Anisotropy");
                    this.textures.push(this.anisotropyTexture);
                    this.defines.push("HAS_ANISOTROPY_MAP 1");
                    this.properties.set("u_AnisotropyUVSet", this.anisotropyTexture.texCoord);
                }
                if (this.anisotropyDirectionTexture !== undefined)
                {
                    this.anisotropyDirectionTexture.samplerName = "u_AnisotropyDirectionSampler";
                    this.parseTextureInfoExtensions(this.anisotropyDirectionTexture, "AnisotropyDirection");
                    this.textures.push(this.anisotropyDirectionTexture);
                    this.defines.push("HAS_ANISOTROPY_DIRECTION_MAP 1");
                    this.properties.set("u_AnisotropyDirectionUVSet", this.anisotropyDirectionTexture.texCoord);
                }

                this.defines.push("MATERIAL_ANISOTROPY 1");

                this.properties.set("u_Anisotropy", anisotropy);

                if (this.anisotropyDirectionTexture === undefined) {
                    // Texture overrides uniform value.
                    this.properties.set("u_AnisotropyDirection", anisotropyDirection);
                }
            }

            // KHR Extension: Thin film
            // See https://github.com/ux3d/glTF/tree/extensions/KHR_materials_thinfilm/extensions/2.0/Khronos/KHR_materials_thinfilm
            if(this.extensions.KHR_materials_thinfilm !== undefined)
            {
                let factor = this.extensions.KHR_materials_thinfilm.thinfilmFactor;
                let thicknessMinimum = this.extensions.KHR_materials_thinfilm.thinfilmThicknessMinimum;
                let thicknessMaximum = this.extensions.KHR_materials_thinfilm.thinfilmThicknessMaximum;

                if (factor === undefined)
                {
                    factor = 0.0;
                }
                if (thicknessMinimum === undefined)
                {
                    thicknessMinimum = 400.0;
                }
                if (thicknessMaximum === undefined)
                {
                    thicknessMaximum = 1200.0;
                }

                this.defines.push("MATERIAL_THIN_FILM 1");

                if (this.thinfilmTexture !== undefined)
                {
                    this.thinfilmTexture.samplerName = "u_ThinFilmSampler";
                    this.parseTextureInfoExtensions(this.thinfilmTexture, "ThinFilm");
                    this.textures.push(this.thinfilmTexture);
                    this.defines.push("HAS_THIN_FILM_MAP 1");
                    this.properties.set("u_ThinFilmUVSet", this.thinfilmTexture.texCoord);
                }

                if (this.thinfilmThicknessTexture !== undefined)
                {
                    this.thinfilmThicknessTexture.samplerName = "u_ThinFilmThicknessSampler";
                    this.parseTextureInfoExtensions(this.thinfilmThicknessTexture, "ThinFilmThickness");
                    this.textures.push(this.thinfilmThicknessTexture);
                    this.defines.push("HAS_THIN_FILM_THICKNESS_MAP 1");
                    this.properties.set("u_ThinFilmThicknessUVSet", this.thinfilmThicknessTexture.texCoord);

                    // The thickness minimum is only required when there is a thickness texture present.
                    // Because 1.0 is the default value for the thickness, no texture implies that only the
                    // maximum thickness is ever read in the shader.
                    this.properties.set("u_ThinFilmThicknessMinimum", thicknessMinimum);
                }

                this.properties.set("u_ThinFilmFactor", factor);
                this.properties.set("u_ThinFilmThicknessMaximum", thicknessMaximum);
            }

            // KHR Extension: Thickness
            if (this.extensions.KHR_materials_thickness !== undefined)
            {
                let thickness = this.extensions.KHR_materials_thickness.thickness;

                if (thickness === undefined)
                {
                    thickness = 1.0;
                }

                if (this.thicknessTexture !== undefined)
                {
                    this.thicknessTexture.samplerName = "u_ThicknessSampler";
                    this.parseTextureInfoExtensions(this.thicknessTexture, "Thickness");
                    this.textures.push(this.thicknessTexture);
                    this.defines.push("HAS_THICKNESS_MAP 1");
                    this.properties.set("u_ThicknessUVSet", this.thicknessTexture.texCoord);
                }

                this.defines.push("MATERIAL_THICKNESS 1");

                this.properties.set("u_Thickness", thickness);
            }

            // KHR Extension: IOR
            if (this.extensions.KHR_materials_ior !== undefined)
            {
                let ior = this.extensions.KHR_materials_ior.ior;

                if (ior === undefined)
                {
                    ior = 1.0;
                }

                this.defines.push("MATERIAL_IOR 1");

                this.properties.set("u_IOR", ior);
            }

            // KHR Extension: Absorption
            if (this.extensions.KHR_materials_absorption !== undefined)
            {
                let absorptionColor;

                if (this.extensions.KHR_materials_absorption.absorptionColor !== undefined)
                {
                    absorptionColor = jsToGl(this.extensions.KHR_materials_absorption.absorptionColor);
                }
                else
                {
                    absorptionColor = fromValues(0, 0, 0);
                }

                this.defines.push("MATERIAL_ABSORPTION 1");

                this.properties.set("u_AbsorptionColor", absorptionColor);
            }

            // KHR Extension: Transmission
            if (this.extensions.KHR_materials_transmission !== undefined)
            {
                let transmission = this.extensions.KHR_materials_transmission.transmission;

                if (transmission === undefined)
                {
                    transmission = 0.0;
                }

                this.defines.push("MATERIAL_TRANSMISSION 1");

                this.properties.set("u_Transmission", transmission);
            }
        }

        initGlForMembers(this, gltf);
    }

    fromJson(jsonMaterial)
    {
        super.fromJson(jsonMaterial);

        if (jsonMaterial.emissiveFactor !== undefined)
        {
            this.emissiveFactor = jsToGl(jsonMaterial.emissiveFactor);
        }

        if (jsonMaterial.normalTexture !== undefined)
        {
            const normalTexture = new gltfTextureInfo();
            normalTexture.fromJson(jsonMaterial.normalTexture);
            this.normalTexture = normalTexture;
        }

        if (jsonMaterial.occlusionTexture !== undefined)
        {
            const occlusionTexture = new gltfTextureInfo();
            occlusionTexture.fromJson(jsonMaterial.occlusionTexture);
            this.occlusionTexture = occlusionTexture;
        }

        if (jsonMaterial.emissiveTexture !== undefined)
        {
            const emissiveTexture = new gltfTextureInfo(undefined, 0, false);
            emissiveTexture.fromJson(jsonMaterial.emissiveTexture);
            this.emissiveTexture = emissiveTexture;
        }

        if(jsonMaterial.extensions !== undefined)
        {
            this.fromJsonMaterialExtensions(jsonMaterial.extensions);
        }

        // dont do MR if we parsed SG before
        if (jsonMaterial.pbrMetallicRoughness !== undefined && this.type !== "SG")
        {
            this.type = "MR";
            this.fromJsonMetallicRoughness(jsonMaterial.pbrMetallicRoughness);
        }
    }

    fromJsonMaterialExtensions(jsonExtensions)
    {
        if (jsonExtensions.KHR_materials_pbrSpecularGlossiness !== undefined)
        {
            this.type = "SG";
            this.fromJsonSpecularGlossiness(jsonExtensions.KHR_materials_pbrSpecularGlossiness);
        }

        if(jsonExtensions.KHR_materials_unlit !== undefined)
        {
            this.type = "unlit";
        }

        if(jsonExtensions.KHR_materials_clearcoat !== undefined)
        {
            this.fromJsonClearcoat(jsonExtensions.KHR_materials_clearcoat);
        }

        if(jsonExtensions.KHR_materials_sheen !== undefined)
        {
            this.fromJsonSheen(jsonExtensions.KHR_materials_sheen);
        }

        if(jsonExtensions.KHR_materials_specular !== undefined)
        {
            this.fromJsonMetallicRoughnessSpecular(jsonExtensions.KHR_materials_specular);
        }

        if(jsonExtensions.KHR_materials_subsurface !== undefined)
        {
            this.fromJsonSubsurface(jsonExtensions.KHR_materials_subsurface);
        }

        if(jsonExtensions.KHR_materials_thinfilm !== undefined)
        {
            this.fromJsonThinFilm(jsonExtensions.KHR_materials_thinfilm);
        }

        if(jsonExtensions.KHR_materials_transmission !== undefined)
        {
            this.fromJsonTransmission(jsonExtensions.KHR_materials_transmission);
        }

        if(jsonExtensions.KHR_materials_thickness !== undefined)
        {
            this.fromJsonThickness(jsonExtensions.KHR_materials_thickness);
        }

        if(jsonExtensions.KHR_materials_anisotropy !== undefined)
        {
            this.fromJsonAnisotropy(jsonExtensions.KHR_materials_anisotropy);
        }
    }

    fromJsonMetallicRoughness(jsonMetallicRoughness)
    {
        if (jsonMetallicRoughness.baseColorTexture !== undefined)
        {
            const baseColorTexture = new gltfTextureInfo(undefined, 0, false);
            baseColorTexture.fromJson(jsonMetallicRoughness.baseColorTexture);
            this.baseColorTexture = baseColorTexture;
        }

        if (jsonMetallicRoughness.metallicRoughnessTexture !== undefined)
        {
            const metallicRoughnessTexture = new gltfTextureInfo();
            metallicRoughnessTexture.fromJson(jsonMetallicRoughness.metallicRoughnessTexture);
            this.metallicRoughnessTexture = metallicRoughnessTexture;
        }
    }

    fromJsonSpecularGlossiness(jsonSpecularGlossiness)
    {
        if (jsonSpecularGlossiness.diffuseTexture !== undefined)
        {
            const diffuseTexture = new gltfTextureInfo(undefined, 0, false);
            diffuseTexture.fromJson(jsonSpecularGlossiness.diffuseTexture);
            this.diffuseTexture = diffuseTexture;
        }

        if (jsonSpecularGlossiness.specularGlossinessTexture !== undefined)
        {
            const specularGlossinessTexture = new gltfTextureInfo();
            specularGlossinessTexture.fromJson(jsonSpecularGlossiness.specularGlossinessTexture);
            this.specularGlossinessTexture = specularGlossinessTexture;
        }
    }

    fromJsonClearcoat(jsonClearcoat)
    {
        if(jsonClearcoat.clearcoatTexture !== undefined)
        {
            const clearcoatTexture = new gltfTextureInfo();
            clearcoatTexture.fromJson(jsonClearcoat.clearcoatTexture);
            this.clearcoatTexture = clearcoatTexture;
        }

        if(jsonClearcoat.clearcoatRoughnessTexture !== undefined)
        {
            const clearcoatRoughnessTexture =  new gltfTextureInfo();
            clearcoatRoughnessTexture.fromJson(jsonClearcoat.clearcoatRoughnessTexture);
            this.clearcoatRoughnessTexture = clearcoatRoughnessTexture;
        }

        if(jsonClearcoat.clearcoatNormalTexture !== undefined)
        {
            const clearcoatNormalTexture =  new gltfTextureInfo();
            clearcoatNormalTexture.fromJson(jsonClearcoat.clearcoatNormalTexture);
            this.clearcoatNormalTexture = clearcoatNormalTexture;
        }
    }

    fromJsonSheen(jsonSheen)
    {
        if(jsonSheen.colorIntensityTexture !== undefined)
        {
            const colorIntensityTexture = new gltfTextureInfo();
            colorIntensityTexture.fromJson(jsonSheen.colorIntensityTexture);
            this.colorIntensityTexture = colorIntensityTexture;
        }
    }

    fromJsonMetallicRoughnessSpecular(jsonMRSpecular)
    {
        if(jsonMRSpecular.specularTexture !== undefined)
        {
            const specularTexture = new gltfTextureInfo();
            specularTexture.fromJson(jsonMRSpecular.specularTexture);
            this.metallicRoughnessSpecularTexture = specularTexture;
        }
    }

    fromJsonSubsurface(jsonSubsurface)
    {
        if(jsonSubsurface.colorTexture !== undefined)
        {
            const colorTexture = new gltfTextureInfo();
            colorTexture.fromJson(jsonSubsurface.colorTexture);
            this.subsurfaceColorTexture = colorTexture;
        }

        if(jsonSubsurface.thicknessTexture !== undefined)
        {
            const thicknessTexture = new gltfTextureInfo();
            thicknessTexture.fromJson(jsonSubsurface.thicknessTexture);
            this.subsurfaceThicknessTexture = thicknessTexture;
        }
    }

    fromJsonThinFilm(jsonThinFilm)
    {
        if(jsonThinFilm.thinfilmTexture !== undefined)
        {
            const thinfilmTexture = new gltfTextureInfo();
            thinfilmTexture.fromJson(jsonThinFilm.thinfilmTexture);
            this.thinfilmTexture = thinfilmTexture;
        }

        if(jsonThinFilm.thinfilmThicknessTexture !== undefined)
        {
            const thinfilmThicknessTexture = new gltfTextureInfo();
            thinfilmThicknessTexture.fromJson(jsonThinFilm.thinfilmThicknessTexture);
            this.thinfilmThicknessTexture = thinfilmThicknessTexture;
        }
    }

    fromJsonTransmission(jsonTransmission)
    {
    }

    fromJsonThickness(jsonThickness)
    {
        if(jsonThickness.thicknessTexture !== undefined)
        {
            this.thicknessTexture = new gltfTextureInfo();
            this.thicknessTexture.fromJson(jsonThickness.thicknessTexture);
        }
    }

    fromJsonAnisotropy(jsonAnisotropy)
    {
        if(jsonAnisotropy.anisotropyTexture !== undefined)
        {
            this.anisotropyTexture = new gltfTextureInfo();
            this.anisotropyTexture.fromJson(jsonAnisotropy.anisotropyTexture);
        }
        if(jsonAnisotropy.anisotropyDirectionTexture !== undefined)
        {
            this.anisotropyDirectionTexture = new gltfTextureInfo();
            this.anisotropyDirectionTexture.fromJson(jsonAnisotropy.anisotropyDirectionTexture);
        }
    }
}

class gltfPrimitive extends GltfObject
{
    constructor()
    {
        super();
        this.attributes = [];
        this.targets = [];
        this.indices = undefined;
        this.material = undefined;
        this.mode = WebGl.context.TRIANGLES;

        // non gltf
        this.glAttributes = [];
        this.defines = [];
        this.skip = true;
        this.hasWeights = false;
        this.hasJoints = false;

        // The primitive centroid is used for depth sorting.
        this.centroid = undefined;
    }

    initGl(gltf)
    {
        // Use the default glTF material.
        if (this.material === undefined)
        {
            this.material = gltf.materials.length - 1;
        }

        initGlForMembers(this, gltf);

        const maxAttributes = WebGl.context.getParameter(WebGl.context.MAX_VERTEX_ATTRIBS);

        // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes

        // VERTEX ATTRIBUTES
        for (const attribute of Object.keys(this.attributes))
        {
            if(this.glAttributes.length >= maxAttributes)
            {
                console.error("To many vertex attributes for this primitive, skipping " + attribute);
                break;
            }

            const idx = this.attributes[attribute];
            switch (attribute)
            {
            case "POSITION":
                this.skip = false;
                this.glAttributes.push({ attribute: attribute, name: "a_Position", accessor: idx });
                break;
            case "NORMAL":
                this.defines.push("HAS_NORMALS 1");
                this.glAttributes.push({ attribute: attribute, name: "a_Normal", accessor: idx });
                break;
            case "TANGENT":
                this.defines.push("HAS_TANGENTS 1");
                this.glAttributes.push({ attribute: attribute, name: "a_Tangent", accessor: idx });
                break;
            case "TEXCOORD_0":
                this.defines.push("HAS_UV_SET1 1");
                this.glAttributes.push({ attribute: attribute, name: "a_UV1", accessor: idx });
                break;
            case "TEXCOORD_1":
                this.defines.push("HAS_UV_SET2 1");
                this.glAttributes.push({ attribute: attribute, name: "a_UV2", accessor: idx });
                break;
            case "COLOR_0":
                {
                    const accessor = gltf.accessors[idx];
                    this.defines.push("HAS_VERTEX_COLOR_" + accessor.type + " 1");
                    this.glAttributes.push({ attribute: attribute, name: "a_Color", accessor: idx });
                }
                break;
            case "JOINTS_0":
                this.hasJoints = true;
                this.defines.push("HAS_JOINT_SET1 1");
                this.glAttributes.push({ attribute: attribute, name: "a_Joint1", accessor: idx });
                break;
            case "WEIGHTS_0":
                this.hasWeights = true;
                this.defines.push("HAS_WEIGHT_SET1 1");
                this.glAttributes.push({ attribute: attribute, name: "a_Weight1", accessor: idx });
                break;
            case "JOINTS_1":
                this.hasJoints = true;
                this.defines.push("HAS_JOINT_SET2 1");
                this.glAttributes.push({ attribute: attribute, name: "a_Joint2", accessor: idx });
                break;
            case "WEIGHTS_1":
                this.hasWeights = true;
                this.defines.push("HAS_WEIGHT_SET2 1");
                this.glAttributes.push({ attribute: attribute, name: "a_Weight2", accessor: idx });
                break;
            default:
                console.log("Unknown attribute: " + attribute);
            }
        }

        // MORPH TARGETS
        if (this.targets !== undefined)
        {
            let i = 0;
            for (const target of this.targets)
            {
                if(this.glAttributes.length + 3 > maxAttributes)
                {
                    console.error("To many vertex attributes for this primitive, skipping target " + i);
                    break;
                }

                for (const attribute of Object.keys(target))
                {
                    const idx = target[attribute];

                    switch (attribute)
                    {
                    case "POSITION":
                        this.defines.push("HAS_TARGET_POSITION" + i + " 1");
                        this.glAttributes.push({ attribute: attribute, name: "a_Target_Position" + i, accessor: idx });
                        break;
                    case "NORMAL":
                        this.defines.push("HAS_TARGET_NORMAL" + i + " 1");
                        this.glAttributes.push({ attribute: attribute, name: "a_Target_Normal" + i, accessor: idx });
                        break;
                    case "TANGENT":
                        this.defines.push("HAS_TARGET_TANGENT" + i + " 1");
                        this.glAttributes.push({ attribute: attribute, name: "a_Target_Tangent" + i, accessor: idx });
                        break;
                    }
                }

                ++i;
            }
        }
    }

    getShaderIdentifier()
    {
        return "primitive.vert";
    }

    getDefines()
    {
        return this.defines;
    }

    setCentroid(centroid)
    {
        this.centroid = centroid;
    }
}

class gltfMesh extends GltfObject
{
    constructor()
    {
        super();
        this.primitives = [];
        this.name = undefined;
        this.weights = [];
    }

    fromJson(jsonMesh)
    {
        if (jsonMesh.name !== undefined)
        {
            this.name = jsonMesh.name;
        }

        this.primitives = objectsFromJsons(jsonMesh.primitives, gltfPrimitive);

        if(jsonMesh.weights !== undefined)
        {
            this.weights = jsonMesh.weights;
        }
    }
}

// contain:
// transform
// child indices (reference to scene array of nodes)

class gltfNode extends GltfObject
{
    constructor()
    {
        super();
        this.camera = undefined;
        this.children = [];
        this.matrix = undefined;
        this.rotation = jsToGl([0, 0, 0, 1]);
        this.scale = jsToGl([1, 1, 1]);
        this.translation = jsToGl([0, 0, 0]);
        this.name = undefined;
        this.mesh = undefined;
        this.skin = undefined;

        // non gltf
        this.worldTransform = create$1();
        this.inverseWorldTransform = create$1();
        this.normalMatrix = create$1();
        this.light = undefined;
        this.changed = true;
    }

    initGl()
    {
        if (this.matrix !== undefined)
        {
            this.applyMatrix(this.matrix);
        }
        else
        {
            if (this.scale !== undefined)
            {
                this.scale = jsToGl(this.scale);
            }

            if (this.rotation !== undefined)
            {
                this.rotation = jsToGl(this.rotation);
            }

            if (this.translation !== undefined)
            {
                this.translation = jsToGl(this.translation);
            }
        }
        this.changed = true;
    }

    applyMatrix(matrixData)
    {
        this.matrix = jsToGl(matrixData);

        getScaling(this.scale, this.matrix);
        
        // To extract a correct rotation, the scaling component must be eliminated.
        const mn = create$1();
        for(const col of [0, 1, 2])
        {
            mn[col] = this.matrix[col] / this.scale[0];
            mn[col + 4] = this.matrix[col + 4] / this.scale[1];
            mn[col + 8] = this.matrix[col + 8] / this.scale[2];
        }
        getRotation(this.rotation, mn);
        normalize$2(this.rotation, this.rotation);
        
        getTranslation(this.translation, this.matrix);
        
        this.changed = true;
    }

    // vec3
    applyTranslation(translation)
    {
        this.translation = translation;
        this.changed = true;
    }

    // quat
    applyRotation(rotation)
    {
        this.rotation = rotation;
        this.changed = true;
    }

    // vec3
    applyScale(scale)
    {
        this.scale = scale;
        this.changed = true;
    }

    resetTransform()
    {
        this.rotation = jsToGl([0, 0, 0, 1]);
        this.scale = jsToGl([1, 1, 1]);
        this.translation = jsToGl([0, 0, 0]);
        this.changed = true;
    }

    getLocalTransform()
    {
        if(this.transform === undefined || this.changed)
        {
            this.transform = create$1();
            fromRotationTranslationScale(this.transform, this.rotation, this.translation, this.scale);
            this.changed = false;
        }

        return clone(this.transform);
    }
}

class gltfSampler extends GltfObject
{
    constructor(
        magFilter = WebGl.context.LINEAR,
        minFilter = WebGl.context.LINEAR_MIPMAP_LINEAR,
        wrapS = WebGl.context.REPEAT,
        wrapT = WebGl.context.REPEAT)
    {
        super();
        this.magFilter = magFilter;
        this.minFilter = minFilter;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.name = undefined;
    }

    static createDefault()
    {
        return new gltfSampler();
    }
}

class gltfScene extends GltfObject
{
    constructor(nodes = [], name = undefined)
    {
        super();
        this.nodes = nodes;
        this.name = name;

        // non gltf
        this.imageBasedLight = undefined;
    }

    initGl(gltf)
    {
        super.initGl(gltf);

        if (this.extensions !== undefined &&
            this.extensions.KHR_lights_image_based !== undefined)
        {
            const index = this.extensions.KHR_lights_image_based.imageBasedLight;
            this.imageBasedLight = gltf.imageBasedLights[index];
        }
    }

    applyTransformHierarchy(gltf, rootTransform = create$1())
    {
        function applyTransform(gltf, node, parentTransform)
        {
            multiply$1(node.worldTransform, parentTransform, node.getLocalTransform());
            invert(node.inverseWorldTransform, node.worldTransform);
            transpose(node.normalMatrix, node.inverseWorldTransform);

            for (const child of node.children)
            {
                applyTransform(gltf, gltf.nodes[child], node.worldTransform);
            }
        }

        for (const node of this.nodes)
        {
            applyTransform(gltf, gltf.nodes[node], rootTransform);
        }
    }

    gatherNodes(gltf)
    {
        const nodes = [];

        function gatherNode(nodeIndex)
        {
            const node = gltf.nodes[nodeIndex];
            nodes.push(node);

            // recurse into children
            for(const child of node.children)
            {
                gatherNode(child);
            }
        }

        for (const node of this.nodes)
        {
            gatherNode(node);
        }

        return nodes;
    }

    includesNode(gltf, nodeIndex)
    {
        let children = [...this.nodes];
        while(children.length > 0)
        {
            const childIndex = children.pop();

            if (childIndex === nodeIndex)
            {
                return true;
            }

            children = children.concat(gltf.nodes[childIndex].children);
        }

        return false;
    }
}

class gltfAsset extends GltfObject
{
    constructor()
    {
        super();
        this.copyright = undefined;
        this.generator = undefined;
        this.version = undefined;
        this.minVersion = undefined;
    }
}

class gltfAnimationChannel extends GltfObject
{
    constructor()
    {
        super();
        this.target = {node: undefined, path: undefined};
        this.sampler = undefined;
    }
}

const InterpolationPath =
{
    TRANSLATION: "translation",
    ROTATION: "rotation",
    SCALE: "scale",
    WEIGHTS: "weights"
};

class gltfAnimationSampler extends GltfObject
{
    constructor()
    {
        super();
        this.input = undefined;
        this.interpolation = undefined;
        this.output = undefined;
    }
}

const InterpolationModes =
{
    LINEAR: "LINEAR",
    STEP: "STEP",
    CUBICSPLINE: "CUBICSPLINE"
};

class gltfInterpolator
{
    constructor()
    {
        this.prevKey = 0;
        this.prevT = 0.0;
    }

    slerpQuat(q1, q2, t)
    {
        const qn1 = create$4();
        const qn2 = create$4();

        normalize$2(qn1, q1);
        normalize$2(qn2, q2);

        const quatResult = create$4();

        slerp(quatResult, qn1, qn2, t);
        normalize$2(quatResult, quatResult);

        return quatResult;
    }

    linear(prevKey, nextKey, output, t, stride)
    {
        const result = new ARRAY_TYPE(stride);

        for(let i = 0; i < stride; ++i)
        {
            result[i] = output[prevKey * stride + i] * (1-t) + output[nextKey * stride + i] * t;
        }

        return result;
    }

    cubicSpline(prevKey, nextKey, output, keyDelta, t, stride)
    {
        // stride: Count of components (4 in a quaternion).
        // Scale by 3, because each output entry consist of two tangents and one data-point.
        const prevIndex = prevKey * stride * 3;
        const nextIndex = nextKey * stride * 3;
        const A = 0;
        const V = 1 * stride;
        const B = 2 * stride;

        const result = new ARRAY_TYPE(stride);
        const tSq = t ** 2;
        const tCub = t ** 3;

        // We assume that the components in output are laid out like this: in-tangent, point, out-tangent.
        // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#appendix-c-spline-interpolation
        for(let i = 0; i < stride; ++i)
        {
            const v0 = output[prevIndex + i + V];
            const a = keyDelta * output[nextIndex + i + A];
            const b = keyDelta * output[prevIndex + i + B];
            const v1 = output[nextIndex + i + V];

            result[i] = ((2*tCub - 3*tSq + 1) * v0) + ((tCub - 2*tSq + t) * b) + ((-2*tCub + 3*tSq) * v1) + ((tCub - tSq) * a);
        }

        return result;
    }

    resetKey()
    {
        this.prevKey = 0;
    }

    interpolate(gltf, channel, sampler, t, stride)
    {
        const input = gltf.accessors[sampler.input].getDeinterlacedView(gltf);
        const output = gltf.accessors[sampler.output].getDeinterlacedView(gltf);

        if(output.length === stride) // no interpolation for single keyFrame animations
        {
            return jsToGlSlice(output, 0, stride);
        }

        // Wrap t around, so the animation loops.
        // Make sure that t is never earlier than the first keyframe.
        t = Math.max(t % input[input.length - 1], input[0]);

        if (this.prevT > t)
        {
            this.prevKey = 0;
        }

        this.prevT = t;

        // Find next keyframe: min{ t of input | t > prevKey }
        let nextKey = null;
        for (let i = this.prevKey; i < input.length; ++i)
        {
            if (t <= input[i])
            {
                nextKey = clamp(i, 1, input.length - 1);
                break;
            }
        }
        this.prevKey = clamp(nextKey - 1, 0, nextKey);

        const keyDelta = input[nextKey] - input[this.prevKey];

        // Normalize t: [t0, t1] -> [0, 1]
        const tn = (t - input[this.prevKey]) / keyDelta;

        if(channel.target.path === InterpolationPath.ROTATION)
        {

            if(InterpolationModes.CUBICSPLINE === sampler.interpolation)
            {
                // GLTF requires cubic spline interpolation for quaternions.
                // https://github.com/KhronosGroup/glTF/issues/1386
                const result = this.cubicSpline(this.prevKey, nextKey, output, keyDelta, tn, 4);
                normalize$2(result, result);
                return result;
            }
            else {
                const q0 = this.getQuat(output, this.prevKey);
                const q1 = this.getQuat(output, nextKey);
                return this.slerpQuat(q0, q1, tn);
            }

        }

        switch(sampler.interpolation)
        {
        case InterpolationModes.STEP:
            return jsToGlSlice(output, this.prevKey * stride, stride); // t < 0.5 ? output[preKey] : output[nextKey]
        case InterpolationModes.CUBICSPLINE:
            return this.cubicSpline(this.prevKey, nextKey, output, keyDelta, tn, stride);
        default:
            return this.linear(this.prevKey, nextKey, output, tn, stride);
        }
    }

    getQuat(output, index)
    {
        const x = output[4 * index];
        const y = output[4 * index + 1];
        const z = output[4 * index + 2];
        const w = output[4 * index + 3];
        return fromValues$2(x, y, z, w);
    }
}

class gltfAnimation extends GltfObject
{
    constructor()
    {
        super();
        this.channels = [];
        this.samplers = [];
        this.name = '';

        // not gltf
        this.interpolators = [];
    }

    fromJson(jsonAnimation)
    {
        this.channels = objectsFromJsons(jsonAnimation.channels, gltfAnimationChannel);
        this.samplers = objectsFromJsons(jsonAnimation.samplers, gltfAnimationSampler);
        this.name = jsonAnimation.name;

        if(this.channels === undefined)
        {
            console.error("No channel data found for skin");
            return;
        }

        for(let i = 0; i < this.channels.length; ++i)
        {
            this.interpolators.push(new gltfInterpolator());
        }
    }

    advance(gltf, totalTime)
    {
        if(this.channels === undefined)
        {
            return;
        }

        for(let i = 0; i < this.interpolators.length; ++i)
        {
            const channel = this.channels[i];
            const sampler = this.samplers[channel.sampler];
            const interpolator = this.interpolators[i];

            const node = gltf.nodes[channel.target.node];

            switch(channel.target.path)
            {
            case InterpolationPath.TRANSLATION:
                node.applyTranslation(interpolator.interpolate(gltf, channel, sampler, totalTime, 3));
                break;
            case InterpolationPath.ROTATION:
                node.applyRotation(interpolator.interpolate(gltf, channel, sampler, totalTime, 4));
                break;
            case InterpolationPath.SCALE:
                node.applyScale(interpolator.interpolate(gltf, channel, sampler, totalTime, 3));
                break;
            case InterpolationPath.WEIGHTS:
            {
                const mesh = gltf.meshes[node.mesh];
                mesh.weights = interpolator.interpolate(gltf, channel, sampler, totalTime, mesh.weights.length);
                break;
            }
            }
        }
    }
}

class gltfSkin extends GltfObject
{
    constructor()
    {
        super();

        this.name = "";
        this.inverseBindMatrices = undefined;
        this.joints = [];
        this.skeleton = undefined;

        // not gltf
        this.jointMatrices = [];
        this.jointNormalMatrices = [];
    }

    computeJoints(gltf, parentNode)
    {
        const ibmAccessor = gltf.accessors[this.inverseBindMatrices].getDeinterlacedView(gltf);
        this.jointMatrices = [];
        this.jointNormalMatrices = [];

        let i = 0;
        for(const joint of this.joints)
        {
            const node = gltf.nodes[joint];

            let jointMatrix = create$1();
            let ibm = jsToGlSlice(ibmAccessor, i++ * 16, 16);
            mul(jointMatrix, node.worldTransform, ibm);
            mul(jointMatrix, parentNode.inverseWorldTransform, jointMatrix);
            this.jointMatrices.push(jointMatrix);

            let normalMatrix = create$1();
            invert(normalMatrix, jointMatrix);
            transpose(normalMatrix, normalMatrix);
            this.jointNormalMatrices.push(normalMatrix);
        }
    }
}

class glTF extends GltfObject
{
    constructor(file)
    {
        super();
        this.asset = undefined;
        this.accessors = [];
        this.nodes = [];
        this.scene = undefined; // the default scene to show.
        this.scenes = [];
        this.cameras = [];
        this.lights = [];
        this.imageBasedLights = [];
        this.textures = [];
        this.images = [];
        this.samplers = [];
        this.meshes = [];
        this.buffers = [];
        this.bufferViews = [];
        this.materials = [];
        this.animations = [];
        this.skins = [];
        this.path = file;
    }

    initGl()
    {
        initGlForMembers(this, this);
    }

    fromJson(json)
    {
        super.fromJson(json);

        this.asset = objectFromJson(json.asset, gltfAsset);
        this.cameras = objectsFromJsons(json.cameras, gltfCamera);
        this.accessors = objectsFromJsons(json.accessors, gltfAccessor);
        this.meshes = objectsFromJsons(json.meshes, gltfMesh);
        this.samplers = objectsFromJsons(json.samplers, gltfSampler);
        this.materials = objectsFromJsons(json.materials, gltfMaterial);
        this.buffers = objectsFromJsons(json.buffers, gltfBuffer);
        this.bufferViews = objectsFromJsons(json.bufferViews, gltfBufferView);
        this.scenes = objectsFromJsons(json.scenes, gltfScene);
        this.textures = objectsFromJsons(json.textures, gltfTexture);
        this.nodes = objectsFromJsons(json.nodes, gltfNode);
        this.lights = objectsFromJsons(getJsonLightsFromExtensions(json.extensions), gltfLight);
        this.imageBasedLights = objectsFromJsons(getJsonIBLsFromExtensions(json.extensions), ImageBasedLight);
        this.images = objectsFromJsons(json.images, gltfImage);
        this.animations = objectsFromJsons(json.animations, gltfAnimation);
        this.skins = objectsFromJsons(json.skins, gltfSkin);

        this.materials.push(gltfMaterial.createDefault());
        this.samplers.push(gltfSampler.createDefault());

        if (json.scenes !== undefined)
        {
            if (json.scene === undefined && json.scenes.length > 0)
            {
                this.scene = 0;
            }
            else
            {
                this.scene = json.scene;
            }
        }
    }
}

function getJsonLightsFromExtensions(extensions)
{
    if (extensions === undefined)
    {
        return [];
    }
    if (extensions.KHR_lights_punctual === undefined)
    {
        return [];
    }
    return extensions.KHR_lights_punctual.lights;
}

function getJsonIBLsFromExtensions(extensions)
{
    if (extensions === undefined)
    {
        return [];
    }
    if (extensions.KHR_lights_image_based === undefined)
    {
        return [];
    }
    return extensions.KHR_lights_image_based.imageBasedLights;
}

class gltfImageProcessor
{
    processImages(gltf)
    {
        for (const gltfImage of gltf.images)
        {
            const image = gltfImage.image;

            if (image instanceof HDRImage)
            {
                continue;
            }
            if (image instanceof Ktx2Image)
            {
                continue;
            }

            let newDimensions = undefined;

            if (image.width === image.height)
            {
                newDimensions = this.processSquareImage(image);
            }
            else
            {
                newDimensions = this.processNonSquareImage(image);
            }

            if (newDimensions.width === image.width && newDimensions.height === image.height)
            {
                continue;
            }

            this.resizeImage(image, newDimensions);
        }
    }

    processSquareImage(image)
    {
        const power = nearestPowerOf2(image.height);
        return { width: power, height: power };
    }

    processNonSquareImage(image)
    {
        return { width: nearestPowerOf2(makeEven(image.width)), height: nearestPowerOf2(makeEven(image.height)) };
    }

    resizeImage(image, newDimensions)
    {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = newDimensions.width;
        canvas.height = newDimensions.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        image.src = canvas.toDataURL("image/png");
    }
}

class gltfLoader
{
    static load(gltf, appendix = undefined)
    {
        const buffers = gltfLoader.getBuffers(appendix);
        const additionalFiles = gltfLoader.getAdditionalFiles(appendix);

        const buffersPromise = gltfLoader.loadBuffers(gltf, buffers, additionalFiles);
        const imagesPromise = gltfLoader.loadImages(gltf, additionalFiles)
            .then(() => gltfLoader.processImages(gltf));

        const initGlPromise = Promise.all([buffersPromise, imagesPromise])
            .then(() => gltf.initGl());

        return initGlPromise;
    }

    static unload(gltf)
    {
        for (let image of gltf.images)
        {
            image.image = undefined;
        }
        gltf.images = [];

        for (let texture of gltf.textures)
        {
            texture.destroy();
        }
        gltf.textures = [];

        for (let accessor of gltf.accessors)
        {
            accessor.destroy();
        }
        gltf.accessors = [];
    }

    static getBuffers(appendix)
    {
        return gltfLoader.getTypedAppendix(appendix, ArrayBuffer);
    }

    static getAdditionalFiles(appendix)
    {
        return gltfLoader.getTypedAppendix(appendix, File);
    }

    static getTypedAppendix(appendix, Type)
    {
        if (appendix && appendix.length > 0)
        {
            if (appendix[0] instanceof Type)
            {
                return appendix;
            }
        }
    }

    static loadBuffers(gltf, buffers, additionalFiles)
    {
        const promises = [];
        if (buffers)
        {
            const count = Math.min(buffers.length, gltf.buffers.length);
            for (let i = 0; i < count; ++i)
            {
                gltf.buffers[i].buffer = buffers[i];
            }
        }
        else
        {
            for (const buffer of gltf.buffers)
            {
                promises.push(buffer.load(gltf, additionalFiles));
            }
        }
        return Promise.all(promises);
    }

    static loadImages(gltf, additionalFiles)
    {
        const imagePromises = [];
        for (let image of gltf.images)
        {
            imagePromises.push(image.load(gltf, additionalFiles));
        }
        return Promise.all(imagePromises);
    }

    static processImages(gltf)
    {
        const imageProcessor = new gltfImageProcessor();
        imageProcessor.processImages(gltf);
    }
}

class gltfModelPathProvider
{
    constructor(modelIndexerPath, ignoredVariants = ["glTF-Draco", "glTF-Embedded"])
    {
        this.modelIndexerPath = modelIndexerPath;
        this.ignoredVariants = ignoredVariants;
        this.modelsDictionary = undefined;
    }

    initialize()
    {
        const self = this;
        return axios_min.get(this.modelIndexerPath).then(response =>
        {
            const modelIndexer = response.data;
            self.populateDictionary(modelIndexer);
        });
    }

    resolve(modelKey)
    {
        return this.modelsDictionary[modelKey];
    }

    getAllKeys()
    {
        return Object.keys(this.modelsDictionary);
    }

    pathExists(path)
    {
        return Object.values(this.modelsDictionary).find(p => p === path);
    }

    populateDictionary(modelIndexer)
    {
        const modelsFolder = getContainingFolder(this.modelIndexerPath);
        this.modelsDictionary = {};
        for (const entry of modelIndexer)
        {
            if (entry.variants === undefined)
            {
                continue;
            }

            for (const variant of Object.keys(entry.variants))
            {
                if (this.ignoredVariants.includes(variant))
                {
                    continue;
                }

                const fileName = entry.variants[variant];
                const modelPath = combinePaths(modelsFolder, entry.name, variant, fileName);
                let modelKey = getFileNameWithoutExtension(fileName);

                if (entry.name !== undefined)
                {
                    modelKey = entry.name;
                }
                if (variant !== "glTF")
                {
                    modelKey += " (" + variant.replace("glTF-", "") + ")";
                }

                this.modelsDictionary[modelKey] = modelPath;
            }
        }
    }
}

class gltfShader
{
    constructor(program, hash)
    {
        this.program = program;
        this.hash = hash;
        this.uniforms = new Map();
        this.attributes = new Map();
        this.unknownAttributes = [];
        this.unknownUniforms = [];

        if(this.program !== undefined)
        {
            const uniformCount = WebGl.context.getProgramParameter(this.program, WebGl.context.ACTIVE_UNIFORMS);
            for(let i = 0; i < uniformCount; ++i)
            {
                const info = WebGl.context.getActiveUniform(this.program, i);
                const loc = WebGl.context.getUniformLocation(this.program, info.name);
                this.uniforms.set(info.name, {type: info.type, loc: loc});
            }

            const attribCount = WebGl.context.getProgramParameter(this.program, WebGl.context.ACTIVE_ATTRIBUTES);
            for(let i = 0; i < attribCount; ++i)
            {
                const info = WebGl.context.getActiveAttrib(this.program, i);
                const loc = WebGl.context.getAttribLocation(this.program, info.name);
                this.attributes.set(info.name, loc);
            }
        }
    }

    destroy()
    {
        if (this.program !== undefined)
        {
            this.deleteProgram(this.program);
        }

        this.program = undefined;
    }

    getAttributeLocation(name)
    {
        const loc = this.attributes.get(name);
        if (loc === undefined)
        {
            if (this.unknownAttributes.find(n => n === name) === undefined)
            {
                console.log("Attribute '%s' does not exist", name);
                this.unknownAttributes.push(name);
            }
            return -1;
        }
        return loc;
    }

    getUniformLocation(name)
    {
        const uniform = this.uniforms.get(name);
        if (uniform === undefined)
        {
            if (this.unknownUniforms.find(n => n === name) === undefined)
            {
                this.unknownUniforms.push(name);
            }
            return -1;
        }
        return uniform.loc;
    }

    updateUniform(objectName, object, log = true)
    {
        if (object instanceof UniformStruct)
        {
            this.updateUniformStruct(objectName, object, log);
        }
        else if (Array.isArray(object))
        {
            this.updateUniformArray(objectName, object, log);
        }
        else
        {
            this.updateUniformValue(objectName, object, log);
        }
    }

    updateUniformArray(arrayName, array, log)
    {
        if(array[0] instanceof UniformStruct)
        {
            for (let i = 0; i < array.length; ++i)
            {
                let element = array[i];
                let uniformName = arrayName + "[" + i + "]";
                this.updateUniform(uniformName, element, log);
            }
        }else{
            let uniformName = arrayName + "[0]";

            let flat = [];

            if(Array.isArray(array[0]) || array[0].length !== undefined)
            {
                for (let i = 0; i < array.length; ++i)
                {
                    flat.push.apply(flat, Array.from(array[i]));
                }
            }
            else
            {
                flat = array;
            }

            if(flat.length === 0)
            {
                console.error("Failed to flatten uniform array " + uniformName);
                return;
            }

            this.updateUniformValue(uniformName, flat, log);
        }
    }

    updateUniformStruct(structName, object, log)
    {
        let memberNames = Object.keys(object);
        for (let memberName of memberNames)
        {
            let uniformName = structName + "." + memberName;
            this.updateUniform(uniformName, object[memberName], log);
        }
    }

    // upload the values of a uniform with the given name using type resolve to get correct function call
    updateUniformValue(uniformName, value, log)
    {
        const uniform = this.uniforms.get(uniformName);

        if(uniform !== undefined)
        {
            switch (uniform.type) {
            case WebGl.context.FLOAT:
            {
                if(Array.isArray(value) || value instanceof Float32Array)
                {
                    WebGl.context.uniform1fv(uniform.loc, value);
                }else{
                    WebGl.context.uniform1f(uniform.loc, value);
                }
                break;
            }
            case WebGl.context.FLOAT_VEC2: WebGl.context.uniform2fv(uniform.loc, value); break;
            case WebGl.context.FLOAT_VEC3: WebGl.context.uniform3fv(uniform.loc, value); break;
            case WebGl.context.FLOAT_VEC4: WebGl.context.uniform4fv(uniform.loc, value); break;

            case WebGl.context.INT:
            {
                if(Array.isArray(value) || value instanceof Uint32Array || value instanceof Int32Array)
                {
                    WebGl.context.uniform1iv(uniform.loc, value);
                }else{
                    WebGl.context.uniform1i(uniform.loc, value);
                }
                break;
            }
            case WebGl.context.INT_VEC2: WebGl.context.uniform2iv(uniform.loc, value); break;
            case WebGl.context.INT_VEC3: WebGl.context.uniform3iv(uniform.loc, value); break;
            case WebGl.context.INT_VEC4: WebGl.context.uniform4iv(uniform.loc, value); break;

            case WebGl.context.FLOAT_MAT2: WebGl.context.uniformMatrix2fv(uniform.loc, false, value); break;
            case WebGl.context.FLOAT_MAT3: WebGl.context.uniformMatrix3fv(uniform.loc, false, value); break;
            case WebGl.context.FLOAT_MAT4: WebGl.context.uniformMatrix4fv(uniform.loc, false, value); break;
            }
        }
        else if(log)
        {
            console.warn("Unkown uniform: " + uniformName);
        }
    }
}

// THis class generates and caches the shader source text for a given permutation
class ShaderCache
{
    constructor(sources)
    {
        this.sources  = sources; // shader name -> source code
        this.shaders  = new Map(); // name & permutations hashed -> compiled shader
        this.programs = new Map(); // (vertex shader, fragment shader) -> program

        // TODO: remove any // or /* style comments

        // resovle / expande sources (TODO: break include cycles)
        for (let [key, src] of this.sources)
        {
            let changed = false;
            for (let [includeName, includeSource] of this.sources)
            {
                //var pattern = RegExp(/#include</ + includeName + />/);
                const pattern = "#include <" + includeName + ">";

                if(src.includes(pattern))
                {
                    // only replace the first occurance
                    src = src.replace(pattern, includeSource);

                    // remove the others
                    while (src.includes(pattern))
                    {
                        src = src.replace(pattern, "");
                    }

                    changed = true;
                }
            }

            if(changed)
            {
                this.sources.set(key, src);
            }
        }
    }

    destroy()
    {
        for (let [, shader] of this.shaders.entries())
        {
            WebGl.context.deleteShader(shader);
            shader = undefined;
        }

        this.shaders.clear();

        for (let [, program] of this.programs)
        {
            program.destroy();
        }

        this.programs.clear();
    }

    // example args: "pbr.vert", ["NORMALS", "TANGENTS"]
    selectShader(shaderIdentifier, permutationDefines)
    {
        // first check shaders for the exact permutation
        // if not present, check sources and compile it
        // if not present, return null object

        const src = this.sources.get(shaderIdentifier);
        if(src === undefined)
        {
            console.log("Shader source for " + shaderIdentifier + " not found");
            return null;
        }

        const isVert = shaderIdentifier.endsWith(".vert");
        let hash = stringHash(shaderIdentifier);

        // console.log(shaderIdentifier);

        let defines = "#version 300 es\n";
        for(let define of permutationDefines)
        {
            // console.log(define);
            hash ^= stringHash(define);
            defines += "#define " + define + "\n";
        }

        let shader = this.shaders.get(hash);

        if(shader === undefined)
        {
            // console.log(defines);
            // compile this variant
            shader = WebGl.compileShader(shaderIdentifier, isVert, defines + src);
            this.shaders.set(hash, shader);
        }

        return hash;
    }

    getShaderProgram(vertexShaderHash, fragmentShaderHash)
    {
        const hash = combineHashes(vertexShaderHash, fragmentShaderHash);

        let program = this.programs.get(hash);

        if (program) // program already linked
        {
            return program;
        }
        else // link this shader program type!
        {
            let linkedProg = WebGl.linkProgram(this.shaders.get(vertexShaderHash), this.shaders.get(fragmentShaderHash));
            if(linkedProg)
            {
                let program = new gltfShader(linkedProg, hash);
                this.programs.set(hash, program);
                return program;
            }
        }

        return undefined;
    }
}

const UserCameraIndex = "orbit camera";

class gltfRenderingParameters
{
    constructor(
        environmentName = Object.keys(Environments)[0],
        useIBL = true,
        usePunctual = false,
        exposure = 1.0,
        clearColor = [50, 50, 50],
        toneMap = ToneMaps.LINEAR,
        debugOutput = DebugOutput.NONE)
    {
        this.environmentName = environmentName;
        this.useIBL = useIBL;
        this.usePunctual = usePunctual;
        this.exposure = exposure;
        this.clearColor = clearColor;
        this.toneMap = toneMap;
        this.debugOutput = debugOutput;
        this.sceneIndex = 0;
        this.cameraIndex = UserCameraIndex;
        this.animationTimer = new AnimationTimer();
        this.animationIndex = "all";
        this.skinning = true;
        this.morphing = true;
    }

    userCameraActive()
    {
        return this.cameraIndex === UserCameraIndex;
    }
}

const ToneMaps =
{
    LINEAR: "Linear",
    UNCHARTED: "Uncharted 2",
    HEJL_RICHARD: "Hejl Richard",
    ACES: "ACES"
};

const DebugOutput =
{
    NONE: "None",
    METALLIC: "Metallic",
    ROUGHNESS: "Roughness",
    NORMAL: "Normal",
    TANGENT: "Tangent",
    BITANGENT: "Bitangent",
    BASECOLOR: "Base Color",
    OCCLUSION: "Occlusion",
    EMISSIVE: "Emissive",
    DIFFUSE: "Diffuse",
    SPECULAR: "Specular",
    THICKNESS: "Thickness",
    CLEARCOAT: "ClearCoat",
    SHEEN: "Sheen",
    SUBSURFACE: "Subsurface",
    TRANSMISSION: "Transmission",
    ALPHA: "Alpha",
    F0: "F0"
};

const Environments =
{
    "Papermill Ruins E": { folder: "papermill", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Field": { folder: "field", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Courtyard of the Doge's palace": { folder: "doge2", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Pisa courtyard nearing sunset": { folder: "pisa", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Footprint Court": { folder: "footprint_court", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Helipad GoldenHour": { folder: "helipad", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Dining room of the Ennis-Brown House": { folder: "ennis", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Neutral": { folder: "neutral", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Directional": { folder: "directional", mipLevel: 11, type: ImageMimeType.KTX2 },
    "Chromatic": { folder: "chromatic", mipLevel: 11, type: ImageMimeType.KTX2 }
};

var pbrShader = "//\n// This fragment shader defines a reference implementation for Physically Based Shading of\n// a microfacet surface material defined by a glTF model.\n//\n// References:\n// [1] Real Shading in Unreal Engine 4\n//     http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf\n// [2] Physically Based Shading at Disney\n//     http://blog.selfshadow.com/publications/s2012-shading-course/burley/s2012_pbs_disney_brdf_notes_v3.pdf\n// [3] README.md - Environment Maps\n//     https://github.com/KhronosGroup/glTF-WebGL-PBR/#environment-maps\n// [4] \"An Inexpensive BRDF Model for Physically based Rendering\" by Christophe Schlick\n//     https://www.cs.virginia.edu/~jdl/bib/appearance/analytic%20models/schlick94b.pdf\n// [5] \"KHR_materials_clearcoat\"\n//     https://github.com/ux3d/glTF/tree/KHR_materials_pbrClearcoat/extensions/2.0/Khronos/KHR_materials_clearcoat\n// [6] \"KHR_materials_specular\"\n//     https://github.com/ux3d/glTF/tree/KHR_materials_pbrClearcoat/extensions/2.0/Khronos/KHR_materials_specular\n// [7] \"KHR_materials_subsurface\"\n//     https://github.com/KhronosGroup/glTF/pull/1766\n// [8] \"KHR_materials_thinfilm\"\n//     https://github.com/ux3d/glTF/tree/extensions/KHR_materials_thinfilm/extensions/2.0/Khronos/KHR_materials_thinfilm\n\nprecision highp float;\n#define GLSLIFY 1\n\n#include <tonemapping.glsl>\n#include <textures.glsl>\n#include <functions.glsl>\n#include <brdf.glsl>\n#include <punctual.glsl>\n#include <ibl.glsl>\n\nout vec4 g_finalColor;\n\n#ifdef USE_PUNCTUAL\nuniform Light u_Lights[LIGHT_COUNT];\n#endif\n\n// Metallic Roughness\nuniform float u_MetallicFactor;\nuniform float u_RoughnessFactor;\nuniform vec4 u_BaseColorFactor;\n\n// Specular Glossiness\nuniform vec3 u_SpecularFactor;\nuniform vec4 u_DiffuseFactor;\nuniform float u_GlossinessFactor;\n\n// Sheen\nuniform float u_SheenIntensityFactor;\nuniform vec3 u_SheenColorFactor;\nuniform float u_SheenRoughness;\n\n// Clearcoat\nuniform float u_ClearcoatFactor;\nuniform float u_ClearcoatRoughnessFactor;\n\n// Specular\nuniform float u_MetallicRoughnessSpecularFactor;\n\n// Anisotropy\nuniform float u_Anisotropy;\nuniform vec3 u_AnisotropyDirection;\n\n// Subsurface\nuniform float u_SubsurfaceScale;\nuniform float u_SubsurfaceDistortion;\nuniform float u_SubsurfacePower;\nuniform vec3 u_SubsurfaceColorFactor;\nuniform float u_SubsurfaceThicknessFactor;\n\n// Thin Film\nuniform float u_ThinFilmFactor;\nuniform float u_ThinFilmThicknessMinimum;\nuniform float u_ThinFilmThicknessMaximum;\n\n// IOR\nuniform float u_IOR;\n\n// Thickness\nuniform float u_Thickness;\n\n// Absorption\nuniform vec3 u_AbsorptionColor;\n\n// Transmission\nuniform float u_Transmission;\n\n// Alpha mode\nuniform float u_AlphaCutoff;\n\nuniform vec3 u_Camera;\n\nstruct MaterialInfo\n{\n    float perceptualRoughness;      // roughness value, as authored by the model creator (input to shader)\n    vec3 f0;                        // full reflectance color (normal incidence angle)\n\n    float alphaRoughness;           // roughness mapped to a more linear change in the roughness (proposed by [2])\n    vec3 albedoColor;\n\n    vec3 f90;                       // reflectance color at grazing angle\n    float metallic;\n\n    vec3 normal;\n    vec3 baseColor; // getBaseColor()\n\n    float sheenIntensity;\n    vec3 sheenColor;\n    float sheenRoughness;\n\n    float anisotropy;\n    vec3 anisotropicT;\n    vec3 anisotropicB;\n\n    vec3 clearcoatF0;\n    vec3 clearcoatF90;\n    float clearcoatFactor;\n    vec3 clearcoatNormal;\n    float clearcoatRoughness;\n\n    float subsurfaceScale;\n    float subsurfaceDistortion;\n    float subsurfacePower;\n    vec3 subsurfaceColor;\n    float subsurfaceThickness;\n\n    float thinFilmFactor;\n    float thinFilmThickness;\n\n    float thickness;\n\n    vec3 absorption;\n\n    float transmission;\n};\n\nvec4 getBaseColor()\n{\n    vec4 baseColor = vec4(1, 1, 1, 1);\n\n    #if defined(MATERIAL_SPECULARGLOSSINESS)\n        baseColor = u_DiffuseFactor;\n    #elif defined(MATERIAL_METALLICROUGHNESS)\n        baseColor = u_BaseColorFactor;\n    #endif\n\n    #if defined(MATERIAL_SPECULARGLOSSINESS) && defined(HAS_DIFFUSE_MAP)\n        baseColor *= sRGBToLinear(texture(u_DiffuseSampler, getDiffuseUV()));\n    #elif defined(MATERIAL_METALLICROUGHNESS) && defined(HAS_BASE_COLOR_MAP)\n        baseColor *= sRGBToLinear(texture(u_BaseColorSampler, getBaseColorUV()));\n    #endif\n\n    return baseColor * getVertexColor();\n}\n\nMaterialInfo getSpecularGlossinessInfo(MaterialInfo info)\n{\n    info.f0 = u_SpecularFactor;\n    info.perceptualRoughness = u_GlossinessFactor;\n\n#ifdef HAS_SPECULAR_GLOSSINESS_MAP\n    vec4 sgSample = sRGBToLinear(texture(u_SpecularGlossinessSampler, getSpecularGlossinessUV()));\n    info.perceptualRoughness *= sgSample.a ; // glossiness to roughness\n    info.f0 *= sgSample.rgb; // specular\n#endif // ! HAS_SPECULAR_GLOSSINESS_MAP\n\n    info.perceptualRoughness = 1.0 - info.perceptualRoughness; // 1 - glossiness\n    info.albedoColor = info.baseColor.rgb * (1.0 - max(max(info.f0.r, info.f0.g), info.f0.b));\n\n    return info;\n}\n\n// KHR_extension_specular alters f0 on metallic materials based on the specular factor specified in the extention\nfloat getMetallicRoughnessSpecularFactor()\n{\n    //F0 = 0.08 * specularFactor * specularTexture\n#ifdef HAS_METALLICROUGHNESS_SPECULAROVERRIDE_MAP\n    vec4 specSampler =  texture(u_MetallicRoughnessSpecularSampler, getMetallicRoughnessSpecularUV());\n    return 0.08 * u_MetallicRoughnessSpecularFactor * specSampler.a;\n#endif\n    return  0.08 * u_MetallicRoughnessSpecularFactor;\n}\n\nMaterialInfo getMetallicRoughnessInfo(MaterialInfo info, float ior)\n{\n    info.metallic = u_MetallicFactor;\n    info.perceptualRoughness = u_RoughnessFactor;\n\n#ifdef HAS_METALLIC_ROUGHNESS_MAP\n    // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.\n    // This layout intentionally reserves the 'r' channel for (optional) occlusion map data\n    vec4 mrSample = texture(u_MetallicRoughnessSampler, getMetallicRoughnessUV());\n    info.perceptualRoughness *= mrSample.g;\n    info.metallic *= mrSample.b;\n#endif\n\n#ifdef MATERIAL_METALLICROUGHNESS_SPECULAROVERRIDE\n    // Overriding the f0 creates unrealistic materials if the IOR does not match up.\n    vec3 f0 = vec3(getMetallicRoughnessSpecularFactor());\n#else\n    // Achromatic f0 based on IOR.\n    vec3 f0 = vec3(f0_ior(ior));\n#endif\n\n    info.albedoColor = mix(info.baseColor.rgb * (vec3(1.0) - f0),  vec3(0), info.metallic);\n    info.f0 = mix(f0, info.baseColor.rgb, info.metallic);\n\n    return info;\n}\n\nMaterialInfo getSheenInfo(MaterialInfo info)\n{\n    info.sheenColor = u_SheenColorFactor;\n    info.sheenIntensity = u_SheenIntensityFactor;\n    info.sheenRoughness = u_SheenRoughness;\n\n    #ifdef HAS_SHEEN_COLOR_INTENSITY_MAP\n        vec4 sheenSample = texture(u_SheenColorIntensitySampler, getSheenUV());\n        info.sheenColor *= sheenSample.xyz;\n        info.sheenIntensity *= sheenSample.w;\n    #endif\n\n    return info;\n}\n\n#ifdef MATERIAL_SUBSURFACE\nMaterialInfo getSubsurfaceInfo(MaterialInfo info)\n{\n    info.subsurfaceScale = u_SubsurfaceScale;\n    info.subsurfaceDistortion = u_SubsurfaceDistortion;\n    info.subsurfacePower = u_SubsurfacePower;\n    info.subsurfaceColor = u_SubsurfaceColorFactor;\n    info.subsurfaceThickness = u_SubsurfaceThicknessFactor;\n\n    #ifdef HAS_SUBSURFACE_COLOR_MAP\n        info.subsurfaceColor *= texture(u_SubsurfaceColorSampler, getSubsurfaceColorUV()).rgb;\n    #endif\n\n    #ifdef HAS_SUBSURFACE_THICKNESS_MAP\n        info.subsurfaceThickness *= texture(u_SubsurfaceThicknessSampler, getSubsurfaceThicknessUV()).r;\n    #endif\n\n    return info;\n}\n#endif\n\nvec3 getThinFilmF0(vec3 f0, vec3 f90, float NdotV, float thinFilmFactor, float thinFilmThickness)\n{\n    if (thinFilmFactor == 0.0)\n    {\n        // No thin film applied.\n        return f0;\n    }\n\n    vec3 lutSample = texture(u_ThinFilmLUT, vec2(thinFilmThickness, NdotV)).rgb - 0.5;\n    vec3 intensity = thinFilmFactor * 4.0 * f0 * (1.0 - f0);\n    return clamp(intensity * lutSample, 0.0, 1.0);\n}\n\n#ifdef MATERIAL_THIN_FILM\nMaterialInfo getThinFilmInfo(MaterialInfo info)\n{\n    info.thinFilmFactor = u_ThinFilmFactor;\n    info.thinFilmThickness = u_ThinFilmThicknessMaximum / 1200.0;\n\n    #ifdef HAS_THIN_FILM_MAP\n        info.thinFilmFactor *= texture(u_ThinFilmSampler, getThinFilmUV()).r;\n    #endif\n\n    #ifdef HAS_THIN_FILM_THICKNESS_MAP\n        float thicknessSampled = texture(u_ThinFilmThicknessSampler, getThinFilmThicknessUV()).g;\n        float thickness = mix(u_ThinFilmThicknessMinimum / 1200.0, u_ThinFilmThicknessMaximum / 1200.0, thicknessSampled);\n        info.thinFilmThickness = thickness;\n    #endif\n\n    return info;\n}\n#endif\n\nMaterialInfo getTransmissionInfo(MaterialInfo info)\n{\n    info.transmission = u_Transmission;\n    return info;\n}\n\nMaterialInfo getThicknessInfo(MaterialInfo info)\n{\n    info.thickness = 1.0;\n\n    #ifdef MATERIAL_THICKNESS\n    info.thickness = u_Thickness;\n\n    #ifdef HAS_THICKNESS_MAP\n    info.thickness *= texture(u_ThicknessSampler, getThicknessUV()).r;\n    #endif\n\n    #endif\n\n    return info;\n}\n\nMaterialInfo getAbsorptionInfo(MaterialInfo info)\n{\n    info.absorption = vec3(0.0);\n\n    #ifdef MATERIAL_ABSORPTION\n    info.absorption = u_AbsorptionColor;\n    #endif\n\n    return info;\n}\n\nMaterialInfo getAnisotropyInfo(MaterialInfo info, vec3 ng, mat3 TBN)\n{\n    info.anisotropy = u_Anisotropy;\n\n#ifdef HAS_ANISOTROPY_MAP\n    info.anisotropy *= texture(u_AnisotropySampler, getAnisotropyUV()).r * 2.0 - 1.0;\n#endif\n\n#ifdef HAS_ANISOTROPY_DIRECTION_MAP\n    vec3 direction = texture(u_AnisotropyDirectionSampler, getAnisotropyDirectionUV()).xyz * 2.0 - vec3(1.0);\n#else\n    vec3 direction = u_AnisotropyDirection;\n#endif\n\n    info.anisotropicT = normalize(TBN * direction);\n    info.anisotropicB = normalize(cross(ng, info.anisotropicT));\n\n    return info;\n}\n\nMaterialInfo getClearCoatInfo(MaterialInfo info, NormalInfo normalInfo)\n{\n    info.clearcoatFactor = u_ClearcoatFactor;\n    info.clearcoatRoughness = u_ClearcoatRoughnessFactor;\n    info.clearcoatF0 = vec3(0.04);\n    info.clearcoatF90 = vec3(clamp(info.clearcoatF0 * 50.0, 0.0, 1.0));\n\n    #ifdef HAS_CLEARCOAT_TEXTURE_MAP\n        vec4 ccSample = texture(u_ClearcoatSampler, getClearcoatUV());\n        info.clearcoatFactor *= ccSample.r;\n    #endif\n\n    #ifdef HAS_CLEARCOAT_ROUGHNESS_MAP\n        vec4 ccSampleRough = texture(u_ClearcoatRoughnessSampler, getClearcoatRoughnessUV());\n        info.clearcoatRoughness *= ccSampleRough.g;\n    #endif\n\n    #ifdef HAS_CLEARCOAT_NORMAL_MAP\n        vec4 ccSampleNor = texture(u_ClearcoatNormalSampler, getClearcoatNormalUV());\n        info.clearcoatNormal = ccSampleNor.xyz;\n    #else\n        info.clearcoatNormal = normalInfo.ng;\n    #endif\n\n    info.clearcoatRoughness = clamp(info.clearcoatRoughness, 0.0, 1.0);\n\n    return info;\n}\n\nvoid main()\n{\n    vec4 baseColor = getBaseColor();\n\n#ifdef ALPHAMODE_MASK\n    if(baseColor.a < u_AlphaCutoff)\n    {\n        discard;\n    }\n    baseColor.a = 1.0;\n#endif\n\n#ifdef ALPHAMODE_OPAQUE\n    baseColor.a = 1.0;\n#endif\n\n#ifdef MATERIAL_UNLIT\n    g_finalColor = (vec4(linearTosRGB(baseColor.rgb), baseColor.a));\n    return;\n#endif\n\n    vec3 view = normalize(u_Camera - v_Position);\n    NormalInfo normalInfo = getNormalInfo(view);\n    vec3 normal = normalInfo.ng;\n    vec3 tangent = normalInfo.tg;\n    vec3 bitangent = normalInfo.bg;\n    // normal = normalize(v_Normal);\n    // normal = -normal;\n    mat3 TBN = mat3(tangent, bitangent, normal);\n\n    float TdotV = dot(tangent, view);\n    float BdotV = dot(bitangent, view);\n\n    MaterialInfo materialInfo;\n    materialInfo.baseColor = baseColor.rgb;\n\n#ifdef MATERIAL_IOR\n    float ior = u_IOR;\n#else\n    // The default index of refraction of 1.5 yields a dielectric normal incidence reflectance of 0.04.\n    float ior = 1.5;\n#endif\n\n#ifdef MATERIAL_SPECULARGLOSSINESS\n    materialInfo = getSpecularGlossinessInfo(materialInfo);\n#endif\n\n#ifdef MATERIAL_METALLICROUGHNESS\n    materialInfo = getMetallicRoughnessInfo(materialInfo, ior);\n#endif\n\n#ifdef MATERIAL_SHEEN\n    materialInfo = getSheenInfo(materialInfo);\n#endif\n\n#ifdef MATERIAL_SUBSURFACE\n    materialInfo = getSubsurfaceInfo(materialInfo);\n#endif\n\n#ifdef MATERIAL_THIN_FILM\n    materialInfo = getThinFilmInfo(materialInfo);\n#endif\n\n#ifdef MATERIAL_CLEARCOAT\n    materialInfo = getClearCoatInfo(materialInfo, normalInfo);\n#endif\n\n#ifdef MATERIAL_TRANSMISSION\n    materialInfo = getTransmissionInfo(materialInfo);\n#endif\n\n#ifdef MATERIAL_ANISOTROPY\n    materialInfo = getAnisotropyInfo(materialInfo, normal, TBN);\n#endif\n\n    materialInfo = getThicknessInfo(materialInfo);\n    materialInfo = getAbsorptionInfo(materialInfo);\n\n    materialInfo.perceptualRoughness = clamp(materialInfo.perceptualRoughness, 0.0, 1.0);\n    materialInfo.metallic = clamp(materialInfo.metallic, 0.0, 1.0);\n\n    // Roughness is authored as perceptual roughness; as is convention,\n    // convert to material roughness by squaring the perceptual roughness.\n    materialInfo.alphaRoughness = materialInfo.perceptualRoughness * materialInfo.perceptualRoughness;\n\n    // Compute reflectance.\n    float reflectance = max(max(materialInfo.f0.r, materialInfo.f0.g), materialInfo.f0.b);\n\n    // Anything less than 2% is physically impossible and is instead considered to be shadowing. Compare to \"Real-Time-Rendering\" 4th editon on page 325.\n    materialInfo.f90 = vec3(clamp(reflectance * 50.0, 0.0, 1.0));\n\n    materialInfo.normal = normal;\n\n#ifdef MATERIAL_THIN_FILM\n    materialInfo.f0 = getThinFilmF0(materialInfo.f0, materialInfo.f90, clampedDot(normal, view),\n        materialInfo.thinFilmFactor, materialInfo.thinFilmThickness);\n#endif\n\n    // LIGHTING\n    vec3 f_specular = vec3(0.0);\n    vec3 f_diffuse = vec3(0.0);\n    vec3 f_emissive = vec3(0.0);\n    vec3 f_clearcoat = vec3(0.0);\n    vec3 f_sheen = vec3(0.0);\n    vec3 f_subsurface = vec3(0.0);\n    vec3 f_transmission = vec3(0.0);\n\n    // Calculate lighting contribution from image based lighting source (IBL)\n#ifdef USE_IBL\n    f_specular += getIBLRadianceGGX(normal, view, materialInfo.perceptualRoughness, materialInfo.f0);\n    f_diffuse += getIBLRadianceLambertian(normal, materialInfo.albedoColor);\n\n    #ifdef MATERIAL_CLEARCOAT\n        f_clearcoat += getIBLRadianceGGX(materialInfo.clearcoatNormal, view, materialInfo.clearcoatRoughness, materialInfo.clearcoatF0);\n    #endif\n\n    #ifdef MATERIAL_SHEEN\n        f_sheen += getIBLRadianceCharlie(normal, view, materialInfo.sheenRoughness, materialInfo.sheenColor, materialInfo.sheenIntensity);\n    #endif\n\n    #ifdef MATERIAL_SUBSURFACE\n        f_subsurface += getIBLRadianceSubsurface(normal, view, materialInfo.subsurfaceScale, materialInfo.subsurfaceDistortion, materialInfo.subsurfacePower, materialInfo.subsurfaceColor, materialInfo.subsurfaceThickness);\n    #endif\n\n    #ifdef MATERIAL_TRANSMISSION\n        f_transmission += getIBLRadianceTransmission(normal, view, materialInfo.perceptualRoughness, ior, materialInfo.baseColor);\n    #endif\n#endif\n\n#ifdef USE_PUNCTUAL\n    for (int i = 0; i < LIGHT_COUNT; ++i)\n    {\n        Light light = u_Lights[i];\n\n        vec3 pointToLight = -light.direction;\n        float rangeAttenuation = 1.0;\n        float spotAttenuation = 1.0;\n\n        if(light.type != LightType_Directional)\n        {\n            pointToLight = light.position - v_Position;\n        }\n\n        // point and spot\n        if (light.type != LightType_Directional)\n        {\n            rangeAttenuation = getRangeAttenuation(light.range, length(pointToLight));\n        }\n        if (light.type == LightType_Spot)\n        {\n            spotAttenuation = getSpotAttenuation(pointToLight, light.direction, light.outerConeCos, light.innerConeCos);\n        }\n\n        vec3 l = normalize(pointToLight);\n        vec3 intensity = rangeAttenuation * spotAttenuation * light.intensity * light.color;\n        AngularInfo angularInfo = getAngularInfo(pointToLight, materialInfo.normal, view);\n\n        if (angularInfo.NdotL > 0.0 || angularInfo.NdotV > 0.0)\n        {\n            // Calculation of analytical light\n            //https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB\n            f_diffuse += intensity * angularInfo.NdotL *  BRDF_lambertian(materialInfo.f0, materialInfo.f90, materialInfo.albedoColor, angularInfo.VdotH);\n\n            #ifdef MATERIAL_ANISOTROPY\n            vec3 h = normalize(l + view);\n            float TdotL = dot(materialInfo.anisotropicT, l);\n            float BdotL = dot(materialInfo.anisotropicB, l);\n            float TdotH = dot(materialInfo.anisotropicT, h);\n            float BdotH = dot(materialInfo.anisotropicB, h);\n            f_specular += intensity * angularInfo.NdotL * BRDF_specularAnisotropicGGX(materialInfo.f0, materialInfo.f90, materialInfo.alphaRoughness,\n                angularInfo.VdotH, angularInfo.NdotL, angularInfo.NdotV, angularInfo.NdotH,\n                BdotV, TdotV, TdotL, BdotL, TdotH, BdotH, materialInfo.anisotropy);\n            #else\n            f_specular += intensity * angularInfo.NdotL * BRDF_specularGGX(materialInfo.f0, materialInfo.f90, materialInfo.alphaRoughness, angularInfo.VdotH, angularInfo.NdotL, angularInfo.NdotV, angularInfo.NdotH);\n            #endif\n\n            #ifdef MATERIAL_SHEEN\n                f_sheen += intensity * getPunctualRadianceSheen(materialInfo.sheenColor, materialInfo.sheenIntensity, materialInfo.sheenRoughness,\n                    angularInfo.NdotL, angularInfo.NdotV, angularInfo.NdotH);\n            #endif\n\n            #ifdef MATERIAL_CLEARCOAT\n                f_clearcoat += intensity * getPunctualRadianceClearCoat(materialInfo.clearcoatNormal, view, l,\n                    materialInfo.clearcoatF0, materialInfo.clearcoatF90, materialInfo.clearcoatRoughness);\n            #endif\n        }\n\n        #ifdef MATERIAL_SUBSURFACE\n            f_subsurface += intensity * getPunctualRadianceSubsurface(normal, view, l,\n                materialInfo.subsurfaceScale, materialInfo.subsurfaceDistortion, materialInfo.subsurfacePower,\n                materialInfo.subsurfaceColor, materialInfo.subsurfaceThickness);\n        #endif\n\n        #ifdef MATERIAL_TRANSMISSION\n            f_transmission += intensity * getPunctualRadianceTransmission(normal, view, l, materialInfo.alphaRoughness, ior, materialInfo.f0);\n        #endif\n    }\n#endif // !USE_PUNCTUAL\n\n    f_emissive = u_EmissiveFactor;\n#ifdef HAS_EMISSIVE_MAP\n    f_emissive *= sRGBToLinear(texture(u_EmissiveSampler, getEmissiveUV())).rgb;\n#endif\n\n    vec3 color = vec3(0);\n\n///\n/// Layer blending\n///\n\n    float clearcoatFactor = 0.0;\n    vec3 clearcoatFresnel = vec3(0.0);\n\n    #ifdef MATERIAL_CLEARCOAT\n        clearcoatFactor = materialInfo.clearcoatFactor;\n        clearcoatFresnel = F_Schlick(materialInfo.clearcoatF0, materialInfo.clearcoatF90, clampedDot(materialInfo.clearcoatNormal, view));\n    #endif\n\n    #ifdef MATERIAL_ABSORPTION\n        f_transmission *= transmissionAbsorption(view, normal, ior, materialInfo.thickness, materialInfo.absorption);\n    #endif\n\n    #ifdef MATERIAL_TRANSMISSION\n    vec3 diffuse = mix(f_diffuse, f_transmission, materialInfo.transmission);\n    #else\n    vec3 diffuse = f_diffuse;\n    #endif\n\n    color = (f_emissive + diffuse + f_specular + f_subsurface + (1.0 - reflectance) * f_sheen) * (1.0 - clearcoatFactor * clearcoatFresnel) + f_clearcoat * clearcoatFactor;\n\n    float ao = 1.0;\n    // Apply optional PBR terms for additional (optional) shading\n#ifdef HAS_OCCLUSION_MAP\n    ao = texture(u_OcclusionSampler,  getOcclusionUV()).r;\n    color = mix(color, color * ao, u_OcclusionStrength);\n#endif\n\n#ifndef DEBUG_OUTPUT // no debug\n\n    // regular shading\n    g_finalColor = vec4(toneMap(color), baseColor.a);\n\n#else // debug output\n\n    #ifdef DEBUG_METALLIC\n        g_finalColor.rgb = vec3(materialInfo.metallic);\n    #endif\n\n    #ifdef DEBUG_ROUGHNESS\n        g_finalColor.rgb = vec3(materialInfo.perceptualRoughness);\n    #endif\n\n    #ifdef DEBUG_NORMAL\n        #ifdef HAS_NORMAL_MAP\n            g_finalColor.rgb = texture(u_NormalSampler, getNormalUV()).rgb;\n        #else\n            g_finalColor.rgb = vec3(0.5, 0.5, 1.0);\n        #endif\n    #endif\n\n    #ifdef DEBUG_TANGENT\n        g_finalColor.rgb = tangent * 0.5 + vec3(0.5);\n    #endif\n\n    #ifdef DEBUG_BITANGENT\n        g_finalColor.rgb = bitangent * 0.5 + vec3(0.5);\n    #endif\n\n    #ifdef DEBUG_BASECOLOR\n        g_finalColor.rgb = linearTosRGB(materialInfo.baseColor);\n    #endif\n\n    #ifdef DEBUG_OCCLUSION\n        g_finalColor.rgb = vec3(ao);\n    #endif\n\n    #ifdef DEBUG_F0\n        g_finalColor.rgb = materialInfo.f0;\n    #endif\n\n    #ifdef DEBUG_FEMISSIVE\n        g_finalColor.rgb = f_emissive;\n    #endif\n\n    #ifdef DEBUG_FSPECULAR\n        g_finalColor.rgb = f_specular;\n    #endif\n\n    #ifdef DEBUG_FDIFFUSE\n        g_finalColor.rgb = f_diffuse;\n    #endif\n\n    #ifdef DEBUG_THICKNESS\n        g_finalColor.rgb = vec3(materialInfo.thickness);\n    #endif\n\n    #ifdef DEBUG_FCLEARCOAT\n        g_finalColor.rgb = f_clearcoat;\n    #endif\n\n    #ifdef DEBUG_FSHEEN\n        g_finalColor.rgb = f_sheen;\n    #endif\n\n    #ifdef DEBUG_ALPHA\n        g_finalColor.rgb = vec3(baseColor.a);\n    #endif\n\n    #ifdef DEBUG_FSUBSURFACE\n        g_finalColor.rgb = f_subsurface;\n    #endif\n\n    #ifdef DEBUG_FTRANSMISSION\n        g_finalColor.rgb = linearTosRGB(f_transmission);\n    #endif\n\n    g_finalColor.a = 1.0;\n\n#endif // !DEBUG_OUTPUT\n}\n"; // eslint-disable-line

var brdfShader = "#define GLSLIFY 1\n// Compute the achromatic normal incidence reflectance based on a given index of refraction of a dielectric material.\n// The index of refraction of the surrounding is assumed to be 1.0, which is approximatly the case for air.\n// For an index of refraction of 1.5, this results the known default value of 0.04 reflectivity for dielectrics.\nfloat f0_ior(float ior)\n{\n    float f0 = sq((ior - 1.0) / (ior + 1.0));\n    return f0;\n}\n\n//\n// Fresnel\n//\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// https://github.com/wdas/brdf/tree/master/src/brdfs\n// https://google.github.io/filament/Filament.md.html\n//\n\nvec3 F_None(vec3 f0, vec3 f90, float VdotH)\n{\n    return f0;\n}\n\n// The following equation models the Fresnel reflectance term of the spec equation (aka F())\n// Implementation of fresnel from [4], Equation 15\nvec3 F_Schlick(vec3 f0, vec3 f90, float VdotH)\n{\n    return f0 + (f90 - f0) * pow(clamp(1.0 - VdotH, 0.0, 1.0), 5.0);\n}\n\nvec3 F_CookTorrance(vec3 f0, vec3 f90, float VdotH)\n{\n    vec3 f0_sqrt = sqrt(f0);\n    vec3 ior = (1.0 + f0_sqrt) / (1.0 - f0_sqrt);\n    vec3 c = vec3(VdotH);\n    vec3 g = sqrt(sq(ior) + c*c - 1.0);\n    return 0.5 * pow(g-c, vec3(2.0)) / pow(g+c, vec3(2.0)) * (1.0 + pow(c*(g+c) - 1.0, vec3(2.0)) / pow(c*(g-c) + 1.0, vec3(2.0)));\n}\n\n// Smith Joint GGX\n// Note: Vis = G / (4 * NdotL * NdotV)\n// see Eric Heitz. 2014. Understanding the Masking-Shadowing Function in Microfacet-Based BRDFs. Journal of Computer Graphics Techniques, 3\n// see Real-Time Rendering. Page 331 to 336.\n// see https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/geometricshadowing(specularg)\nfloat V_GGX(float NdotL, float NdotV, float alphaRoughness)\n{\n    float alphaRoughnessSq = alphaRoughness * alphaRoughness;\n\n    float GGXV = NdotL * sqrt(NdotV * NdotV * (1.0 - alphaRoughnessSq) + alphaRoughnessSq);\n    float GGXL = NdotV * sqrt(NdotL * NdotL * (1.0 - alphaRoughnessSq) + alphaRoughnessSq);\n\n    float GGX = GGXV + GGXL;\n    if (GGX > 0.0)\n    {\n        return 0.5 / GGX;\n    }\n    return 0.0;\n}\n\n// Anisotropic GGX visibility function, with height correlation.\n// T: Tanget, B: Bi-tanget\nfloat V_GGX_anisotropic(float NdotL, float NdotV, float BdotV, float TdotV, float TdotL, float BdotL, float anisotropy, float at, float ab)\n{\n    float GGXV = NdotL * length(vec3(at * TdotV, ab * BdotV, NdotV));\n    float GGXL = NdotV * length(vec3(at * TdotL, ab * BdotL, NdotL));\n    float v = 0.5 / (GGXV + GGXL);\n    return clamp(v, 0.0, 1.0);\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L136\n// https://github.com/google/filament/blob/master/libs/ibl/src/CubemapIBL.cpp#L179\n// Note: Google call it V_Ashikhmin and V_Neubelt\nfloat V_Ashikhmin(float NdotL, float NdotV)\n{\n    return clamp(1.0 / (4.0 * (NdotL + NdotV - NdotL * NdotV)),0.0,1.0);\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L131\nfloat V_Kelemen(float LdotH)\n{\n    // Kelemen 2001, \"A Microfacet Based Coupled Specular-Matte BRDF Model with Importance Sampling\"\n    return 0.25 / (LdotH * LdotH);\n}\n\n// The following equation(s) model the distribution of microfacet normals across the area being drawn (aka D())\n// Implementation from \"Average Irregularity Representation of a Roughened Surface for Ray Reflection\" by T. S. Trowbridge, and K. P. Reitz\n// Follows the distribution function recommended in the SIGGRAPH 2013 course notes from EPIC Games [1], Equation 3.\nfloat D_GGX(float NdotH, float alphaRoughness)\n{\n    float alphaRoughnessSq = alphaRoughness * alphaRoughness;\n    float f = (NdotH * NdotH) * (alphaRoughnessSq - 1.0) + 1.0;\n    return alphaRoughnessSq / (M_PI * f * f);\n}\n\n// Anisotropic GGX NDF with a single anisotropy parameter controlling the normal orientation.\n// See https://google.github.io/filament/Filament.html#materialsystem/anisotropicmodel\n// T: Tanget, B: Bi-tanget\nfloat D_GGX_anisotropic(float NdotH, float TdotH, float BdotH, float anisotropy, float at, float ab)\n{\n    float a2 = at * ab;\n    vec3 f = vec3(ab * TdotH, at * BdotH, a2 * NdotH);\n    float w2 = a2 / dot(f, f);\n    return a2 * w2 * w2 / M_PI;\n}\n\nfloat D_Ashikhmin(float NdotH, float alphaRoughness)\n{\n    // Ashikhmin 2007, \"Distribution-based BRDFs\"\n    float a2 = alphaRoughness * alphaRoughness;\n    float cos2h = NdotH * NdotH;\n    float sin2h = 1.0 - cos2h;\n    float sin4h = sin2h * sin2h;\n    float cot2 = -cos2h / (a2 * sin2h);\n    return 1.0 / (M_PI * (4.0 * a2 + 1.0) * sin4h) * (4.0 * exp(cot2) + sin4h);\n}\n\n//Sheen implementation-------------------------------------------------------------------------------------\n// See  https://github.com/sebavan/glTF/tree/KHR_materials_sheen/extensions/2.0/Khronos/KHR_materials_sheen\n\n// Estevez and Kulla http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf\nfloat D_Charlie(float sheenRoughness, float NdotH)\n{\n    sheenRoughness = max(sheenRoughness, 0.000001); //clamp (0,1]\n    float alphaG = sheenRoughness * sheenRoughness;\n    float invR = 1.0 / alphaG;\n    float cos2h = NdotH * NdotH;\n    float sin2h = 1.0 - cos2h;\n    return (2.0 + invR) * pow(sin2h, invR * 0.5) / (2.0 * M_PI);\n}\n\n//https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB\nvec3 BRDF_lambertian(vec3 f0, vec3 f90, vec3 diffuseColor, float VdotH)\n{\n    // see https://seblagarde.wordpress.com/2012/01/08/pi-or-not-to-pi-in-game-lighting-equation/\n    return (1.0 - F_Schlick(f0, f90, VdotH)) * (diffuseColor / M_PI);\n}\n\n//  https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB\nvec3 BRDF_specularGGX(vec3 f0, vec3 f90, float alphaRoughness, float VdotH, float NdotL, float NdotV, float NdotH)\n{\n    vec3 F = F_Schlick(f0, f90, VdotH);\n    float Vis = V_GGX(NdotL, NdotV, alphaRoughness);\n    float D = D_GGX(NdotH, alphaRoughness);\n\n    return F * Vis * D;\n}\n\nvec3 BRDF_specularAnisotropicGGX(vec3 f0, vec3 f90, float alphaRoughness, float VdotH, float NdotL, float NdotV, float NdotH,\n    float BdotV, float TdotV, float TdotL, float BdotL, float TdotH, float BdotH, float anisotropy)\n{\n    // Roughness along tangent and bitangent.\n    // Christopher Kulla and Alejandro Conty. 2017. Revisiting Physically Based Shading at Imageworks\n    float at = max(alphaRoughness * (1.0 + anisotropy), 0.00001);\n    float ab = max(alphaRoughness * (1.0 - anisotropy), 0.00001);\n\n    vec3 F = F_Schlick(f0, f90, VdotH);\n    float V = V_GGX_anisotropic(NdotL, NdotV, BdotV, TdotV, TdotL, BdotL, anisotropy, at, ab);\n    float D = D_GGX_anisotropic(NdotH, TdotH, BdotH, anisotropy, at, ab);\n\n    return F * V * D;\n}\n\n// f_sheen\nvec3 BRDF_specularSheen(vec3 sheenColor, float sheenIntensity, float sheenRoughness, float NdotL, float NdotV, float NdotH)\n{\n    float sheenDistribution = D_Charlie(sheenRoughness, NdotH);\n    float sheenVisibility = V_Ashikhmin(NdotL, NdotV);\n    return sheenColor * sheenIntensity * sheenDistribution * sheenVisibility;\n}\n"; // eslint-disable-line

var iblShader = "#define GLSLIFY 1\nvec3 getIBLRadianceGGX(vec3 n, vec3 v, float perceptualRoughness, vec3 specularColor)\n{\n    float NdotV = clampedDot(n, v);\n    float lod = clamp(perceptualRoughness * float(u_MipCount), 0.0, float(u_MipCount));\n    vec3 reflection = normalize(reflect(-v, n));\n\n    vec2 brdfSamplePoint = clamp(vec2(NdotV, perceptualRoughness), vec2(0.0, 0.0), vec2(1.0, 1.0));\n    vec2 brdf = texture(u_GGXLUT, brdfSamplePoint).rg;\n    vec4 specularSample = textureLod(u_GGXEnvSampler, reflection, lod);\n\n    vec3 specularLight = specularSample.rgb;\n\n#ifndef USE_HDR\n    specularLight = sRGBToLinear(specularLight);\n#endif\n\n   return specularLight * (specularColor * brdf.x + brdf.y);\n}\n\nvec3 getIBLRadianceTransmission(vec3 n, vec3 v, float perceptualRoughness, float ior, vec3 baseColor)\n{\n    // Sample GGX LUT.\n    float NdotV = clampedDot(n, v);\n    vec2 brdfSamplePoint = clamp(vec2(NdotV, perceptualRoughness), vec2(0.0, 0.0), vec2(1.0, 1.0));\n    vec2 brdf = texture(u_GGXLUT, brdfSamplePoint).rg;\n\n    // Sample GGX environment map.\n    float lod = clamp(perceptualRoughness * float(u_MipCount), 0.0, float(u_MipCount));\n\n    // Approximate double refraction by assuming a solid sphere beneath the point.\n    vec3 r = refract(-v, n, 1.0 / ior);\n    vec3 m = 2.0 * dot(-n, r) * r + n;\n    vec3 rr = -refract(-r, m, ior);\n\n    vec4 specularSample = textureLod(u_GGXEnvSampler, rr, lod);\n    vec3 specularLight = specularSample.rgb;\n\n#ifndef USE_HDR\n    specularLight = sRGBToLinear(specularLight);\n#endif\n\n   return specularLight * (brdf.x + brdf.y);\n}\n\nvec3 getIBLRadianceLambertian(vec3 n, vec3 diffuseColor)\n{\n    vec3 diffuseLight = texture(u_LambertianEnvSampler, n).rgb;\n\n    #ifndef USE_HDR\n        diffuseLight = sRGBToLinear(diffuseLight);\n    #endif\n\n    return diffuseLight * diffuseColor;\n}\n\nvec3 getIBLRadianceCharlie(vec3 n, vec3 v, float sheenRoughness, vec3 sheenColor, float sheenIntensity)\n{\n    float NdotV = clampedDot(n, v);\n    float lod = clamp(sheenRoughness * float(u_MipCount), 0.0, float(u_MipCount));\n    vec3 reflection = normalize(reflect(-v, n));\n\n    vec2 brdfSamplePoint = clamp(vec2(NdotV, sheenRoughness), vec2(0.0, 0.0), vec2(1.0, 1.0));\n    float brdf = texture(u_CharlieLUT, brdfSamplePoint).b;\n    vec4 sheenSample = textureLod(u_CharlieEnvSampler, reflection, lod);\n\n    vec3 sheenLight = sheenSample.rgb;\n\n    #ifndef USE_HDR\n    sheenLight = sRGBToLinear(sheenLight);\n    #endif\n\n    return sheenIntensity * sheenLight * sheenColor * brdf;\n}\n\nvec3 getIBLRadianceSubsurface(vec3 n, vec3 v, float scale, float distortion, float power, vec3 color, float thickness)\n{\n    vec3 diffuseLight = texture(u_LambertianEnvSampler, n).rgb;\n\n    #ifndef USE_HDR\n        diffuseLight = sRGBToLinear(diffuseLight);\n    #endif\n\n    return diffuseLight * getPunctualRadianceSubsurface(n, v, -v, scale, distortion, power, color, thickness);\n}\n"; // eslint-disable-line

var punctualShader = "#define GLSLIFY 1\n// KHR_lights_punctual extension.\n// see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual\nstruct Light\n{\n    vec3 direction;\n    float range;\n\n    vec3 color;\n    float intensity;\n\n    vec3 position;\n    float innerConeCos;\n\n    float outerConeCos;\n    int type;\n\n    vec2 padding;\n};\n\nconst int LightType_Directional = 0;\nconst int LightType_Point = 1;\nconst int LightType_Spot = 2;\n\n// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#range-property\nfloat getRangeAttenuation(float range, float distance)\n{\n    if (range <= 0.0)\n    {\n        // negative range means unlimited\n        return 1.0;\n    }\n    return max(min(1.0 - pow(distance / range, 4.0), 1.0), 0.0) / pow(distance, 2.0);\n}\n\n// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#inner-and-outer-cone-angles\nfloat getSpotAttenuation(vec3 pointToLight, vec3 spotDirection, float outerConeCos, float innerConeCos)\n{\n    float actualCos = dot(normalize(spotDirection), normalize(-pointToLight));\n    if (actualCos > outerConeCos)\n    {\n        if (actualCos < innerConeCos)\n        {\n            return smoothstep(outerConeCos, innerConeCos, actualCos);\n        }\n        return 1.0;\n    }\n    return 0.0;\n}\n\nvec3 getPunctualRadianceSubsurface(vec3 n, vec3 v, vec3 l, float scale, float distortion, float power, vec3 color, float thickness)\n{\n    vec3 distortedHalfway = l + n * distortion;\n    float backIntensity = max(0.0, dot(v, -distortedHalfway));\n    float reverseDiffuse = pow(clamp(0.0, 1.0, backIntensity), power) * scale;\n    return (reverseDiffuse + color) * (1.0 - thickness);\n}\n\nvec3 getPunctualRadianceTransmission(vec3 n, vec3 v, vec3 l, float alphaRoughness, float ior, vec3 f0)\n{\n    vec3 r = refract(-v, n, 1.0 / ior);\n    vec3 h = normalize(l - r);\n    float NdotL = clampedDot(-n, l);\n    float NdotV = clampedDot(n, -r);\n\n    float Vis = V_GGX(clampedDot(-n, l), NdotV, alphaRoughness);\n    float D = D_GGX(clampedDot(r, l), alphaRoughness);\n\n    return NdotL * f0 * Vis * D;\n}\n\nvec3 getPunctualRadianceClearCoat(vec3 clearcoatNormal, vec3 v, vec3 l, vec3 f0, vec3 f90, float clearcoatRoughness)\n{\n    AngularInfo coatAngles = getAngularInfo(l, clearcoatNormal, v);\n    return coatAngles.NdotL * BRDF_specularGGX(f0, f90, clearcoatRoughness * clearcoatRoughness, coatAngles.VdotH, coatAngles.NdotL, coatAngles.NdotV, coatAngles.NdotH);\n}\n\nvec3 getPunctualRadianceSheen(vec3 sheenColor, float sheenIntensity, float sheenRoughness, float NdotL, float NdotV, float NdotH)\n{\n    return NdotL * BRDF_specularSheen(sheenColor, sheenIntensity, sheenRoughness, NdotL, NdotV, NdotH);\n}\n"; // eslint-disable-line

var primitiveShader = "#define GLSLIFY 1\n#include <animation.glsl>\n\nin vec3 a_Position;\nout vec3 v_Position;\n\n#ifdef HAS_NORMALS\nin vec3 a_Normal;\n#endif\n\n#ifdef HAS_TANGENTS\nin vec4 a_Tangent;\n#endif\n\n#ifdef HAS_NORMALS\n#ifdef HAS_TANGENTS\nout mat3 v_TBN;\n#else\nout vec3 v_Normal;\n#endif\n#endif\n\n#ifdef HAS_UV_SET1\nin vec2 a_UV1;\n#endif\n\n#ifdef HAS_UV_SET2\nin vec2 a_UV2;\n#endif\n\nout vec2 v_UVCoord1;\nout vec2 v_UVCoord2;\n\n#ifdef HAS_VERTEX_COLOR_VEC3\nin vec3 a_Color;\nout vec3 v_Color;\n#endif\n\n#ifdef HAS_VERTEX_COLOR_VEC4\nin vec4 a_Color;\nout vec4 v_Color;\n#endif\n\nuniform mat4 u_ViewProjectionMatrix;\nuniform mat4 u_ModelMatrix;\nuniform mat4 u_NormalMatrix;\n\nvec4 getPosition()\n{\n    vec4 pos = vec4(a_Position, 1.0);\n\n#ifdef USE_MORPHING\n    pos += getTargetPosition();\n#endif\n\n#ifdef USE_SKINNING\n    pos = getSkinningMatrix() * pos;\n#endif\n\n    return pos;\n}\n\n#ifdef HAS_NORMALS\nvec3 getNormal()\n{\n    vec3 normal = a_Normal;\n\n#ifdef USE_MORPHING\n    normal += getTargetNormal();\n#endif\n\n#ifdef USE_SKINNING\n    normal = mat3(getSkinningNormalMatrix()) * normal;\n#endif\n\n    return normalize(normal);\n}\n#endif\n\n#ifdef HAS_TANGENTS\nvec3 getTangent()\n{\n    vec3 tangent = a_Tangent.xyz;\n\n#ifdef USE_MORPHING\n    tangent += getTargetTangent();\n#endif\n\n#ifdef USE_SKINNING\n    tangent = mat3(getSkinningMatrix()) * tangent;\n#endif\n\n    return normalize(tangent);\n}\n#endif\n\nvoid main()\n{\n    vec4 pos = u_ModelMatrix * getPosition();\n    v_Position = vec3(pos.xyz) / pos.w;\n\n    #ifdef HAS_NORMALS\n    #ifdef HAS_TANGENTS\n        vec3 tangent = getTangent();\n        vec3 normalW = normalize(vec3(u_NormalMatrix * vec4(getNormal(), 0.0)));\n        vec3 tangentW = normalize(vec3(u_ModelMatrix * vec4(tangent, 0.0)));\n        vec3 bitangentW = cross(normalW, tangentW) * a_Tangent.w;\n        v_TBN = mat3(tangentW, bitangentW, normalW);\n    #else // !HAS_TANGENTS\n        v_Normal = normalize(vec3(u_NormalMatrix * vec4(getNormal(), 0.0)));\n    #endif\n    #endif // !HAS_NORMALS\n\n    v_UVCoord1 = vec2(0.0, 0.0);\n    v_UVCoord2 = vec2(0.0, 0.0);\n\n    #ifdef HAS_UV_SET1\n        v_UVCoord1 = a_UV1;\n    #endif\n\n    #ifdef HAS_UV_SET2\n        v_UVCoord2 = a_UV2;\n    #endif\n\n    #if defined(HAS_VERTEX_COLOR_VEC3) || defined(HAS_VERTEX_COLOR_VEC4)\n        v_Color = a_Color;\n    #endif\n\n    gl_Position = u_ViewProjectionMatrix * pos;\n}\n"; // eslint-disable-line

var texturesShader = "#define GLSLIFY 1\nin vec2 v_UVCoord1;\nin vec2 v_UVCoord2;\n\n// General Material\nuniform sampler2D u_NormalSampler;\nuniform float u_NormalScale;\nuniform int u_NormalUVSet;\nuniform mat3 u_NormalUVTransform;\n\nuniform vec3 u_EmissiveFactor;\nuniform sampler2D u_EmissiveSampler;\nuniform int u_EmissiveUVSet;\nuniform mat3 u_EmissiveUVTransform;\n\nuniform sampler2D u_OcclusionSampler;\nuniform int u_OcclusionUVSet;\nuniform float u_OcclusionStrength;\nuniform mat3 u_OcclusionUVTransform;\n\n// Metallic Roughness Material\nuniform sampler2D u_BaseColorSampler;\nuniform int u_BaseColorUVSet;\nuniform mat3 u_BaseColorUVTransform;\n\nuniform sampler2D u_MetallicRoughnessSampler;\nuniform int u_MetallicRoughnessUVSet;\nuniform mat3 u_MetallicRoughnessUVTransform;\n\n// Specular Glossiness Material\nuniform sampler2D u_DiffuseSampler;\nuniform int u_DiffuseUVSet;\nuniform mat3 u_DiffuseUVTransform;\n\nuniform sampler2D u_SpecularGlossinessSampler;\nuniform int u_SpecularGlossinessUVSet;\nuniform mat3 u_SpecularGlossinessUVTransform;\n\n// IBL\nuniform int u_MipCount;\nuniform samplerCube u_LambertianEnvSampler;\nuniform samplerCube u_GGXEnvSampler;\nuniform sampler2D u_GGXLUT;\nuniform samplerCube u_CharlieEnvSampler;\nuniform sampler2D u_CharlieLUT;\n\n//clearcoat\nuniform sampler2D u_ClearcoatSampler;\nuniform int u_ClearcoatUVSet;\nuniform mat3 u_ClearcoatUVTransform;\n\nuniform sampler2D u_ClearcoatRoughnessSampler;\nuniform int u_ClearcoatRoughnessUVSet;\nuniform mat3 u_ClearcoatRoughnessUVTransform;\n\nuniform sampler2D u_ClearcoatNormalSampler;\nuniform int u_ClearcoatNormalUVSet;\nuniform mat3 u_ClearcoatNormalUVTransform;\n\n//sheen\nuniform sampler2D u_SheenColorIntensitySampler;\nuniform int u_SheenColorIntensityUVSet;\nuniform mat3 u_SheenColorIntensityUVTransform;\n\n//specular\nuniform sampler2D u_MetallicRoughnessSpecularSampler;\nuniform int u_MetallicRougnessSpecularTextureUVSet;\nuniform mat3 u_MetallicRougnessSpecularUVTransform;\n\n//subsurface\nuniform sampler2D u_SubsurfaceColorSampler;\nuniform int u_SubsurfaceColorUVSet;\nuniform mat3 u_SubsurfaceColorUVTransform;\n\nuniform sampler2D u_SubsurfaceThicknessSampler;\nuniform int u_SubsurfaceThicknessUVSet;\nuniform mat3 u_SubsurfaceThicknessUVTransform;\n\n//thin film\nuniform sampler2D u_ThinFilmLUT;\n\nuniform sampler2D u_ThinFilmSampler;\nuniform int u_ThinFilmUVSet;\nuniform mat3 u_ThinFilmUVTransform;\n\nuniform sampler2D u_ThinFilmThicknessSampler;\nuniform int u_ThinFilmThicknessUVSet;\nuniform mat3 u_ThinFilmThicknessUVTransform;\n\n// Thickness:\nuniform sampler2D u_ThicknessSampler;\nuniform int u_ThicknessUVSet;\nuniform mat3 u_ThicknessUVTransform;\n\n// Anisotropy:\nuniform sampler2D u_AnisotropySampler;\nuniform int u_AnisotropyUVSet;\nuniform mat3 u_AnisotropyUVTransform;\nuniform sampler2D u_AnisotropyDirectionSampler;\nuniform int u_AnisotropyDirectionUVSet;\nuniform mat3 u_AnisotropyDirectionUVTransform;\n\nvec2 getNormalUV()\n{\n    vec3 uv = vec3(u_NormalUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_NORMAL_UV_TRANSFORM\n    uv *= u_NormalUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getEmissiveUV()\n{\n    vec3 uv = vec3(u_EmissiveUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_EMISSIVE_UV_TRANSFORM\n    uv *= u_EmissiveUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getOcclusionUV()\n{\n    vec3 uv = vec3(u_OcclusionUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_OCCLUSION_UV_TRANSFORM\n    uv *= u_OcclusionUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getBaseColorUV()\n{\n    vec3 uv = vec3(u_BaseColorUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_BASECOLOR_UV_TRANSFORM\n    uv *= u_BaseColorUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getMetallicRoughnessUV()\n{\n    vec3 uv = vec3(u_MetallicRoughnessUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_METALLICROUGHNESS_UV_TRANSFORM\n    uv *= u_MetallicRoughnessUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getSpecularGlossinessUV()\n{\n    vec3 uv = vec3(u_SpecularGlossinessUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_SPECULARGLOSSINESS_UV_TRANSFORM\n    uv *= u_SpecularGlossinessUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getDiffuseUV()\n{\n    vec3 uv = vec3(u_DiffuseUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_DIFFUSE_UV_TRANSFORM\n    uv *= u_DiffuseUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getClearcoatUV()\n{\n    vec3 uv = vec3(u_ClearcoatUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_CLEARCOAT_UV_TRANSFORM\n    uv *= u_ClearcoatUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getClearcoatRoughnessUV()\n{\n    vec3 uv = vec3(u_ClearcoatRoughnessUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_CLEARCOATROUGHNESS_UV_TRANSFORM\n    uv *= u_ClearcoatRoughnessUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getClearcoatNormalUV()\n{\n    vec3 uv = vec3(u_ClearcoatNormalUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_CLEARCOATNORMAL_UV_TRANSFORM\n    uv *= u_ClearcoatNormalUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getSheenUV()\n{\n    vec3 uv = vec3(u_SheenColorIntensityUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_SHEENCOLORINTENSITY_UV_TRANSFORM\n    uv *= u_SheenUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getMetallicRoughnessSpecularUV()\n{\n    vec3 uv = vec3(u_MetallicRougnessSpecularTextureUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_METALLICROUGHNESSSPECULAR_UV_TRANSFORM\n    uv *= u_MetallicRougnessSpecularUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getSubsurfaceColorUV()\n{\n    vec3 uv = vec3(u_SubsurfaceColorUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_SUBSURFACECOLOR_UV_TRANSFORM\n    uv *= u_SubsurfaceColorUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getSubsurfaceThicknessUV()\n{\n    vec3 uv = vec3(u_SubsurfaceThicknessUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n    #ifdef HAS_SUBSURFACETHICKNESS_UV_TRANSFORM\n    uv *= u_SubsurfaceThicknessUVTransform;\n    #endif\n    return uv.xy;\n}\n\nvec2 getThinFilmUV()\n{\n    vec3 uv = vec3(u_ThinFilmUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_THIN_FILM_UV_TRANSFORM\n    uv *= u_ThinFilmUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getThinFilmThicknessUV()\n{\n    vec3 uv = vec3(u_ThinFilmThicknessUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_THIN_FILM_THICKNESS_UV_TRANSFORM\n    uv *= u_ThinFilmThicknessUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getThicknessUV()\n{\n    vec3 uv = vec3(u_ThicknessUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_THICKNESS_UV_TRANSFORM\n    uv *= u_ThicknessUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getAnisotropyUV()\n{\n    vec3 uv = vec3(u_AnisotropyUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_ANISOTROPY_UV_TRANSFORM\n    uv *= u_AnisotropyUVTransform;\n    #endif\n\n    return uv.xy;\n}\n\nvec2 getAnisotropyDirectionUV()\n{\n    vec3 uv = vec3(u_AnisotropyDirectionUVSet < 1 ? v_UVCoord1 : v_UVCoord2, 1.0);\n\n    #ifdef HAS_ANISOTROPY_DIRECTION_UV_TRANSFORM\n    uv *= u_AnisotropyDirectionUVTransform;\n    #endif\n\n    return uv.xy;\n}\n"; // eslint-disable-line

var tonemappingShader = "#define GLSLIFY 1\nuniform float u_Exposure;\n\nconst float GAMMA = 2.2;\nconst float INV_GAMMA = 1.0 / GAMMA;\n\n// linear to sRGB approximation\n// see http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html\nvec3 linearTosRGB(vec3 color)\n{\n    return pow(color, vec3(INV_GAMMA));\n}\n\n// sRGB to linear approximation\n// see http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html\nvec3 sRGBToLinear(vec3 srgbIn)\n{\n    return vec3(pow(srgbIn.xyz, vec3(GAMMA)));\n}\n\nvec4 sRGBToLinear(vec4 srgbIn)\n{\n    return vec4(sRGBToLinear(srgbIn.xyz), srgbIn.w);\n}\n\n// Uncharted 2 tone map\n// see: http://filmicworlds.com/blog/filmic-tonemapping-operators/\nvec3 toneMapUncharted2Impl(vec3 color)\n{\n    const float A = 0.15;\n    const float B = 0.50;\n    const float C = 0.10;\n    const float D = 0.20;\n    const float E = 0.02;\n    const float F = 0.30;\n    return ((color*(A*color+C*B)+D*E)/(color*(A*color+B)+D*F))-E/F;\n}\n\nvec3 toneMapUncharted(vec3 color)\n{\n    const float W = 11.2;\n    color = toneMapUncharted2Impl(color * 2.0);\n    vec3 whiteScale = 1.0 / toneMapUncharted2Impl(vec3(W));\n    return linearTosRGB(color * whiteScale);\n}\n\n// Hejl Richard tone map\n// see: http://filmicworlds.com/blog/filmic-tonemapping-operators/\nvec3 toneMapHejlRichard(vec3 color)\n{\n    color = max(vec3(0.0), color - vec3(0.004));\n    return (color*(6.2*color+.5))/(color*(6.2*color+1.7)+0.06);\n}\n\n// ACES tone map\n// see: https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/\nvec3 toneMapACES(vec3 color)\n{\n    const float A = 2.51;\n    const float B = 0.03;\n    const float C = 2.43;\n    const float D = 0.59;\n    const float E = 0.14;\n    return linearTosRGB(clamp((color * (A * color + B)) / (color * (C * color + D) + E), 0.0, 1.0));\n}\n\nvec3 toneMap(vec3 color)\n{\n    color *= u_Exposure;\n\n#ifdef TONEMAP_UNCHARTED\n    return toneMapUncharted(color);\n#endif\n\n#ifdef TONEMAP_HEJLRICHARD\n    return toneMapHejlRichard(color);\n#endif\n\n#ifdef TONEMAP_ACES\n    return toneMapACES(color);\n#endif\n\n    return linearTosRGB(color);\n}\n"; // eslint-disable-line

var shaderFunctions = "#define GLSLIFY 1\n// textures.glsl needs to be included\n\nconst float M_PI = 3.141592653589793;\n\nin vec3 v_Position;\n\n#ifdef HAS_NORMALS\n#ifdef HAS_TANGENTS\nin mat3 v_TBN;\n#else\nin vec3 v_Normal;\n#endif\n#endif\n\n#ifdef HAS_VERTEX_COLOR_VEC3\nin vec3 v_Color;\n#endif\n#ifdef HAS_VERTEX_COLOR_VEC4\nin vec4 v_Color;\n#endif\n\nstruct AngularInfo\n{\n    float NdotL;                  // cos angle between normal and light direction\n    float NdotV;                  // cos angle between normal and view direction\n    float NdotH;                  // cos angle between normal and half vector\n    float LdotH;                  // cos angle between light direction and half vector\n\n    float VdotH;                  // cos angle between view direction and half vector\n\n    vec3 padding;\n};\n\nvec4 getVertexColor()\n{\n   vec4 color = vec4(1.0, 1.0, 1.0, 1.0);\n\n#ifdef HAS_VERTEX_COLOR_VEC3\n    color.rgb = v_Color;\n#endif\n#ifdef HAS_VERTEX_COLOR_VEC4\n    color = v_Color;\n#endif\n\n   return color;\n}\n\nstruct NormalInfo {\n    vec3 n;  // Normal\n    vec3 t;  // Tangent\n    vec3 b;  // Bitangent\n    vec3 ng; // Geometric normal\n    vec3 tg; // Geometric tangent\n    vec3 bg; // Geometric bitangent\n};\n\n// Get normal, tangent and bitangent vectors.\nNormalInfo getNormalInfo(vec3 v)\n{\n    vec2 UV = getNormalUV();\n\n    // Retrieve the tangent space matrix\n#ifdef HAS_TANGENTS\n    mat3 tbn = v_TBN;\n#else\n    vec3 pos_dx = dFdx(v_Position);\n    vec3 pos_dy = dFdy(v_Position);\n\n#ifdef HAS_NORMALS\n    vec3 ng = normalize(v_Normal);\n#else\n    vec3 ng = cross(pos_dx, pos_dy);\n#endif // !HAS_NORMALS\n\n    vec3 tex_dx = dFdx(vec3(UV, 0.0));\n    vec3 tex_dy = dFdy(vec3(UV, 0.0));\n    vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);\n    t = normalize(t - ng * dot(ng, t));\n    vec3 b = normalize(cross(ng, t));\n    mat3 tbn = mat3(t, b, ng);\n#endif // !HAS_TANGENTS\n\n    // For a back-facing surface, the tangential basis is inverted.\n    if (dot(v, tbn[2]) < 0.0) {\n        tbn *= -1.0;\n    }\n\n    NormalInfo info;\n    info.tg = normalize(tbn[0].xyz);\n    info.bg = normalize(tbn[1].xyz);\n    info.ng = normalize(tbn[2].xyz);\n\n#ifdef HAS_NORMAL_MAP\n    vec3 n = texture(u_NormalSampler, UV).rgb;\n    n = 2.0 * n - 1.0; // Map normal range from [0.0, 1.0] to [-1.0, 1.0].\n    n *= vec3(u_NormalScale, u_NormalScale, 1.0); // Scale normal according to normal texture info.\n    info.n = normalize(tbn * n); // Re-normalized because the tbn matrix is linearly interpolated.\n    info.t = info.tg;\n    info.b = info.bg;\n#else\n    info.t = info.tg;\n    info.b = info.bg;\n    info.n = info.ng;\n#endif\n\n    return info;\n}\n\nAngularInfo getAngularInfo(vec3 pointToLight, vec3 normal, vec3 view)\n{\n    // Standard one-letter names\n    vec3 n = normalize(normal);           // Outward direction of surface point\n    vec3 v = normalize(view);             // Direction from surface point to view\n    vec3 l = normalize(pointToLight);     // Direction from surface point to light\n    vec3 h = normalize(l + v);            // Direction of the vector between l and v\n\n    float NdotL = clamp(dot(n, l), 0.0, 1.0);\n    float NdotV = clamp(dot(n, v), 0.0, 1.0);\n    float NdotH = clamp(dot(n, h), 0.0, 1.0);\n    float LdotH = clamp(dot(l, h), 0.0, 1.0);\n    float VdotH = clamp(dot(v, h), 0.0, 1.0);\n\n    return AngularInfo(\n        NdotL,\n        NdotV,\n        NdotH,\n        LdotH,\n        VdotH,\n        vec3(0, 0, 0)\n    );\n}\n\nfloat clampedDot(vec3 x, vec3 y)\n{\n    return clamp(dot(x, y), 0.0, 1.0);\n}\n\nfloat sq(float t)\n{\n    return t * t;\n}\n\nvec2 sq(vec2 t)\n{\n    return t * t;\n}\n\nvec3 sq(vec3 t)\n{\n    return t * t;\n}\n\nvec4 sq(vec4 t)\n{\n    return t * t;\n}\n\nvec3 transmissionAbsorption(vec3 v, vec3 n, float ior, float thickness, vec3 absorptionColor)\n{\n    vec3 r = refract(-v, n, 1.0 / ior);\n    return exp(-absorptionColor * thickness * dot(-n, r));\n}\n"; // eslint-disable-line

var animationShader = "#define GLSLIFY 1\n#ifdef HAS_TARGET_POSITION0\nin vec3 a_Target_Position0;\n#endif\n\n#ifdef HAS_TARGET_POSITION1\nin vec3 a_Target_Position1;\n#endif\n\n#ifdef HAS_TARGET_POSITION2\nin vec3 a_Target_Position2;\n#endif\n\n#ifdef HAS_TARGET_POSITION3\nin vec3 a_Target_Position3;\n#endif\n\n#ifdef HAS_TARGET_POSITION4\nin vec3 a_Target_Position4;\n#endif\n\n#ifdef HAS_TARGET_POSITION5\nin vec3 a_Target_Position5;\n#endif\n\n#ifdef HAS_TARGET_POSITION6\nin vec3 a_Target_Position6;\n#endif\n\n#ifdef HAS_TARGET_POSITION7\nin vec3 a_Target_Position7;\n#endif\n\n#ifdef HAS_TARGET_NORMAL0\nin vec3 a_Target_Normal0;\n#endif\n\n#ifdef HAS_TARGET_NORMAL1\nin vec3 a_Target_Normal1;\n#endif\n\n#ifdef HAS_TARGET_NORMAL2\nin vec3 a_Target_Normal2;\n#endif\n\n#ifdef HAS_TARGET_NORMAL3\nin vec3 a_Target_Normal3;\n#endif\n\n#ifdef HAS_TARGET_TANGENT0\nin vec3 a_Target_Tangent0;\n#endif\n\n#ifdef HAS_TARGET_TANGENT1\nin vec3 a_Target_Tangent1;\n#endif\n\n#ifdef HAS_TARGET_TANGENT2\nin vec3 a_Target_Tangent2;\n#endif\n\n#ifdef HAS_TARGET_TANGENT3\nin vec3 a_Target_Tangent3;\n#endif\n\n#ifdef USE_MORPHING\nuniform float u_morphWeights[WEIGHT_COUNT];\n#endif\n\n#ifdef HAS_JOINT_SET1\nin vec4 a_Joint1;\n#endif\n\n#ifdef HAS_JOINT_SET2\nin vec4 a_Joint2;\n#endif\n\n#ifdef HAS_WEIGHT_SET1\nin vec4 a_Weight1;\n#endif\n\n#ifdef HAS_WEIGHT_SET2\nin vec4 a_Weight2;\n#endif\n\n#ifdef USE_SKINNING\nuniform mat4 u_jointMatrix[JOINT_COUNT];\nuniform mat4 u_jointNormalMatrix[JOINT_COUNT];\n#endif\n\n#ifdef USE_SKINNING\nmat4 getSkinningMatrix()\n{\n    mat4 skin = mat4(0);\n\n    #if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)\n    skin +=\n        a_Weight1.x * u_jointMatrix[int(a_Joint1.x)] +\n        a_Weight1.y * u_jointMatrix[int(a_Joint1.y)] +\n        a_Weight1.z * u_jointMatrix[int(a_Joint1.z)] +\n        a_Weight1.w * u_jointMatrix[int(a_Joint1.w)];\n    #endif\n\n    #if defined(HAS_WEIGHT_SET2) && defined(HAS_JOINT_SET2)\n    skin +=\n        a_Weight2.x * u_jointMatrix[int(a_Joint2.x)] +\n        a_Weight2.y * u_jointMatrix[int(a_Joint2.y)] +\n        a_Weight2.z * u_jointMatrix[int(a_Joint2.z)] +\n        a_Weight2.w * u_jointMatrix[int(a_Joint2.w)];\n    #endif\n\n    return skin;\n}\n\nmat4 getSkinningNormalMatrix()\n{\n    mat4 skin = mat4(0);\n\n    #if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)\n    skin +=\n        a_Weight1.x * u_jointNormalMatrix[int(a_Joint1.x)] +\n        a_Weight1.y * u_jointNormalMatrix[int(a_Joint1.y)] +\n        a_Weight1.z * u_jointNormalMatrix[int(a_Joint1.z)] +\n        a_Weight1.w * u_jointNormalMatrix[int(a_Joint1.w)];\n    #endif\n\n    #if defined(HAS_WEIGHT_SET2) && defined(HAS_JOINT_SET2)\n    skin +=\n        a_Weight2.x * u_jointNormalMatrix[int(a_Joint2.x)] +\n        a_Weight2.y * u_jointNormalMatrix[int(a_Joint2.y)] +\n        a_Weight2.z * u_jointNormalMatrix[int(a_Joint2.z)] +\n        a_Weight2.w * u_jointNormalMatrix[int(a_Joint2.w)];\n    #endif\n\n    return skin;\n}\n#endif // !USE_SKINNING\n\n#ifdef USE_MORPHING\nvec4 getTargetPosition()\n{\n    vec4 pos = vec4(0);\n\n#ifdef HAS_TARGET_POSITION0\n    pos.xyz += u_morphWeights[0] * a_Target_Position0;\n#endif\n\n#ifdef HAS_TARGET_POSITION1\n    pos.xyz += u_morphWeights[1] * a_Target_Position1;\n#endif\n\n#ifdef HAS_TARGET_POSITION2\n    pos.xyz += u_morphWeights[2] * a_Target_Position2;\n#endif\n\n#ifdef HAS_TARGET_POSITION3\n    pos.xyz += u_morphWeights[3] * a_Target_Position3;\n#endif\n\n#ifdef HAS_TARGET_POSITION4\n    pos.xyz += u_morphWeights[4] * a_Target_Position4;\n#endif\n\n    return pos;\n}\n\nvec3 getTargetNormal()\n{\n    vec3 normal = vec3(0);\n\n#ifdef HAS_TARGET_NORMAL0\n    normal += u_morphWeights[0] * a_Target_Normal0;\n#endif\n\n#ifdef HAS_TARGET_NORMAL1\n    normal += u_morphWeights[1] * a_Target_Normal1;\n#endif\n\n#ifdef HAS_TARGET_NORMAL2\n    normal += u_morphWeights[2] * a_Target_Normal2;\n#endif\n\n#ifdef HAS_TARGET_NORMAL3\n    normal += u_morphWeights[3] * a_Target_Normal3;\n#endif\n\n#ifdef HAS_TARGET_NORMAL4\n    normal += u_morphWeights[4] * a_Target_Normal4;\n#endif\n\n    return normal;\n}\n\nvec3 getTargetTangent()\n{\n    vec3 tangent = vec3(0);\n\n#ifdef HAS_TARGET_TANGENT0\n    tangent += u_morphWeights[0] * a_Target_Tangent0;\n#endif\n\n#ifdef HAS_TARGET_TANGENT1\n    tangent += u_morphWeights[1] * a_Target_Tangent1;\n#endif\n\n#ifdef HAS_TARGET_TANGENT2\n    tangent += u_morphWeights[2] * a_Target_Tangent2;\n#endif\n\n#ifdef HAS_TARGET_TANGENT3\n    tangent += u_morphWeights[3] * a_Target_Tangent3;\n#endif\n\n#ifdef HAS_TARGET_TANGENT4\n    tangent += u_morphWeights[4] * a_Target_Tangent4;\n#endif\n\n    return tangent;\n}\n\n#endif // !USE_MORPHING\n"; // eslint-disable-line

class gltfRenderer
{
    constructor(canvas, defaultCamera, parameters, basePath)
    {
        this.canvas = canvas;
        this.defaultCamera = defaultCamera;
        this.parameters = parameters;
        this.basePath = basePath;
        this.shader = undefined; // current shader

        this.currentWidth  = 0;
        this.currentHeight = 0;

        const shaderSources = new Map();
        shaderSources.set("primitive.vert", primitiveShader);
        shaderSources.set("pbr.frag", pbrShader);
        shaderSources.set("brdf.glsl", brdfShader);
        shaderSources.set("ibl.glsl", iblShader);
        shaderSources.set("punctual.glsl", punctualShader);
        shaderSources.set("tonemapping.glsl", tonemappingShader);
        shaderSources.set("textures.glsl", texturesShader);
        shaderSources.set("functions.glsl", shaderFunctions);
        shaderSources.set("animation.glsl", animationShader);

        this.shaderCache = new ShaderCache(shaderSources);

        let requiredWebglExtensions = [
            "EXT_texture_filter_anisotropic",
            "OES_texture_float_linear"
        ];

        WebGl.loadWebGlExtensions(requiredWebglExtensions);

        this.visibleLights = [];

        this.viewMatrix = create$1();
        this.projMatrix = create$1();
        this.viewProjectionMatrix = create$1();

        this.currentCameraPosition = create$2();

        this.init();
        this.resize(canvas.clientWidth, canvas.clientHeight);
    }

    /////////////////////////////////////////////////////////////////////
    // Render glTF scene graph
    /////////////////////////////////////////////////////////////////////

    // app state
    init()
    {
        //TODO: To achieve correct rendering, WebGL runtimes must disable such conversions by setting UNPACK_COLORSPACE_CONVERSION_WEBGL flag to NONE
        WebGl.context.enable(WebGl.context.DEPTH_TEST);
        WebGl.context.depthFunc(WebGl.context.LEQUAL);
        WebGl.context.colorMask(true, true, true, true);
        WebGl.context.clearDepth(1.0);
    }

    resize(width, height)
    {
        if (this.currentWidth !== width || this.currentHeight !== height)
        {
            this.canvas.width  = width;
            this.canvas.height = height;
            this.currentHeight = height;
            this.currentWidth  = width;
            WebGl.context.viewport(0, 0, width, height);
        }
    }

    // frame state
    newFrame()
    {
        WebGl.context.clearColor(this.parameters.clearColor[0] / 255.0, this.parameters.clearColor[1] / 255.0, this.parameters.clearColor[2]  / 255.0, 1.0);
        WebGl.context.clear(WebGl.context.COLOR_BUFFER_BIT | WebGl.context.DEPTH_BUFFER_BIT);
    }

    // render complete gltf scene with given camera
    drawScene(gltf, scene, sortByDepth, predicateDrawPrimivitve)
    {
        if (scene.envData === undefined)
        {
            this.initializeEnvironment(gltf, scene);
        }

        let currentCamera = undefined;

        if(!this.parameters.userCameraActive())
        {
            currentCamera = gltf.cameras[this.parameters.cameraIndex].clone();
        }
        else
        {
            currentCamera = this.defaultCamera;
        }

        currentCamera.aspectRatio = this.currentWidth / this.currentHeight;

        this.projMatrix = currentCamera.getProjectionMatrix();
        this.viewMatrix = currentCamera.getViewMatrix(gltf);
        this.currentCameraPosition = currentCamera.getPosition(gltf);

        this.visibleLights = this.getVisibleLights(gltf, scene);

        multiply$1(this.viewProjectionMatrix, this.projMatrix, this.viewMatrix);

        const nodes = scene.gatherNodes(gltf);

        // Update skins.
        for(const node of nodes)
        {
            if(node.mesh !== undefined && node.skin !== undefined)
            {
                this.updateSkin(gltf, node);
            }
        }

        if(!sortByDepth)
        {
            for (const node of nodes)
            {
                let mesh = gltf.meshes[node.mesh];
                if (mesh !== undefined)
                {
                    for (let primitive of mesh.primitives)
                    {
                        if(predicateDrawPrimivitve ? predicateDrawPrimivitve(primitive) : true)
                        {
                            this.drawPrimitive(gltf, scene.envData, primitive, node, this.viewProjectionMatrix);
                        }
                    }
                }
            }
        }
        else
        {
            const sortedPrimitives = currentCamera.sortPrimitivesByDepth(gltf, nodes);

            for (const sortedPrimitive of sortedPrimitives)
            {
                if(predicateDrawPrimivitve ? predicateDrawPrimivitve(sortedPrimitive.primitive) : true)
                {
                    this.drawPrimitive(gltf, scene.envData, sortedPrimitive.primitive, sortedPrimitive.node, this.viewProjectionMatrix);
                }
            }
        }
    }

    // vertices with given material
    drawPrimitive(gltf, envData, primitive, node, viewProjectionMatrix)
    {
        if (primitive.skip) return;

        const material = gltf.materials[primitive.material];

        //select shader permutation, compile and link program.

        let vertDefines = [];
        this.pushVertParameterDefines(vertDefines, gltf, node, primitive);
        vertDefines = primitive.getDefines().concat(vertDefines);

        let fragDefines = material.getDefines().concat(vertDefines);
        this.pushFragParameterDefines(fragDefines);

        const fragmentHash = this.shaderCache.selectShader(material.getShaderIdentifier(), fragDefines);
        const vertexHash  = this.shaderCache.selectShader(primitive.getShaderIdentifier(), vertDefines);

        if (fragmentHash && vertexHash)
        {
            this.shader = this.shaderCache.getShaderProgram(fragmentHash, vertexHash);
        }

        if (this.shader === undefined)
        {
            return;
        }

        WebGl.context.useProgram(this.shader.program);

        if (this.parameters.usePunctual)
        {
            this.applyLights(gltf);
        }

        // update model dependant matrices once per node
        this.shader.updateUniform("u_ViewProjectionMatrix", viewProjectionMatrix);
        this.shader.updateUniform("u_ModelMatrix", node.worldTransform);
        this.shader.updateUniform("u_NormalMatrix", node.normalMatrix, false);
        this.shader.updateUniform("u_Exposure", this.parameters.exposure, false);
        this.shader.updateUniform("u_Camera", this.currentCameraPosition, false);

        this.updateAnimationUniforms(gltf, node, primitive);

        if  (determinant(node.worldTransform) < 0.0)
        {
            WebGl.context.frontFace(WebGl.context.CW);
        }
        else
        {
            WebGl.context.frontFace(WebGl.context.CCW);
        }

        if (material.doubleSided)
        {
            WebGl.context.disable(WebGl.context.CULL_FACE);
        }
        else
        {
            WebGl.context.enable(WebGl.context.CULL_FACE);
        }

        if(material.alphaMode === 'BLEND')
        {
            WebGl.context.enable(WebGl.context.BLEND);
            WebGl.context.blendFuncSeparate(WebGl.context.SRC_ALPHA, WebGl.context.ONE_MINUS_SRC_ALPHA, WebGl.context.SRC_ALPHA, WebGl.context.ONE_MINUS_SRC_ALPHA);
            WebGl.context.blendEquation(WebGl.context.FUNC_ADD);
        }
        else
        {
            WebGl.context.disable(WebGl.context.BLEND);
        }

        const drawIndexed = primitive.indices !== undefined;
        if (drawIndexed)
        {
            if (!WebGl.setIndices(gltf, primitive.indices))
            {
                return;
            }
        }

        let vertexCount = 0;
        for (const attribute of primitive.glAttributes)
        {
            const gltfAccessor = gltf.accessors[attribute.accessor];
            vertexCount = gltfAccessor.count;

            const location = this.shader.getAttributeLocation(attribute.name);
            if (location < 0)
            {
                continue; // only skip this attribute
            }
            if (!WebGl.enableAttribute(gltf, location, gltfAccessor))
            {
                return; // skip this primitive
            }
        }

        for(let [uniform, val] of material.getProperties().entries())
        {
            this.shader.updateUniform(uniform, val);
        }

        for(let i = 0; i < material.textures.length; ++i)
        {
            let info = material.textures[i];
            const location = this.shader.getUniformLocation(info.samplerName);
            if (location < 0)
            {
                continue; // only skip this texture
            }
            if (!WebGl.setTexture(location, gltf, info, i)) // binds texture and sampler
            {
                return; // skip this material
            }
        }

        const hasThinFilm = material.extensions != undefined && material.extensions.KHR_materials_thinfilm !== undefined;
        if (this.parameters.useIBL)
        {
            this.applyEnvironmentMap(gltf, envData, material.textures.length);
        }
        else if (hasThinFilm)
        {
            WebGl.setTexture(this.shader.getUniformLocation("u_ThinFilmLUT"), gltf, envData.thinFilmLUT, material.textures.length);
        }

        if (drawIndexed)
        {
            const indexAccessor = gltf.accessors[primitive.indices];
            WebGl.context.drawElements(primitive.mode, indexAccessor.count, indexAccessor.componentType, 0);
        }
        else
        {
            WebGl.context.drawArrays(primitive.mode, 0, vertexCount);
        }

        for (const attribute of primitive.glAttributes)
        {
            const location = this.shader.getAttributeLocation(attribute.name);
            if (location < 0)
            {
                continue; // skip this attribute
            }
            WebGl.context.disableVertexAttribArray(location);
        }
    }

    // returns all lights that are relevant for rendering or the default light if there are none
    getVisibleLights(gltf, scene)
    {
        let lights = [];
        for (let light of gltf.lights)
        {
            if (light.node !== undefined)
            {
                if (scene.includesNode(gltf, light.node))
                {
                    lights.push(light);
                }
            }
        }
        return lights.length > 0 ? lights : [ new gltfLight() ];
    }

    updateSkin(gltf, node)
    {
        if(this.parameters.skinning && gltf.skins !== undefined) // && !this.parameters.animationTimer.paused
        {
            const skin = gltf.skins[node.skin];
            skin.computeJoints(gltf, node);
        }
    }

    pushVertParameterDefines(vertDefines, gltf, node, primitive)
    {
        // skinning
        if(this.parameters.skinning && node.skin !== undefined && primitive.hasWeights && primitive.hasJoints)
        {
            const skin = gltf.skins[node.skin];

            vertDefines.push("USE_SKINNING 1");
            vertDefines.push("JOINT_COUNT " + skin.jointMatrices.length);
        }

        // morphing
        if(this.parameters.morphing && node.mesh !== undefined && primitive.targets.length > 0)
        {
            const mesh = gltf.meshes[node.mesh];
            if(mesh.weights !== undefined && mesh.weights.length > 0)
            {
                vertDefines.push("USE_MORPHING 1");
                vertDefines.push("WEIGHT_COUNT " + Math.min(mesh.weights.length, 8));
            }
        }
    }

    updateAnimationUniforms(gltf, node, primitive)
    {
        if(this.parameters.skinning && node.skin !== undefined && primitive.hasWeights && primitive.hasJoints)
        {
            const skin = gltf.skins[node.skin];

            this.shader.updateUniform("u_jointMatrix", skin.jointMatrices);
            this.shader.updateUniform("u_jointNormalMatrix", skin.jointNormalMatrices);
        }

        if(this.parameters.morphing && node.mesh !== undefined && primitive.targets.length > 0)
        {
            const mesh = gltf.meshes[node.mesh];
            if(mesh.weights !== undefined && mesh.weights.length > 0)
            {
                this.shader.updateUniformArray("u_morphWeights", mesh.weights);
            }
        }
    }

    pushFragParameterDefines(fragDefines)
    {
        if (this.parameters.usePunctual)
        {
            fragDefines.push("USE_PUNCTUAL 1");
            fragDefines.push("LIGHT_COUNT " + this.visibleLights.length);
        }

        if (this.parameters.useIBL)
        {
            fragDefines.push("USE_IBL 1");
        }

        if (Environments[this.parameters.environmentName].type === ImageMimeType.HDR || Environments[this.parameters.environmentName].type === ImageMimeType.KTX2)
        {
            fragDefines.push("USE_HDR 1");
        }

        switch(this.parameters.toneMap)
        {
        case(ToneMaps.UNCHARTED):
            fragDefines.push("TONEMAP_UNCHARTED 1");
            break;
        case(ToneMaps.HEJL_RICHARD):
            fragDefines.push("TONEMAP_HEJLRICHARD 1");
            break;
        case(ToneMaps.ACES):
            fragDefines.push("TONEMAP_ACES 1");
            break;
        }

        if(this.parameters.debugOutput !== DebugOutput.NONE)
        {
            fragDefines.push("DEBUG_OUTPUT 1");
        }

        switch(this.parameters.debugOutput)
        {
        case(DebugOutput.METALLIC):
            fragDefines.push("DEBUG_METALLIC 1");
            break;
        case(DebugOutput.ROUGHNESS):
            fragDefines.push("DEBUG_ROUGHNESS 1");
            break;
        case(DebugOutput.NORMAL):
            fragDefines.push("DEBUG_NORMAL 1");
            break;
        case(DebugOutput.TANGENT):
            fragDefines.push("DEBUG_TANGENT 1");
            break;
        case(DebugOutput.BITANGENT):
            fragDefines.push("DEBUG_BITANGENT 1");
            break;
        case(DebugOutput.BASECOLOR):
            fragDefines.push("DEBUG_BASECOLOR 1");
            break;
        case(DebugOutput.OCCLUSION):
            fragDefines.push("DEBUG_OCCLUSION 1");
            break;
        case(DebugOutput.EMISSIVE):
            fragDefines.push("DEBUG_FEMISSIVE 1");
            break;
        case(DebugOutput.SPECULAR):
            fragDefines.push("DEBUG_FSPECULAR 1");
            break;
        case(DebugOutput.DIFFUSE):
            fragDefines.push("DEBUG_FDIFFUSE 1");
            break;
        case(DebugOutput.THICKNESS):
            fragDefines.push("DEBUG_THICKNESS 1");
            break;
        case(DebugOutput.CLEARCOAT):
            fragDefines.push("DEBUG_FCLEARCOAT 1");
            break;
        case(DebugOutput.SHEEN):
            fragDefines.push("DEBUG_FSHEEN 1");
            break;
        case(DebugOutput.SUBSURFACE):
            fragDefines.push("DEBUG_FSUBSURFACE 1");
            break;
        case(DebugOutput.TRANSMISSION):
            fragDefines.push("DEBUG_FTRANSMISSION 1");
            break;
        case(DebugOutput.F0):
            fragDefines.push("DEBUG_F0 1");
            break;
        case(DebugOutput.ALPHA):
            fragDefines.push("DEBUG_ALPHA 1");
            break;
        }
    }

    applyLights(gltf)
    {
        let uniformLights = [];
        for (let light of this.visibleLights)
        {
            uniformLights.push(light.toUniform(gltf));
        }

        this.shader.updateUniform("u_Lights", uniformLights);
    }

    initializeEnvironment(gltf, scene)
    {
        scene.envData = {};

        if (scene !== undefined && scene.imageBasedLight !== undefined)
        {
            const diffuseTextureIndex = scene.imageBasedLight.diffuseEnvironmentTexture;
            const specularTextureIndex = scene.imageBasedLight.specularEnvironmentTexture;
            const sheenCubeMapIndex = scene.imageBasedLight.sheenEnvironmentTexture;

            scene.envData.diffuseEnvMap = new gltfTextureInfo(diffuseTextureIndex);
            scene.envData.specularEnvMap = new gltfTextureInfo(specularTextureIndex);
            scene.envData.sheenEnvMap = new gltfTextureInfo(sheenCubeMapIndex);

            scene.envData.mipCount = scene.imageBasedLight.levelCount;
        }
        else
        {
            const diffuseTextureIndex = gltf.textures.length - 6;
            const specularTextureIndex = gltf.textures.length - 5;
            const sheenTextureIndex = gltf.textures.length - 4;

            scene.envData.diffuseEnvMap = new gltfTextureInfo(diffuseTextureIndex, 0, true);
            scene.envData.specularEnvMap = new gltfTextureInfo(specularTextureIndex, 0, true);
            scene.envData.sheenEnvMap = new gltfTextureInfo(sheenTextureIndex, 0, true);

            scene.envData.mipCount = Environments[this.parameters.environmentName].mipLevel;
        }

        scene.envData.diffuseEnvMap.generateMips = false;
        scene.envData.specularEnvMap.generateMips = false;
        scene.envData.sheenEnvMap.generateMips = false;

        scene.envData.lut = new gltfTextureInfo(gltf.textures.length - 3);
        scene.envData.lut.generateMips = false;

        scene.envData.sheenLUT = new gltfTextureInfo(gltf.textures.length - 2);
        scene.envData.sheenLUT.generateMips = false;

        scene.envData.thinFilmLUT = new gltfTextureInfo(gltf.textures.length - 1);
        scene.envData.thinFilmLUT.generateMips = false;
    }

    applyEnvironmentMap(gltf, envData, texSlotOffset)
    {
        WebGl.setTexture(this.shader.getUniformLocation("u_LambertianEnvSampler"), gltf, envData.diffuseEnvMap, texSlotOffset);

        WebGl.setTexture(this.shader.getUniformLocation("u_GGXEnvSampler"), gltf, envData.specularEnvMap, texSlotOffset + 1);
        WebGl.setTexture(this.shader.getUniformLocation("u_GGXLUT"), gltf, envData.lut, texSlotOffset + 2);

        WebGl.setTexture(this.shader.getUniformLocation("u_CharlieEnvSampler"), gltf, envData.sheenEnvMap, texSlotOffset + 3);
        WebGl.setTexture(this.shader.getUniformLocation("u_CharlieLUT"), gltf, envData.sheenLUT, texSlotOffset + 4);

        WebGl.setTexture(this.shader.getUniformLocation("u_ThinFilmLUT"), gltf, envData.thinFilmLUT, texSlotOffset + 5);

        this.shader.updateUniform("u_MipCount", envData.mipCount);
    }

    destroy()
    {
        this.shaderCache.destroy();
    }
}

class gltfUserInterface
{
    constructor(
        modelPathProvider,
        selectedModel,
        renderingParameters,
        stats)
    {
        this.modelPathProvider = modelPathProvider;
        this.selectedModel = selectedModel;
        this.renderingParameters = renderingParameters;
        this.stats = stats;
        this.hexColor = this.toHexColor(this.renderingParameters.clearColor);
        this.version = "";
        this.sceneEnvironment = "Controlled by the scene";

        this.gui = undefined;
        this.gltfFolder = undefined;
        this.animationFolder = undefined;
        this.lightingFolder = undefined;
        this.updatables = [];

        this.onModelChanged = undefined;
        this.onEnvironmentChanged = undefined;

        this.playAnimation = false;
    }

    initialize()
    {
        this.gui = new dat.GUI({ width: 300 });

        this.initializeGltfFolder();
        this.initializeLightingSettings();
        this.initializeDebugSettings();
        this.initializeMonitoringView();
    }

    update(gltf)
    {
        for (const updatable of this.updatables)
        {
            updatable.update(gltf);
        }
    }

    initializeGltfFolder()
    {
        this.gltfFolder = this.gui.addFolder("glTF");

        this.initializeModelsDropdown();
        this.initializeGltfVersionView();
        this.initializeSceneSelection();
        this.initializeCameraSelection();
        this.initializeAnimationSettings();

        this.gltfFolder.open();
    }

    initializeModelsDropdown()
    {
        const self = this;
        function createElement(gltf)
        {
            const modelKeys = self.modelPathProvider.getAllKeys();

            if (gltf !== undefined && !self.modelPathProvider.pathExists(gltf.path))
            {
                modelKeys.unshift(gltf.path);
                self.selectedModel = gltf.path;
            }

            return self.gltfFolder.add(self, "selectedModel", modelKeys).name("Model")
                .onChange(() => self.onModelChanged());
        }
        this.initializeUpdatable(this.gltfFolder, createElement);
    }

    initializeGltfVersionView()
    {
        const self = this;
        function createElement(gltf)
        {
            const version = gltf !== undefined ? gltf.asset.version : "";
            self.version = version;
            return self.gltfFolder.add(self, "version", version).name("glTF Version")
                .onChange(() => self.version = version);
        }
        this.initializeUpdatable(this.gltfFolder, createElement);
    }

    initializeSceneSelection()
    {
        const self = this;
        function createElement(gltf)
        {
            const scenes = gltf !== undefined ? gltf.scenes : [];
            return self.gltfFolder.add(self.renderingParameters, "sceneIndex", Object.keys(scenes)).name("Scene Index")
                .onChange(() => self.update(gltf));
        }
        this.initializeUpdatable(this.gltfFolder, createElement);
    }

    initializeCameraSelection()
    {
        const self = this;
        function createElement(gltf)
        {
            const indices = gltf !== undefined ? Object.keys(gltf.cameras) : [];
            indices.unshift(UserCameraIndex);
            return self.gltfFolder.add(self.renderingParameters, "cameraIndex", indices).name("Camera Index");
        }
        this.initializeUpdatable(this.gltfFolder, createElement);
    }

    initializeLightingSettings()
    {
        const self = this;
        this.lightingFolder = this.gui.addFolder("Lighting");
        this.lightingFolder.add(this.renderingParameters, "useIBL").name("Image-Based Lighting");
        this.lightingFolder.add(this.renderingParameters, "usePunctual").name("Punctual Lighting");
        this.lightingFolder.add(this.renderingParameters, "exposure", 0, 10, 0.1).name("Exposure");
        this.lightingFolder.add(this.renderingParameters, "toneMap", Object.values(ToneMaps)).name("Tone Map");
        this.lightingFolder.addColor(this, "hexColor", this.hexColor).name("Background Color")
            .onChange(() => self.renderingParameters.clearColor = self.fromHexColor(self.hexColor));

        this.initializeEnvironmentSelection();
    }

    initializeEnvironmentSelection()
    {
        const self = this;
        function createElement(gltf)
        {
            if (gltf !== undefined &&
                gltf.scenes[self.renderingParameters.sceneIndex].imageBasedLight !== undefined)
            {
                const sceneEnvironment = self.sceneEnvironment;
                return self.lightingFolder.add(self, "sceneEnvironment", sceneEnvironment).name("Environment")
                    .onChange(() => self.sceneEnvironment = sceneEnvironment);
            }

            return self.lightingFolder.add(self.renderingParameters, "environmentName", Object.keys(Environments)).name("Environment")
                .onChange(() => self.onEnvironmentChanged());
        }
        this.initializeUpdatable(this.lightingFolder, createElement);
    }

    initializeAnimationSettings()
    {
        const self = this;
        this.animationFolder = this.gui.addFolder("Animation");
        this.playAnimationCheckbox = this.animationFolder.add(self, "playAnimation").name("Play").onChange(() => self.renderingParameters.animationTimer.toggle());
        this.animationFolder.add(self.renderingParameters, "skinning").name("Skinning");
        this.animationFolder.add(self.renderingParameters, "morphing").name("Morphing");

        this.initializeAnimationSelection();
    }

    initializeAnimationSelection()
    {
        const self = this;
        function createElement(gltf)
        {
            const indices = gltf !== undefined ? Object.keys(gltf.animations) : [];
            if (indices.length > 0)
            {
                indices.unshift("all");
            }
            return self.animationFolder.add(self.renderingParameters, "animationIndex", indices).name("Animation");
        }
        this.initializeUpdatable(this.animationFolder, createElement);
    }

    initializeDebugSettings()
    {
        const debugFolder = this.gui.addFolder("Debug");
        debugFolder.add(this.renderingParameters, "debugOutput", Object.values(DebugOutput)).name("Debug Output");
    }

    initializeMonitoringView()
    {
        const monitoringFolder = this.gui.addFolder("Performance");
        this.stats.domElement.height = "48px";
        for (const child of this.stats.domElement.children)
        {
            child.style.display = "";
        }
        this.stats.domElement.style.position = "static";
        const statsList = document.createElement("li");
        statsList.appendChild(this.stats.domElement);
        statsList.classList.add("gui-stats");
        monitoringFolder.__ul.appendChild(statsList);
    }

    initializeUpdatable(folder, createElement)
    {
        const updatable = { uiElement: createElement() };
        updatable.update = (gltf) =>
        {
            folder.remove(updatable.uiElement);
            updatable.uiElement = createElement(gltf);
        };
        this.updatables.push(updatable);
    }

    // string format: "#RRGGBB"
    fromHexColor(hexColor)
    {
        const hexR = hexColor.substring(1, 3);
        const hexG = hexColor.substring(3, 5);
        const hexB = hexColor.substring(5, 7);
        return [ this.fromHexValue(hexR) , this.fromHexValue(hexG), this.fromHexValue(hexB) ];
    }

    // array format: [ R, G, B ]
    toHexColor(color)
    {
        const hexR = color[0].toString(16);
        const hexG = color[1].toString(16);
        const hexB = color[2].toString(16);
        return "#" + hexR + hexG + hexB;
    }

    fromHexValue(hexValue)
    {
        return parseInt(hexValue, 16);
    }
}

function getSceneExtends(gltf, sceneIndex, outMin, outMax)
{
    for (const i of [0, 1, 2])
    {
        outMin[i] = Number.POSITIVE_INFINITY;
        outMax[i] = Number.NEGATIVE_INFINITY;
    }

    const scene = gltf.scenes[sceneIndex];

    let nodeIndices = scene.nodes.slice();
    while(nodeIndices.length > 0)
    {
        const node = gltf.nodes[nodeIndices.pop()];
        nodeIndices = nodeIndices.concat(node.children);

        if (node.mesh === undefined)
        {
            continue;
        }

        const mesh = gltf.meshes[node.mesh];
        if (mesh.primitives === undefined)
        {
            continue;
        }

        for (const primitive of mesh.primitives)
        {
            const attribute = primitive.glAttributes.find(a => a.attribute == "POSITION");
            if (attribute === undefined)
            {
                continue;
            }

            const accessor = gltf.accessors[attribute.accessor];
            const assetMin = create$2();
            const assetMax = create$2();
            getExtendsFromAccessor(accessor, node.worldTransform, assetMin, assetMax);

            for (const i of [0, 1, 2])
            {
                outMin[i] = Math.min(outMin[i], assetMin[i]);
                outMax[i] = Math.max(outMax[i], assetMax[i]);
            }
        }
    }
}

function getExtendsFromAccessor(accessor, worldTransform, outMin, outMax)
{
    const boxMin = create$2();
    transformMat4(boxMin, jsToGl(accessor.min), worldTransform);

    const boxMax = create$2();
    transformMat4(boxMax, jsToGl(accessor.max), worldTransform);

    const center = create$2();
    add(center, boxMax, boxMin);
    scale$1(center, center, 0.5);

    const centerToSurface = create$2();
    sub(centerToSurface, boxMax, center);

    const radius = length(centerToSurface);

    for (const i of [1, 2, 3])
    {
        outMin[i] = center[i] - radius;
        outMax[i] = center[i] + radius;
    }
}

function getScaleFactor(gltf, sceneIndex)
{
    const min = create$2();
    const max = create$2();
    getSceneExtends(gltf, sceneIndex, min, max);
    const minValue = Math.min(min[0], Math.min(min[1], min[2]));
    const maxValue = Math.max(max[0], Math.max(max[1], max[2]));
    const deltaValue = maxValue - minValue;
    return 1.0 / deltaValue;
}

function computePrimitiveCentroids(gltf)
{
    const meshes = gltf.nodes.filter(node => node.mesh !== undefined).map(node => gltf.meshes[node.mesh]);
    const primitives = meshes.reduce((acc, mesh) => acc.concat(mesh.primitives), []);
    for(const primitive of primitives) {

        const positionsAccessor = gltf.accessors[primitive.attributes.POSITION];
        const positions = positionsAccessor.getTypedView(gltf);

        if(primitive.indices !== undefined)
        {
            // Primitive has indices.

            const indicesAccessor = gltf.accessors[primitive.indices];

            const indices = indicesAccessor.getTypedView(gltf);

            const acc = new Float32Array(3);

            for(let i = 0; i < indices.length; i++) {
                const offset = 3 * indices[i];
                acc[0] += positions[offset];
                acc[1] += positions[offset + 1];
                acc[2] += positions[offset + 2];
            }

            const centroid = new Float32Array([
                acc[0] / indices.length,
                acc[1] / indices.length,
                acc[2] / indices.length,
            ]);

            primitive.setCentroid(centroid);
        }
        else
        {
            // Primitive does not have indices.

            const acc = new Float32Array(3);

            for(let i = 0; i < positions.length; i += 3) {
                acc[0] += positions[i];
                acc[1] += positions[i + 1];
                acc[2] += positions[i + 2];
            }

            const positionVectors = positions.length / 3;

            const centroid = new Float32Array([
                acc[0] / positionVectors,
                acc[1] / positionVectors,
                acc[2] / positionVectors,
            ]);

            primitive.setCentroid(centroid);
        }

    }
}

const VecZero = create$2();

class UserCamera extends gltfCamera
{
    constructor(
        position = [0, 0, 0],
        target = [0, 0,0],
        up = [0, 1, 0],
        xRot = 0,
        yRot = 0,
        zoom = 1)
    {
        super();

        this.position = jsToGl(position);
        this.target = jsToGl(target);
        this.up = jsToGl(up);
        this.xRot = xRot;
        this.yRot = yRot;
        this.zoom = zoom;
        this.zoomFactor = 1.04;
        this.rotateSpeed = 1 / 180;
        this.scaleFactor = 1;
    }

    updatePosition()
    {
        // calculate direction from focus to camera (assuming camera is at positive z)
        // yRot rotates *around* x-axis, xRot rotates *around* y-axis
        const direction = fromValues(0, 0, 1);
        this.toLocalRotation(direction);

        const position = create$2();
        scale$1(position, direction, this.zoom);
        add(position, position, this.target);

        this.position = position;
    }

    reset(gltf, sceneIndex)
    {
        this.xRot = 0;
        this.yRot = 0;
        this.fitViewToScene(gltf, sceneIndex);
    }

    zoomIn(value)
    {
        if (value > 0)
        {
            this.zoom *= this.zoomFactor;
        }
        else
        {
            this.zoom /= this.zoomFactor;
        }
    }

    rotate(x, y)
    {
        const yMax = Math.PI / 2 - 0.01;
        this.xRot += (x * this.rotateSpeed);
        this.yRot += (y * this.rotateSpeed);
        this.yRot = clamp(this.yRot, -yMax, yMax);
    }

    pan(x, y)
    {
        const moveSpeed = 1 / (this.scaleFactor * 200);

        const left = fromValues(-1, 0, 0);
        this.toLocalRotation(left);
        scale$1(left, left, x * moveSpeed);

        const up = fromValues(0, 1, 0);
        this.toLocalRotation(up);
        scale$1(up, up, y * moveSpeed);

        add(this.target, this.target, up);
        add(this.target, this.target, left);
    }

    fitViewToScene(gltf, sceneIndex)
    {
        const min = create$2();
        const max = create$2();
        getSceneExtends(gltf, sceneIndex, min, max);
        this.fitCameraTargetToExtends(min, max);
        this.fitZoomToExtends(min, max);
    }

    toLocalRotation(vector)
    {
        rotateX(vector, vector, VecZero, -this.yRot);
        rotateY(vector, vector, VecZero, -this.xRot);
    }

    getLookAtTarget()
    {
        return this.target;
    }

    getPosition()
    {
        return this.position;
    }

    fitZoomToExtends(min, max)
    {
        const maxAxisLength = Math.max(max[0] - min[0], max[1] - min[1]);
        this.zoom = this.getFittingZoom(maxAxisLength);
    }

    fitCameraTargetToExtends(min, max)
    {
        for (const i of [0, 1, 2])
        {
            this.target[i] = (max[i] + min[i]) / 2;
        }
    }

    getFittingZoom(axisLength)
    {
        const yfov = this.yfov;
        const xfov = this.yfov * this.aspectRatio;

        const yZoom = axisLength / 2 / Math.tan(yfov / 2);
        const xZoom = axisLength / 2 / Math.tan(xfov / 2);

        return Math.max(xZoom, yZoom);
    }
}

class GlbParser
{
    constructor(data)
    {
        this.data = data;
        this.glbHeaderInts = 3;
        this.glbChunkHeaderInts = 2;
        this.glbMagic = 0x46546C67;
        this.glbVersion = 2;
        this.jsonChunkType = 0x4E4F534A;
        this.binaryChunkType = 0x004E4942;
    }

    extractGlbData()
    {
        const glbInfo = this.getCheckedGlbInfo();
        if (glbInfo === undefined)
        {
            return undefined;
        }

        let json = undefined;
        let buffers = [];
        const chunkInfos = this.getAllChunkInfos();
        for (let chunkInfo of chunkInfos)
        {
            if (chunkInfo.type == this.jsonChunkType && !json)
            {
                json = this.getJsonFromChunk(chunkInfo);
            }
            else if (chunkInfo.type == this.binaryChunkType)
            {
                buffers.push(this.getBufferFromChunk(chunkInfo));
            }
        }

        return { json: json, buffers: buffers };
    }

    getCheckedGlbInfo()
    {
        const header = new Uint32Array(this.data, 0, this.glbHeaderInts);
        const magic = header[0];
        const version = header[1];
        const length = header[2];

        if (!this.checkEquality(magic, this.glbMagic, "glb magic") ||
            !this.checkEquality(version, this.glbVersion, "glb header version") ||
            !this.checkEquality(length, this.data.byteLength, "glb byte length"))
        {
            return undefined;
        }

        return { "magic": magic, "version": version, "length": length };
    }

    getAllChunkInfos()
    {
        let infos = [];
        let chunkStart = this.glbHeaderInts * 4;
        while (chunkStart < this.data.byteLength)
        {
            const chunkInfo = this.getChunkInfo(chunkStart);
            infos.push(chunkInfo);
            chunkStart += chunkInfo.length + this.glbChunkHeaderInts * 4;
        }
        return infos;
    }

    getChunkInfo(headerStart)
    {
        const header = new Uint32Array(this.data, headerStart, this.glbChunkHeaderInts);
        const chunkStart = headerStart + this.glbChunkHeaderInts * 4;
        const chunkLength = header[0];
        const chunkType = header[1];
        return { "start": chunkStart, "length": chunkLength, "type": chunkType };
    }

    getJsonFromChunk(chunkInfo)
    {
        const chunkLength = chunkInfo.length;
        const jsonStart = (this.glbHeaderInts + this.glbChunkHeaderInts) * 4;
        const jsonSlice = new Uint8Array(this.data, jsonStart, chunkLength);
        return JSON.parse(String.fromCharCode.apply(null, jsonSlice));
    }

    getBufferFromChunk(chunkInfo)
    {
        return this.data.slice(chunkInfo.start, chunkInfo.start + chunkInfo.length);
    }

    checkEquality(actual, expected, name)
    {
        if (actual == expected)
        {
            return true;
        }

        console.error("Found invalid/unsupported " + name + ", expected: " + expected + ", but was: " + actual);
        return false;
    }
}

class gltfEnvironmentLoader
{
    constructor(basePath)
    {
        this.basePath = basePath;
    }

    addEnvironmentMap(gltf, environment)
    {
        // Only allow KTX2 to simplify code.
        if (environment.type != ImageMimeType.KTX2)
        {
            return;
        }

        const imagesFolder = this.basePath + "assets/environments/" + environment.folder + "/";

        //
        // Prepare samplers.
        //

        gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "DiffuseCubeMapSampler"));
        const diffuseCubeSamplerIdx = gltf.samplers.length - 1;

        gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR_MIPMAP_LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "SpecularCubeMapSampler"));
        const specularCubeSamplerIdx = gltf.samplers.length - 1;

        gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR_MIPMAP_LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "SheenCubeMapSampler"));
        const sheenCubeSamplerIdx = gltf.samplers.length - 1;

        gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "LUTSampler"));
        const lutSamplerIdx = gltf.samplers.length - 1;

        //
        // Prepare images and textures.
        //

        let imageIdx = gltf.images.length;

        // Diffuse

        const lambertian = new gltfImage(this.basePath + imagesFolder + "lambertian/diffuse.ktx2", WebGl.context.TEXTURE_CUBE_MAP);
        lambertian.mimeType = ImageMimeType.KTX2;
        gltf.images.push(lambertian);
        gltf.textures.push(new gltfTexture(diffuseCubeSamplerIdx, [imageIdx], WebGl.context.TEXTURE_CUBE_MAP));

        // Specular

        const specular = new gltfImage(this.basePath + imagesFolder + "ggx/specular.ktx2", WebGl.context.TEXTURE_CUBE_MAP);
        specular.mimeType = ImageMimeType.KTX2;
        gltf.images.push(specular);
        gltf.textures.push(new gltfTexture(specularCubeSamplerIdx, [++imageIdx], WebGl.context.TEXTURE_CUBE_MAP));

        // Sheen

        const sheen = new gltfImage(this.basePath + imagesFolder + "charlie/sheen.ktx2", WebGl.context.TEXTURE_CUBE_MAP);
        sheen.mimeType = ImageMimeType.KTX2;
        gltf.images.push(sheen);
        gltf.textures.push(new gltfTexture(sheenCubeSamplerIdx, [++imageIdx], WebGl.context.TEXTURE_CUBE_MAP));

        //
        // Look Up Tables.
        //

        // GGX

        gltf.images.push(new gltfImage(this.basePath + "assets/images/lut_ggx.png", WebGl.context.TEXTURE_2D));
        gltf.textures.push(new gltfTexture(lutSamplerIdx, [++imageIdx], WebGl.context.TEXTURE_2D));

        // Charlie

        gltf.images.push(new gltfImage(this.basePath + "assets/images/lut_charlie.png", WebGl.context.TEXTURE_2D));
        gltf.textures.push(new gltfTexture(lutSamplerIdx, [++imageIdx], WebGl.context.TEXTURE_2D));

        // Thin film

        gltf.images.push(new gltfImage(this.basePath + "assets/images/lut_thin_film.png", WebGl.context.TEXTURE_2D));
        gltf.textures.push(new gltfTexture(lutSamplerIdx, [++imageIdx], WebGl.context.TEXTURE_2D));
    }
}

class gltfViewer
{
    constructor(
        canvas,
        modelIndex,
        input,
        headless = false,
        onRendererReady = undefined,
        basePath = "",
        initialModel = "",
        environmentMap = undefined)
    {
        this.headless = headless;
        this.onRendererReady = onRendererReady;
        this.basePath = basePath;
        this.initialModel = initialModel;

        this.lastMouseX = 0.00;
        this.lastMouseY = 0.00;
        this.mouseDown = false;

        this.lastTouchX = 0.00;
        this.lastTouchY = 0.00;
        this.touchDown = false;

        this.canvas = canvas;
        this.canvas.style.cursor = "grab";

        this.loadingTimer = new Timer();
        this.gltf = undefined;
        this.lastDropped = undefined;

        this.scaledSceneIndex = 0;
        this.scaledGltfChanged = true;
        this.sceneScaleFactor = 1;

        this.renderingParameters = new gltfRenderingParameters(environmentMap);
        this.userCamera = new UserCamera();
        this.currentlyRendering = false;
        this.renderer = new gltfRenderer(canvas, this.userCamera, this.renderingParameters, this.basePath);

        this.gltfLoadedCallback = function(){};

        // Holds the last camera index, used for scene scaling when changing to user camera.
        this.prevCameraIndex = null;

        if (this.headless === true)
        {
            this.hideSpinner();
        }
        else
        {
            this.setupInputBindings(input);

            if (this.initialModel.includes("/"))
            {
                // no UI if a path is provided (e.g. in the vscode plugin)
                this.loadFromPath(this.initialModel);
            }
            else
            {
                const self = this;
                this.stats = new Stats();
                this.pathProvider = new gltfModelPathProvider(this.basePath + modelIndex);
                this.pathProvider.initialize().then(() =>
                {
                    self.initializeGui();
                    self.loadFromPath(self.pathProvider.resolve(self.initialModel));
                });
            }
        }

        this.render(); // Starts a rendering loop.
    }

    setCamera(eye = [0.0, 0.0, 0.05], target = [0.0, 0.0, 0.0], up = [0.0, 1.0, 0.0],
        type = "perspective",
        znear = 0.01, zfar = 10000.0,
        yfov = 45.0 * Math.PI / 180.0, aspectRatio = 16.0 / 9.0,
        xmag = 1.0, ymag = 1.0)
    {
        this.renderingParameters.cameraIndex = UserCameraIndex; // force use default camera

        this.userCamera.target = jsToGl(target);
        this.userCamera.up = jsToGl(up);
        this.userCamera.position = jsToGl(eye);
        this.userCamera.type = type;
        this.userCamera.znear = znear;
        this.userCamera.zfar = zfar;
        this.userCamera.yfov = yfov;
        this.userCamera.aspectRatio = aspectRatio;
        this.userCamera.xmag = xmag;
        this.userCamera.ymag = ymag;
    }

    setAnimation(animationIndex = 'all', play = false, timeInSec = undefined)
    {
        this.renderingParameters.animationIndex = animationIndex;
        if(timeInSec !== undefined)
        {
            this.renderingParameters.animationTimer.setFixedTime(timeInSec);
        }
        else if(play)
        {
            this.renderingParameters.animationTimer.start();
        }
    }

    // callback = function(gltf) {}
    setGltfLoadedCallback(callback)
    {
        this.gltfLoadedCallback = callback;
    }

    setupInputBindings(input)
    {
        const self = this;
        input.onRotate = (deltaX, deltaY) =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                this.userCamera.rotate(deltaX, deltaY);
            }
        };
        input.onPan = (deltaX, deltaY) =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                this.userCamera.pan(deltaX, deltaY);
            }
        };
        input.onZoom = (delta) =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                this.userCamera.zoomIn(delta);
            }
        };
        input.onResetCamera = () =>
        {
            if (this.renderingParameters.userCameraActive())
            {
                self.userCamera.reset(self.gltf, self.renderingParameters.sceneIndex);
            }
        };
        input.onDropFiles = this.loadFromFileObject.bind(this);
    }

    loadFromFileObject(mainFile, additionalFiles)
    {
        this.lastDropped = { mainFile: mainFile, additionalFiles: additionalFiles };

        const gltfFile = mainFile.name;
        this.notifyLoadingStarted(gltfFile);

        const reader = new FileReader();
        const self = this;
        if (getIsGlb(gltfFile))
        {
            reader.onloadend = function(event)
            {
                const data = event.target.result;
                const glbParser = new GlbParser(data);
                const glb = glbParser.extractGlbData();
                self.createGltf(gltfFile, glb.json, glb.buffers);
            };
            reader.readAsArrayBuffer(mainFile);
        }
        else
        {
            reader.onloadend = function(event)
            {
                const data = event.target.result;
                const json = JSON.parse(data);
                self.createGltf(gltfFile, json, additionalFiles);
            };
            reader.readAsText(mainFile);
        }
    }

    loadFromPath(gltfFile, basePath = "")
    {
        this.lastDropped = undefined;

        gltfFile = basePath + gltfFile;
        this.notifyLoadingStarted(gltfFile);

        const isGlb = getIsGlb(gltfFile);

        const self = this;
        return axios_min.get(gltfFile, { responseType: isGlb ? "arraybuffer" : "json" }).then(function(response)
        {
            let json = response.data;
            let buffers = undefined;
            if (isGlb)
            {
                const glbParser = new GlbParser(response.data);
                const glb = glbParser.extractGlbData();
                json = glb.json;
                buffers = glb.buffers;
            }
            return self.createGltf(gltfFile, json, buffers);
        }).catch(function(error)
        {
            console.error(error.stack);
            if (!self.headless) self.hideSpinner();
        });
    }

    createGltf(path, json, buffers)
    {
        this.currentlyRendering = false;

        // unload previous scene
        if (this.gltf !== undefined)
        {
            gltfLoader.unload(this.gltf);
            this.gltf = undefined;
        }

        const gltf = new glTF(path);
        gltf.fromJson(json);

        this.injectEnvironment(gltf);

        const self = this;
        return gltfLoader.load(gltf, buffers)
            .then(() => self.startRendering(gltf));
    }

    injectEnvironment(gltf)
    {
        // this is hacky, because we inject stuff into the gltf

        // because the environment loader adds images with paths that are not relative
        // to the gltf, we have to resolve all image paths before that
        for (const image of gltf.images)
        {
            image.resolveRelativePath(getContainingFolder(gltf.path));
        }

        const environment = Environments[this.renderingParameters.environmentName];
        new gltfEnvironmentLoader(this.basePath).addEnvironmentMap(gltf, environment);
    }

    startRendering(gltf)
    {
        this.notifyLoadingEnded(gltf.path);
        if(this.gltfLoadedCallback !== undefined)
        {
            this.gltfLoadedCallback(gltf);
        }

        if (gltf.scenes.length === 0)
        {
            throw "No scenes in the gltf";
        }

        this.renderingParameters.cameraIndex = UserCameraIndex;
        this.renderingParameters.sceneIndex = gltf.scene ? gltf.scene : 0;
        this.renderingParameters.animationTimer.reset();
        this.renderingParameters.animationIndex = "all";

        if (this.gui !== undefined)
        {
            this.gui.update(gltf);
        }

        this.gltf = gltf;
        this.currentlyRendering = true;
        this.scaledGltfChanged = true;

        this.prepareSceneForRendering(gltf);
        this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);

        computePrimitiveCentroids(gltf);
    }

    render()
    {
        const self = this;
        function renderFrame()
        {
            if (self.stats !== undefined)
            {
                self.stats.begin();
            }

            if (self.currentlyRendering)
            {
                self.prepareSceneForRendering(self.gltf);

                self.renderer.resize(self.canvas.clientWidth, self.canvas.clientHeight);
                self.renderer.newFrame();

                if (self.gltf.scenes.length !== 0)
                {
                    if (self.headless === false)
                    {
                        self.userCamera.updatePosition();
                    }

                    const scene = self.gltf.scenes[self.renderingParameters.sceneIndex];

                    // Check if scene contains transparent primitives.

                    const nodes = scene.gatherNodes(self.gltf);

                    const alphaModes = nodes
                        .filter(n => n.mesh !== undefined)
                        .reduce((acc, n) => acc.concat(self.gltf.meshes[n.mesh].primitives), [])
                        .map(p => self.gltf.materials[p.material].alphaMode);

                    let hasBlendPrimitives = false;
                    for(const alphaMode of alphaModes)
                    {
                        if(alphaMode === "BLEND")
                        {
                            hasBlendPrimitives = true;
                            break;
                        }
                    }

                    if(hasBlendPrimitives)
                    {
                        // Draw all opaque and masked primitives. Depth sort is not yet required.
                        self.renderer.drawScene(self.gltf, scene, false, primitive => self.gltf.materials[primitive.material].alphaMode !== "BLEND");

                        // Draw all transparent primitives. Depth sort is required.
                        self.renderer.drawScene(self.gltf, scene, true, primitive => self.gltf.materials[primitive.material].alphaMode === "BLEND");
                    }
                    else
                    {
                        // Simply draw all primitives.
                        self.renderer.drawScene(self.gltf, scene, false);
                    }
                }

                if (self.onRendererReady)
                {
                    self.onRendererReady();
                }
            }

            if (self.stats !== undefined)
            {
                self.stats.end();
            }

            window.requestAnimationFrame(renderFrame);
        }

        // After this start executing render loop.
        window.requestAnimationFrame(renderFrame);
    }

    prepareSceneForRendering(gltf)
    {
        const scene = gltf.scenes[this.renderingParameters.sceneIndex];

        this.animateNode(gltf);

        scene.applyTransformHierarchy(gltf);

        const transform = create$1();

        let scaled = false;
        if (this.renderingParameters.userCameraActive() && (this.scaledGltfChanged || this.scaledSceneIndex !== this.renderingParameters.sceneIndex || this.prevCameraIndex !== this.renderingParameters.cameraIndex))
        {
            this.sceneScaleFactor = getScaleFactor(gltf, this.renderingParameters.sceneIndex);

            scaled = true;
            this.scaledGltfChanged = false;
            this.scaledSceneIndex = this.renderingParameters.sceneIndex;
            console.log("Rescaled scene " + this.scaledSceneIndex + " by " + this.sceneScaleFactor);
        }
        else if(!this.renderingParameters.userCameraActive() && this.prevCameraIndex !== this.renderingParameters.cameraIndex)
        {
            this.sceneScaleFactor = 1;
        }

        this.prevCameraIndex = this.renderingParameters.cameraIndex;

        scale(transform, transform, fromValues(this.sceneScaleFactor,  this.sceneScaleFactor,  this.sceneScaleFactor));
        scene.applyTransformHierarchy(gltf, transform);

        if(scaled)
        {
            this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);
        }
    }

    animateNode(gltf)
    {
        if(gltf.animations !== undefined && !this.renderingParameters.animationTimer.paused)
        {
            const t = this.renderingParameters.animationTimer.elapsedSec();

            if(this.renderingParameters.animationIndex === "all")
            {
                // Special index, step all animations.
                for(const anim of gltf.animations)
                {
                    if(anim)
                    {
                        anim.advance(gltf, t);
                    }
                }
            }
            else
            {
                // Step selected animation.
                const anim = gltf.animations[this.renderingParameters.animationIndex];
                if(anim)
                {
                    anim.advance(gltf, t);
                }
            }
        }
    }

    initializeGui()
    {
        const gui = new gltfUserInterface(
            this.pathProvider,
            this.initialModel,
            this.renderingParameters,
            this.stats);

        const self = this;
        gui.onModelChanged = () => self.loadFromPath(this.pathProvider.resolve(gui.selectedModel));
        gui.onEnvironmentChanged = () =>
        {
            if (this.lastDropped === undefined)
            {
                self.loadFromPath(this.pathProvider.resolve(gui.selectedModel));
            }
            else
            {
                self.loadFromFileObject(this.lastDropped.mainFile, this.lastDropped.additionalFiles);
            }
        };
        gui.initialize();
        this.gui = gui;
    }

    notifyLoadingStarted(path)
    {
        this.loadingTimer.start();
        console.log("Loading '" + path + "' with environment '" + this.renderingParameters.environmentName + "'");

        if (!this.headless)
        {
            this.showSpinner();
        }
    }

    notifyLoadingEnded(path)
    {
        this.loadingTimer.stop();
        console.log("Loading '" + path + "' took " + this.loadingTimer.seconds + " seconds");

        if (!this.headless)
        {
            this.hideSpinner();
        }
    }

    showSpinner()
    {
        let spinner = document.getElementById("gltf-rv-model-spinner");
        if (spinner !== undefined)
        {
            spinner.style.display = "block";
        }
    }

    hideSpinner()
    {
        let spinner = document.getElementById("gltf-rv-model-spinner");
        if (spinner !== undefined)
        {
            spinner.style.display = "none";
        }
    }
}

const Input_ResetCamera = "r";
const Input_RotateButton = 0;
const Input_PanButton = 1;

const ZoomThreshold = 1.0;

class gltfMouseInput
{
    constructor(canvas)
    {
        this.canvas = canvas;

        this.onZoom = () => { };
        this.onRotate = () => { };
        this.onPan = () => { };

        this.mouseDown = false;
        this.pressedButton = undefined;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
    }

    setupGlobalInputBindings(document)
    {
        document.onmouseup = this.mouseUpHandler.bind(this);
        document.onmousemove = this.mouseMoveHandler.bind(this);
    }

    setupCanvasInputBindings(canvas)
    {
        canvas.onmousedown = this.mouseDownHandler.bind(this);
        canvas.onwheel = this.mouseWheelHandler.bind(this);
    }

    mouseDownHandler(event)
    {
        this.mouseDown = true;
        this.pressedButton = event.button;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
        this.canvas.style.cursor = "none";
    }

    mouseUpHandler()
    {
        this.mouseDown = false;
        this.canvas.style.cursor = "grab";
    }

    mouseMoveHandler(event)
    {
        event.preventDefault();

        if (!this.mouseDown)
        {
            this.canvas.style.cursor = "grab";
            return;
        }

        const deltaX = event.clientX - this.lastMouseX;
        const deltaY = event.clientY - this.lastMouseY;

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;

        switch (this.pressedButton)
        {
        case Input_RotateButton:
            this.onRotate(deltaX, deltaY);
            break;
        case Input_PanButton:
            this.onPan(deltaX, deltaY);
            break;
        }
    }

    mouseWheelHandler(event)
    {
        event.preventDefault();

        if (Math.abs(event.deltaY) < ZoomThreshold)
        {
            return;
        }

        this.canvas.style.cursor = "none";
        this.onZoom(event.deltaY);
    }
}

const ZoomThreshold$1 = 1;

class gltfTouchInput
{
    constructor()
    {
        this.onZoom = () => { };
        this.onRotate = () => { };
        this.touchCount = 0;

        this.lastSingleX = undefined;
        this.lastSingleY = undefined;
        this.lastMultiDistance = undefined;
    }

    setupGlobalInputBindings(document)
    {
        document.ontouchmove = this.touchMoveHandler.bind(this);
    }

    setupCanvasInputBindings(canvas)
    {
        canvas.ontouchstart = this.touchStartHandler.bind(this);
    }

    touchStartHandler(event)
    {
        event.preventDefault();
        this.touchCount = event.touches.length;
        const firstFinger = event.touches[0];

        if (this.touchCount === 1)
        {
            this.lastSingleX = firstFinger.clientX;
            this.lastSingleY = firstFinger.clientY;
        }
        else
        {
            const secondFinger = event.touches[1];
            const firstPosition = fromValues$3(firstFinger.clientX, firstFinger.clientY);
            const secondPosition = fromValues$3(secondFinger.clientX, secondFinger.clientY);
            this.lastMultiDistance = dist(firstPosition, secondPosition);
        }
    }

    touchMoveHandler(event)
    {
        if (this.touchCount !== event.touches.length)
        {
            this.touchCount = 0;
            return;
        }

        if (event.touches.length === 1)
        {
            this.singleTouchMoveHandler(event);
        }
        else
        {
            this.multiTouchMoveHandler(event);
        }
    }

    singleTouchMoveHandler(event)
    {
        const touchObject = event.touches[0];

        const deltaX = touchObject.clientX - this.lastSingleX;
        const deltaY = touchObject.clientY - this.lastSingleY;

        this.lastSingleX = touchObject.clientX;
        this.lastSingleY = touchObject.clientY;

        this.onRotate(deltaX, deltaY);
    }

    multiTouchMoveHandler(event)
    {
        const firstFinger = event.touches[0];
        const secondFinger = event.touches[1];

        const firstPosition = fromValues$3(firstFinger.clientX, firstFinger.clientY);
        const secondPosition = fromValues$3(secondFinger.clientX, secondFinger.clientY);
        const distance = dist(firstPosition, secondPosition);
        const deltaDistance = distance - this.lastMultiDistance;

        this.lastMultiDistance = distance;

        if (Math.abs(deltaDistance) > ZoomThreshold$1)
        {
            this.onZoom(-deltaDistance);
        }
    }
}

class gltfKeyboardInput
{
    constructor()
    {
        this.onResetCamera = () => { };
    }

    setupGlobalInputBindings(document)
    {
        document.onkeydown = this.keyDownHandler.bind(this);
    }

    setupCanvasInputBindings() { }

    keyDownHandler(event)
    {
        if (event.key === Input_ResetCamera)
        {
            this.onResetCamera();
        }
    }
}

class gltfDragInput
{
    constructor()
    {
        this.onDropFiles = () => { };
    }

    setupGlobalInputBindings() { }

    setupCanvasInputBindings(canvas)
    {
        canvas.ondrop = this.dropHandler.bind(this);
        canvas.ondragover = this.dragOverHandler.bind(this);
    }

    dragOverHandler(event)
    {
        event.preventDefault();
    }

    dropHandler(event)
    {
        event.preventDefault();

        let files = [];
        let folders = [];
        let droppedFiles = event.dataTransfer.files;
        let droppedItems = event.dataTransfer.items;

        for (let i = 0; i < droppedItems.length; i++)
        {
            let entry;
            if (droppedItems[i].getAsEntry)
            {
                entry = droppedItems[i].getAsEntry();
            }
            else if (droppedItems[i].webkitGetAsEntry)
            {
                entry = droppedItems[i].webkitGetAsEntry();
            }
            if (!entry)
            {
                files.push(droppedFiles[i]);
            }
            else
            {
                if (entry.isDirectory)
                {
                    folders.push(entry);
                }
                else
                {
                    files.push(droppedFiles[i]);
                }
            }
        }

        if (folders.length === 0)
        {
            this._processFiles(files);
        }
        else
        {
            let remaining = folders.length;
            for (let i = 0; i < folders.length; i++)
            {
                this._traverseFolder(folders[i], files, remaining, function(object)
                {
                    object._processFiles(files);
                });
            }
        }
    }

    _traverseFolder(folder, files, remaining, callback)
    {
        let self = this;
        let relativePath = folder.fullPath.replace(/^\//, "").replace(/(.+?)\/?$/, "$1/");
        let reader = folder.createReader();
        reader.readEntries(function(entries)
        {
            remaining += entries.length;
            for (let entry of entries)
            {
                if (entry.isFile)
                {
                    entry.file(function(file)
                    {
                        file.fullPath = relativePath + file.name;
                        files.push(file);
                        if (--remaining === 0)
                        {
                            callback(self);
                        }
                    });
                }
                else if (entry.isDirectory)
                {
                    self._traverseFolder(entry, files, remaining, callback);
                }
            }
            if (--remaining === 0)
            {
                callback(self);
            }
        });
    }

    _processFiles(files)
    {
        let mainFile;
        let additionalFiles = [];
        for (let file of files)
        {
            if (getIsGltf(file.name) || getIsGlb(file.name))
            {
                mainFile = file;
            }
            else
            {
                additionalFiles.push(file);
            }
        }
        if (mainFile === undefined)
        {
            console.warn("No gltf/glb file found. Provided files: " + additionalFiles.map(f => f.name).join(", "));
            return;
        }
        this.onDropFiles(mainFile, additionalFiles);
    }
}

class gltfInput
{
    constructor(canvas)
    {
        this.mouseInput = new gltfMouseInput(canvas);
        this.touchInput = new gltfTouchInput();
        this.keyboardInput = new gltfKeyboardInput();
        this.dragInput = new gltfDragInput();

        this.onZoom = () => { };
        this.onRotate = () => { };
        this.onPan = () => { };
        this.onDropFiles = () => { };
        this.onResetCamera = () => { };

        this.mouseInput.onZoom = (delta => this.onZoom(delta)).bind(this);
        this.mouseInput.onRotate = ((x, y) => this.onRotate(x, y)).bind(this);
        this.mouseInput.onPan = ((x, y) => this.onPan(x, y)).bind(this);
        this.touchInput.onRotate = ((x, y) => this.onRotate(x, y)).bind(this);
        this.touchInput.onZoom = (delta => this.onZoom(delta)).bind(this);
        this.keyboardInput.onResetCamera = (() => this.onResetCamera()).bind(this);
        this.dragInput.onDropFiles = ((file, additionalFiles) => this.onDropFiles(file, additionalFiles)).bind(this);
    }

    setupGlobalInputBindings(document)
    {
        this.mouseInput.setupGlobalInputBindings(document);
        this.touchInput.setupGlobalInputBindings(document);
        this.keyboardInput.setupGlobalInputBindings(document);
        this.dragInput.setupGlobalInputBindings(document);
    }

    setupCanvasInputBindings(canvas)
    {
        this.mouseInput.setupCanvasInputBindings(canvas);
        this.touchInput.setupCanvasInputBindings(canvas);
        this.keyboardInput.setupCanvasInputBindings(canvas);
        this.dragInput.setupCanvasInputBindings(canvas);
    }
}

function gltf_rv(
    canvasId,
    index,
    envMap = "Courtyard of the Doge's palace",
    headless = false,
    onRendererReady = undefined,
    basePath = "",
    initialModel = "BoomBox")
{
    const canvas = document.getElementById(canvasId);
    if (!canvas)
    {
        console.warn("Failed to retrieve the WebGL canvas!");
        return null;
    }

    WebGl.context = getWebGlContext(canvas);
    if (!WebGl.context)
    {
        console.warn("Failed to get an WebGL rendering context!");
        return null;
    }

    const input = new gltfInput(canvas);
    input.setupGlobalInputBindings(document);
    input.setupCanvasInputBindings(canvas);

    const viewer = new gltfViewer(canvas, index, input, headless, onRendererReady, basePath, initialModel, envMap);

    return viewer; // Succeeded in creating a glTF viewer!
}

function getWebGlContext(canvas)
{
    const parameters = { alpha: false, antialias: true };
    const contextTypes = [ "webgl2" ];

    let context;

    for (const contextType of contextTypes)
    {
        context = canvas.getContext(contextType, parameters);
        if (context)
        {
            return context;
        }
    }
    return context;
}

exports.gltf_rv = gltf_rv;
