export default function SCounter( angles, radii) {
    const rad = angles.map((angle) => {
        const adjustedAngle = angle;
        const angleInRadians = (adjustedAngle * Math.PI) / 180;
        return angleInRadians;
    });

    // Обчислення координат x та y для кожної вершини (полярні координати)
    const a = radii.map((val, ind) => {
        return val * Math.sin(rad[ind]); // y координата
    });

    const b = radii.map((val, ind) => {
        return val * Math.cos(rad[ind]); // x координата
    });

    // Замкнемо багатокутник, додавши першу вершину в кінець
    a.push(a[0]); // додати y0 в кінець
    b.push(b[0]); // додати x0 в кінець

    console.log("Координати вершин:", a, b);

    let sum1 = 0, sum2 = 0;

    // Обчислення площі за допомогою формули для багатокутників
    for (let i = 0; i < a.length - 1; i++) {
        sum1 += b[i] * a[i + 1];
        sum2 += a[i] * b[i + 1];
    }

    // Остаточне обчислення площі
    let area = Math.abs((sum1 - sum2) / 2);
    return area;
}
