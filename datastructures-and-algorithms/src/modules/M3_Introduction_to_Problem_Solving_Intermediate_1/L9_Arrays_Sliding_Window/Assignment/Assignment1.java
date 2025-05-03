package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L9_Arrays_Sliding_Window.Assignment;

public class Assignment1 {

  int solve(int[] A, int B, int C) {
    int N = A.length;
    int sum = 0;
    for (int index = 0; index < B; index++) {
      sum += A[index];
    }

    if (sum == C) {
      return 1;
    }

    int s = 1, e = B;

    while (e < N) {
      sum -= A[s-1];
      sum += A[e];

      if (sum == C) {
        return 1;
      }

      s++;
      e++;
    }

    return 0;
  }
}
