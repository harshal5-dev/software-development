package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L18_Intermediate_DSA;

public class Assignment3 {

  int highestPowerOf2(int A) {
    int power = 1;
    while ((1 << power) <= A) {
      power++;
    }
    return 1 << (power - 1);
  }

  int solve(int A) {
    int powerOfTwo = highestPowerOf2(A);
    int noOfKills = A - powerOfTwo;

    return 2 * noOfKills + 1;
  }
}
