package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L4_Introduction_to_Arrays.Assignment;

public class Assignment2 {

  int solve(int[] A, int B) {
    int N = A.length;

    for (int index = 0; index < N - 1; index++) {
      for (int jIndex = index + 1; jIndex < N; jIndex++) {
        if (A[index] + A[jIndex] == B) {
          return 1;
        }
      }
    }

    return 0;
  }
}
