type Vector3 = [number, number, number];
// 计算两点间的距离
function distance(a: Vector3, b: Vector3): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}
// 创建一个正八面体顶点的列表
const vertices: Vector3[] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1]
];
// 创建一个正八面体的面的列表
const faces: number[][] = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4, 5, 1],
  [1, 5, 6, 2],
  [2, 6, 7, 3],
  [3, 7, 4, 0]
];
// 细分正八面体的函数
function subdivideOctahedron(verts: Vector3[], faces: number[][]) {
  const newVerts: Vector3[] = [];
  const newFaces: number[][] = [];

  faces.forEach((face) => {
    for (let i = 0; i < face.length; i++) {
      const v1 = verts[face[i]];
      const v2 = verts[face[(i + 1) % face.length]];
      const mid = [
        (v1[0] + v2[0]) / 2,
        (v1[1] + v2[1]) / 2,
        (v1[2] + v2[2]) / 2
      ]
    }
  })
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    for (let j = 0; j < face.length; j++) {
      const v1 = newVerts[face[j]];
      const v2 = newVerts[face[(j + 1) % face.length]]
      const v3 = verts[face[(j + 2) % face.length]]
      newFaces.push([newVerts.length - 3, newVerts.length - 2, face[j]])
      newFaces.push([newVerts.length - 2, newVerts.length - 1, face[(j + 1) % face.length]])
      newFaces.push([newVerts.length - 1, face[(j + 2) % face.length]])
    }
  }
  return { vertices: newVerts, faces: newFaces }
}
// 计算内接球半径函数
function innerSphereRadius(verts: Vector3[]) {
  let maxDist = 0;
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const dist = distance(verts[i], verts[j])
      if (dist > maxDist) {
        maxDist = dist
      }
    }
  }
  return maxDist / Math.sqrt(8); // 正八面体的内接球半径是最长边的一半除以根号2
}
// 细分正八面体并计算内接球半径
const { vertices: newVerts, faces: newFaces } = subdivideOctahedron(vertices, faces)
const radius = innerSphereRadius(newVerts)