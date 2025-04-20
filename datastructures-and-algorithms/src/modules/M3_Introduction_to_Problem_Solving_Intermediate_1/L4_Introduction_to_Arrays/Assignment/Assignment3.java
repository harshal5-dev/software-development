package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L4_Introduction_to_Arrays.Assignment;

public class Assignment3 {

  static int[] solve(int[] A, int B, int C) {
    int index = B;
    int jIndex = C;

    while (index < jIndex) {
      int temp = A[index];
      A[index] = A[jIndex];
      A[jIndex] = temp;
      index++;
      jIndex--;
    }

    return A;
  }
}
