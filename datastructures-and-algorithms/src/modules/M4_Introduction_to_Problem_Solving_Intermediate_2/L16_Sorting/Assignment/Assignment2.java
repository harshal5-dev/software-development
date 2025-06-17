package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L16_Sorting.Assignment;

public class Assignment2 {

  int solve(int[] A) {
    int N =  A.length;

    if (A[N-1] == 0) {
      return 1;
    }

    int count = 0;

    for (int index = N-2; index >= 0; index--) {
      if (A[index] != A[index + 1]) {
        count = N - index - 1;
      }

      if (A[index] == count) {
        return 1;
      }
    }

    return -1;
  }
}
